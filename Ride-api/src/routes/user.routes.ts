import express from "express";
import { registerUser, userLogin, userLogout } from "../controllers/user.controller";
import { asyncHandler } from "../helpers/AsyncHandler";
import { auth } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/register-user", asyncHandler(registerUser));
router.post("/login-user", asyncHandler(userLogin));
router.post("/logout-user",asyncHandler(auth), asyncHandler(userLogout));
export default router;
