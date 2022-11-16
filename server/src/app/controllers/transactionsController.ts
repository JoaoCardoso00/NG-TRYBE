import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Transaction } from "../models/Transactions.entity";

const transactionsRepository = AppDataSource.getRepository(Transaction);
class TransactionsController {
  async create(req: Request, res: Response) {}

  async findByUser(req: Request, res: Response) {}

  async transfer(req: Request, res: Response) {}
}

export default new TransactionsController();
