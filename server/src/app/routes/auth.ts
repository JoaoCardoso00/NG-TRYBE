import { Router } from "express";
import authController from "../controllers/authController";

export const authRoutes = Router();

// register new user
authRoutes.post("/signup", authController.signup);

// login
authRoutes.put("/signin", authController.signin);

// refresh token
authRoutes.patch("/refresh", authController.refresh);
