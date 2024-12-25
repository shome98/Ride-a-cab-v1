import { Request,Response } from "express";
import { validationResult } from "express-validator";
import { Ride } from "../models/ride.model";
import { getAddressCoordinates, getCaptainsInTheRadius } from "../services/map.service";

export const bookRide = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, pickup, destination, vehicleType } = await req.body;
    const newRide = await Ride.create({ user: userId, pickup, destination, vehicleType });
    const pickUpCoordinates = await getAddressCoordinates(pickup);
    const captainsInRadius = await getCaptainsInTheRadius(pickUpCoordinates.latitude, pickUpCoordinates.longitude, 2);
    newRide.otp = "";//for later fix
}