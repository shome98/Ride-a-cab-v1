import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { autoCompleteSuggestions, fetchDistanceTime, getCoordinates } from "../controllers/map.controller";
import { asyncHandler } from "../helpers/asyncHandler";
import { query } from "express-validator";

const router = Router();

router.get("/get-coordinates", query('address').isString().isLength({ min: 3 }), asyncHandler(auth), asyncHandler(getCoordinates));
router.get("/get-distance-time", query('origin').isString().isLength({ min: 3 }),
 query('destination').isString().isLength({ min: 3 }), asyncHandler(auth), asyncHandler(fetchDistanceTime));
router.get("/get-sugestions",query('input').isString().isLength({ min: 3 }), asyncHandler(auth), asyncHandler(autoCompleteSuggestions));

export default router;