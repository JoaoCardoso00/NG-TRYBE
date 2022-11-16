import { Request, Response } from "express";

class AuthController {
  async signup(req: Request, res: Response) {}

  async signin(req: Request, res: Response) {}

  async refresh(req: Request, res: Response) {}
}

export default new AuthController();
