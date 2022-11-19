import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../models/User.entity";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Account } from "../models/Accounts.entity";

const usersRepository = AppDataSource.getRepository(User);
const accountsRepository = AppDataSource.getRepository(Account);

class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const userExists = await usersRepository
        .createQueryBuilder("user")
        .where("user.username = :username", { username })
        .getOne();

      if (userExists) {
        return res.status(400).json({ message: "Usuário já existe" });
      }

      if (username.length < 3) {
        return res.status(400).json({
          message: "Nome de usuário tem que ter no minimo 3 caracteres",
        });
      }

      if (!password.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        return res.status(400).json({
          message:
            "Senha deve conter no minimo 8 caracteres e pelo menos uma letra maiúscula",
        });
      }

      const hashedPassword = await argon2.hash(password);

      const newUserAccount = accountsRepository.create({
        balance: 100.0,
      });

      await accountsRepository.save(newUserAccount);

      const newUser = usersRepository.create({
        username,
        password: hashedPassword,
        account: newUserAccount,
      });

      await usersRepository.save(newUser);

      const accessToken = jwt.sign(
        { userId: newUser.id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "24h" }
      );

      const refreshToken = jwt.sign(
        { userId: newUser.id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" }
      );

      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async signin(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await usersRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .getOne();

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "24h" }
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
      { expiresIn: "24h" }
    );

    res.json({ accessToken });
  }
}

export default new AuthController();
