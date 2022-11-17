import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../models/User.entity";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

const usersRepository = AppDataSource.getRepository(User);

class usersController {
  async findOne(req: Request, res: Response) {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId } = jwt.verify(
      token as string,

      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    const user = await usersRepository.findOne({
      where: { id: userId },
      select: ["id", "username", "account"],
      relations: ["account"],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.json(user);
  }
}

export default new usersController();
