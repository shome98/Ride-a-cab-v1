import express from "express";
import { registerUser, userLogin, userLogout } from "../controllers/user.controller";
import { asyncHandler } from "../helpers/asyncHandler";
import { auth } from "../middlewares/auth.middleware";
import { body } from "express-validator";
const router = express.Router();
router.post("/register-user", [body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], asyncHandler(registerUser));
router.post("/login-user", [body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], asyncHandler(userLogin));
router.post("/logout-user", asyncHandler(auth), asyncHandler(userLogout));
export default router;
