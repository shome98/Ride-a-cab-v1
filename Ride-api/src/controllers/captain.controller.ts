import { Request, Response } from "express";
import { Captain } from "../models/captain.model";
import { ApiError } from "../helpers/ApiError";
import { ApiResponse } from "../helpers/ApiResponse";
export const registerCaptain=async(req:Request,res:Response)=>{
    const {fullName,email,password,vehicle}=await req.body;
    const {firstName,lastName}=fullName;
    const {color,plate,capacity,vehicleType}=vehicle;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    if(!firstName||!email||!password||!color||!plate||!capacity||!vehicleType) throw new ApiError(400, "All of the filelds are required.");
    const existingCaptain=await Captain.findOne({email});
    //add a functionality if a user wants to be a captain
    if (existingCaptain) throw new ApiError(409, "Captain with same email or username already exists.");
    const newCaptain=await Captain.create({
        fullName:{firstName,lastName},
        email,
        username:email.split("@")[0],
        password,
        vehicle: {color, plate,capacity,vehicleType}});
    if(!newCaptain) throw new ApiError(400,"Could not create the captain.");
    const createdCaptain=await Captain.findById(newCaptain._id);
    return res.status(201).json(new ApiResponse(201, createdCaptain, "Captain registration is successfull.")); 
};