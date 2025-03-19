import express from "express";
import { loginFn, registerFn } from "../controllers/user.js";

const authRouter = express.Router();

/**
 * @route   POST /auth/login
 * @desc    User login
 * @access  Public
 */
authRouter.post("/login", loginFn);

/**
 * @route   POST /auth/register
 * @desc    User registration
 * @access  Public
 */
authRouter.post("/register", registerFn);

export { authRouter };
