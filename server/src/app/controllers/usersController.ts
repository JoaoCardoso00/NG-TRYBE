import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../models/User.entity";

const usersRepository = AppDataSource.getRepository(User);

class usersController {
  async findOne(req: Request, res: Response) {}

  async create(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}
}

export default new usersController();
