import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { autoCompleteSuggestions, fetchDistanceTime, getCoordinates } from "../controllers/map.controller";
import { asyncHandler } from "../helpers/asyncHandler";

const router = Router();

router.get("/get-coordinates", asyncHandler(auth), asyncHandler(getCoordinates));
router.get("/get-distance-time", asyncHandler(auth), asyncHandler(fetchDistanceTime));
router.get("/get-sugestions", asyncHandler(auth), asyncHandler(autoCompleteSuggestions));

export default router;