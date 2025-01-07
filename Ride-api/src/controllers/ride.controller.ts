import { Request,Response } from "express";
import { validationResult } from "express-validator";
import { Ride } from "../models/ride.model";
import { getAddressCoordinates, getCaptainsInTheRadius } from "../services/map.service";
import { sendMessageToSocketId } from "../socket";
import { ApiError } from "../helpers/ApiError";
import { calculateFare } from "../services/ride.service";
import { ApiResponse } from "../helpers/ApiResponse";

export const bookRide = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { userId, pickup, destination, vehicleType } = await req.body;
    const newRide = await Ride.create({ user: userId, pickup, destination, vehicleType });
    if(!newRide) throw new ApiError(500,"Could not initiate the ride request!!!");
    const pickUpCoordinates = await getAddressCoordinates(pickup);
    if(!pickUpCoordinates) throw new ApiError(500,"Could not get the pickup coordinates, Please try again!!!");
    const captainsInRadius = await getCaptainsInTheRadius(pickUpCoordinates.latitude, pickUpCoordinates.longitude, 2);
    if(!captainsInRadius) throw new ApiError(400,"There are no captains around you, Please try again later!!!");
    newRide.otp = "";//for later fix
    const rideWithUser=await Ride.findOne({_id:newRide._id}).populate("user");
    if(!rideWithUser) throw new ApiError(400,"Sorry could not find the ride for the user!!!");
    captainsInRadius.map(captain=>{
        sendMessageToSocketId(captain.socketId,{
            event:"new-ride",
            data:rideWithUser
        })
    });
    
};

export const getfare=async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup,destination}= await req.query;
    const fare=await calculateFare(pickup as string,destination as string);
    if(!fare) throw new ApiError(500,"Could not calculate the fare");
    return res.status(200).json(new ApiResponse(200,fare,"Successfully calculated the fare."));
};