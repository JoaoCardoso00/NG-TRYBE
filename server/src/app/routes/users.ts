import { Router } from "express";
import transactionsController from "../controllers/transactionsController";
import usersController from "../controllers/usersController";

export const userRoutes = Router();

// get user info
userRoutes.get("/", usersController.findOne);

// get all transactions from a specific account
userRoutes.get("/transactions", transactionsController.findByUser);

// transfer to a user
userRoutes.post("/transactions/", transactionsController.transfer);
