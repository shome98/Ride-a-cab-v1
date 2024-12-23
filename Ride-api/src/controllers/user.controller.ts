import { Request, Response } from "express";
import { User } from "../models/user.model";
import { ApiError } from "../helpers/ApiError";
import { ApiResponse } from "../helpers/ApiResponse";

export const registerUser=async(req:Request,res:Response)=>{
    const {fullName,email,password}=await req.body;
    const {firstName,lastName}=fullName;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    if(!firstName||!email||!password) throw new ApiError(400, "All of the filelds are required.");
    const existingUser=await User.findOne({email});
    if (existingUser) throw new ApiError(409, "User with same email or username already exists.");
    const newUser=await User.create({
        fullName:{
            firstName,lastName
        },email,username:email.split("@")[0],password});
    if(!newUser) throw new ApiError(400,"Could not create the user");
    const createdUser=await User.findById(newUser._id);
    return res.status(201).json(new ApiResponse(201, createdUser, "User registration is successfull.")); 
};