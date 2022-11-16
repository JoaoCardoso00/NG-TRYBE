import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../models/User.entity";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const usersRepository = AppDataSource.getRepository(User);

class AuthController {
  async signup(req: Request, res: Response) {
    const { username, password } = req.body;

    const userExists = await usersRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .getOne();

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = usersRepository.create({
      username,
      password: hashedPassword,
    });

    await usersRepository.save(newUser);

    const accessToken = jwt.sign(
      { userId: newUser.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: newUser.id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ accessToken, refreshToken });
  }

  async signin(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await usersRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .getOne();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ accessToken, refreshToken });
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const user = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { userId: number };

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  }
}

export default new AuthController();
