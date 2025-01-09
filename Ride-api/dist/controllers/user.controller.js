import { User } from "../models/user.model.js";
import { ApiError } from "../helpers/ApiError.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { BlackListToken } from "../models/blackListToken.model.js";
import { validationResult } from "express-validator";
export const registerUser = async (req, res) => {
    const { fullName, email, password } = await req.body;
    const { firstName, lastName } = fullName;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!firstName || !email || !password)
        throw new ApiError(400, "All of the filelds are required.");
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            throw new ApiError(409, "User with same email or username already exists.");
        const newUser = await User.create({
            fullName: {
                firstName, lastName
            }, email, username: email.split("@")[0], password
        });
        if (!newUser)
            throw new ApiError(400, "Could not create the user");
        const createdUser = await User.findById(newUser._id);
        return res.status(201).json(new ApiResponse(201, createdUser, "User registration is successfull."));
    }
    catch (error) {
        throw new Error(`Error occured: ${error}`);
    }
};
export const userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = await req.body;
    try {
        const checkUser = await User.findOne({ email }).select("+password");
        if (!checkUser)
            res.json(new ApiResponse(401, "Looks like you have entered an non existing email."));
        if (!(await checkUser.isPasswordCorrect(password)))
            res.json(new ApiResponse(401, "Looks like you have entered an incorrect password."));
        const accessToken = await checkUser.generateAccessToken();
        const refreshToken = await checkUser.generateRefreshToken();
        res
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "none" })
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none" })
            .json(new ApiResponse(201, { id: checkUser._id, accessToken, refreshToken }, "You have logged in."));
    }
    catch (error) {
        throw new Error(`Error occured: ${error}`);
    }
};
export const userLogout = async (req, res) => {
    const userId = await req.userId;
    //await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
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
