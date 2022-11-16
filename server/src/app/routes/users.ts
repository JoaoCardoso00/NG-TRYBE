import { Request, Response } from "express";
import { Router } from "express";

export const userRoutes = Router();

// get user info
userRoutes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Hello World!" });
});

// get all transactions from a specific account
userRoutes.get("/transactions", (request: Request, response: Response) => {
  return response.json({ message: "Hello World!" });
});

// transfer to a user
userRoutes.post("/transactions/:username", (request: Request, response: Response) => {
  return response.json({ message: "Hello World!" });
});
