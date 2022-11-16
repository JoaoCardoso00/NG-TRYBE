import { Router } from "express";
import { authRoutes } from "./app/routes/Auth";
import { userRoutes } from "./app/routes/users";

export const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
