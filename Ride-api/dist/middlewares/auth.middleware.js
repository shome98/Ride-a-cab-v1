import jwt from "jsonwebtoken";
import { BlackListToken } from "../models/blackListToken.model.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";
import { ApiError } from "../helpers/ApiError.js";
export const auth = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;
    const balcklisted = await BlackListToken.findOne({ token: accessToken });
    if (balcklisted)
        res.json(new ApiResponse(401, "You are Unauthorized"));
    // const decodeUser=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_USER!);
    // const decodedCaptain=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_CAPTAIN!);
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        //console.log(decoded);
        if (!decoded || typeof decoded !== "object" || !("role" in decoded))
            res.json(new ApiResponse(401, "You have a invalid token."));
        switch (decoded.role) {
            case "User":
                const loggedInUser = await User.findById(decoded._id);
                req.user = loggedInUser;
                req.userId = decoded._id;
                //console.log((req as any).user)
                break;
            case "Captain":
                const loggedInCaptain = await Captain.findById(decoded._id);
                req.captain = loggedInCaptain;
                req.captainId = decoded._id;
                break;
            default:
                res.json(new ApiResponse(403, "Role not found."));
        }
        next();
    }
    catch (error) {
        return res.json(new ApiError(500, "Could not verify you."));
    }
};
