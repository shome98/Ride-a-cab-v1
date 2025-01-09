import express from "express";
import { auth } from "../middlewares/auth.middleware.ts";
import { asyncHandler } from "../helpers/asyncHandler.ts";
import { bookRide, getFare, rideConfirmed, rideEnd, rideStart } from "../controllers/ride.controller.ts";
import { body, query } from "express-validator";

const router = express.Router();

router.post('/create',
    asyncHandler(auth),
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    asyncHandler(bookRide)
);

router.get('/get-fare',
    asyncHandler(auth),
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    asyncHandler(getFare)
);

router.post('/confirm',
    asyncHandler(auth),
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    asyncHandler(rideConfirmed)
);

router.get('/start-ride',
    asyncHandler(auth),
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    asyncHandler(rideStart)
);

router.post('/end-ride',
    asyncHandler(auth),
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    asyncHandler(rideEnd)
);

export default router;