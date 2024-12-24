import { Request, Response } from "express";
import { getAddressCoordinates } from "../services/map.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { ApiError } from "../helpers/ApiError";

export const getCoordinates=async(req:Request,res:Response)=>{
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    const {address}=await req.query;
    try {
        const coordinates = await getAddressCoordinates(address as string);
        res.status(200).json(new ApiResponse(200,coordinates));
    } catch (error) {
        res.status(404).json(new ApiError(404,"No coodinates were found for the address."));
    }
}
