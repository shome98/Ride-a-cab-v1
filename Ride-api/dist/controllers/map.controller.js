import { getAddressCoordinates, getAutoCompleteSuggestions, getDistanceTime } from "../services/map.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { ApiError } from "../helpers/ApiError";
import { validationResult } from "express-validator";
export const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = await req.query;
    try {
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json(new ApiResponse(200, coordinates));
    }
    catch (error) {
        res.status(404).json(new ApiError(404, "No coodinates were found for the address."));
    }
};
export const fetchDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = await req.query;
    try {
        const distanceTime = await getDistanceTime(origin, destination);
        res.status(200).json(new ApiResponse(200, distanceTime));
    }
    catch (error) {
        res.status(404).json(new ApiError(404, "No values of distance and time were found origin between destination"));
    }
};
export const autoCompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { input } = await req.query;
    try {
        const suggestions = await getAutoCompleteSuggestions(input);
        res.status(200).json(new ApiResponse(200, suggestions));
    }
    catch (error) {
        res.status(404).json(new ApiError(404, "No suggestions were found."));
    }
};
