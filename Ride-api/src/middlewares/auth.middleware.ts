import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BlackListToken } from "../models/blackListToken.model";
import { ApiResponse } from "../helpers/ApiResponse";
import { decode } from "punycode";
import { User } from "../models/user.model";
import { Captain } from "../models/captain.model";
import { ApiError } from "../helpers/ApiError";

export const auth=async(req:Request,res:Response,next:NextFunction)=>{
    const accessToken=req.headers.authorization?.split(" ")[1]||req.cookies?.accessToken;
    const balcklisted=await BlackListToken.findOne({token:accessToken});
    if(balcklisted) res.json(new ApiResponse(401,"You are Unauthorized"));
    // const decodeUser=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_USER!);
    // const decodedCaptain=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_CAPTAIN!);
    try {
        const decoded=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET!) as {_id:string,role:string};
        if(!decoded||typeof decoded!=="object"||!("role" in decoded)) res.json(new ApiResponse(401,"You have a invalid token."));
        switch(decoded.role){
            case "User":
                const loggedInUser=await User.findById(decoded._id);
                (req as any).user=loggedInUser;
                (req as any).userId = decoded._id;
            case "Captain":
                const loggedInCaptain=await Captain.findById(decoded._id);
                (req as any).captain=loggedInCaptain;
                (req as any).captainId = decoded._id;
            default:
                res.json(new ApiResponse(403,"Role not found."));
        }
        next();
    } catch (error) {
        return res.json(new ApiError(500,"Could not verify you."))
    }
}