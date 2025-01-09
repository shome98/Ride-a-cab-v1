import { Captain } from "../models/captain.model.js";
import { ApiError } from "../helpers/ApiError.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { BlackListToken } from "../models/blackListToken.model.js";
import { validationResult } from "express-validator";
export const registerCaptain = async (req, res) => {
    const { fullName, email, password, vehicle } = await req.body;
    const { firstName, lastName } = fullName;
    const { color, plate, capacity, vehicleType } = vehicle;
    /*if (!fullName || !fullName.firstName) throw new ApiError(400, "First name is required.");
    if (!email) throw new ApiError(400, "Email is required.");
    if (!password) throw new ApiError(400, "Password is required.");
    if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        throw new ApiError(400, "All vehicle details are required.");
    }*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType)
        throw new ApiError(400, "All of the filelds are required.");
    try {
        const existingCaptain = await Captain.findOne({ email });
        //add a functionality if a user wants to be a captain
        if (existingCaptain)
            throw new ApiError(409, "Captain with same email or username already exists.");
        const newCaptain = await Captain.create({
            fullName: { firstName, lastName },
            email,
            username: email.split("@")[0],
            password,
            vehicle: { color, plate, capacity, vehicleType }
        });
        if (!newCaptain)
            throw new ApiError(400, "Could not create the captain.");
        const createdCaptain = await Captain.findById(newCaptain._id);
        return res.status(201).json(new ApiResponse(201, createdCaptain, "Captain registration is successfull."));
    }
    catch (error) {
        throw new Error(`Error occured: ${error}`);
    }
};
export const captainLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = await req.body;
    try {
        const checkCaptain = await Captain.findOne({ email }).select("+password");
        if (!checkCaptain)
            res.json(new ApiResponse(401, "Looks like you have entered an non existing email."));
        if (!(await checkCaptain.isPasswordCorrect(password)))
            res.json(new ApiResponse(401, "Looks like you have entered an incorrect password."));
        const accessToken = await checkCaptain.generateAccessToken();
        const refreshToken = await checkCaptain.generateRefreshToken();
        res
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "none" })
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none" })
            .json(new ApiResponse(201, { id: checkCaptain._id, accessToken, refreshToken }, "You have logged in."));
    }
    catch (error) {
        throw new Error(`Error occured: ${error}`);
    }
};
export const captainLogout = async (req, res) => {
    const captainId = await req.captainId;
    //console.log(`the captain is - ${await (req as any).captain}`);
    //await Captain.findByIdAndUpdate(captainId, { $unset: { refreshToken: 1 } });
    const accessToken = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;
    try {
        await BlackListToken.create({ token: accessToken });
        return res
            .status(200)
            .clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "none" })
            .clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none" })
            .json(new ApiResponse(200, {}, "You have logged out."));
    }
    catch (error) {
        throw new Error(`Error occured: ${error}`);
    }
};
