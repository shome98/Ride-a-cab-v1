import express from "express";

import { asyncHandler } from "../helpers/AsyncHandler";
import { auth } from "../middlewares/auth.middleware";
import { captainLogin, captainLogout, registerCaptain } from "../controllers/captain.controller";
const router = express.Router();

router.post("/register-captain", asyncHandler(registerCaptain));
router.post("/login-captain", asyncHandler(captainLogin));
router.post("/logout-captain",asyncHandler(auth), asyncHandler(captainLogout));
export default router;