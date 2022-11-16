import { Request, Response } from "express";
import { Router } from "express";

export const authRoutes = Router();

// register new user
authRoutes.post("/signup", (request: Request, response: Response) => {
  return response.json({ message: "Hello World!" });
});

// login
authRoutes.put("/signin", (request: Request, response: Response) => {
  return response.json({ message: "Hello World!" });
});

// refresh token
authRoutes.patch("/refresh", (request: Request, response: Response) => {
  return response.json({ message: "Hello World!" });
});
