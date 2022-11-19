import { Router } from "express";
import { authRoutes } from "./app/routes/auth";
import { userRoutes } from "./app/routes/users";

export const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
