import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Transaction } from "../models/Transactions.entity";
import jwt from "jsonwebtoken";
import { Account } from "../models/Accounts.entity";
import { User } from "../models/User.entity";

interface JwtPayload {
  userId: string;
}

const accountsRepository = AppDataSource.getRepository(Account);
const transactionsRepository = AppDataSource.getRepository(Transaction);
const usersRepository = AppDataSource.getRepository(User);
class TransactionsController {
  async transfer(req: Request, res: Response) {
    const { token } = req.headers;
    const { value, username } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Não autorizado" });
    }

    try {
      const { userId } = jwt.verify(
        token as string,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;

      const user = await usersRepository.findOne({
        where: { id: userId },
        relations: ["account"],
      });

      if (!user) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }

      const userToTransfer = await usersRepository.findOne({
        where: { username },
        relations: ["account"],
      });

      if (!userToTransfer) {
        return res.status(400).json({ message: "Usuário a se transferir não encontrado" });
      }

      const userAccount = await accountsRepository
        .createQueryBuilder("account")
        .where("account.id = :account", { account: user.account.id })
        .getOne();

      if (!userAccount) {
        return res.status(400).json({ message: "Conta não encontrada" });
      }

      const userToTransferAccount = await accountsRepository
        .createQueryBuilder("account")
        .where("account.id = :account", {
          account: userToTransfer.account.id,
        })
        .getOne();

      if (!userToTransferAccount) {
        return res
          .status(400)
          .json({ message: "Conta a transferir não encontrada" });
      }

      if (userAccount.balance < value) {
        return res
          .status(400)
          .json({
            message: "Fundos insuficientes para completar a transferência",
          });
      }

      if (user.id === userToTransfer.id) {
        return res
          .status(400)
          .json({ message: "Você não pode transferir para você mesmo" });
      }

      accountsRepository.merge(userAccount, {
        balance: Number(userAccount.balance) - Number(value),
      });

      await accountsRepository.save(userAccount);

      accountsRepository.merge(userToTransferAccount, {
        balance: Number(userToTransferAccount.balance) + Number(value),
      });

      await accountsRepository.save(userToTransferAccount);

      const transaction = transactionsRepository.create({
        debitedAccount: userAccount,
        creditedAccount: userToTransferAccount,
        value,
      });

      await transactionsRepository.save(transaction);

      res.json(transaction);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async findByUser(req: Request, res: Response) {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { userId } = jwt.verify(
        token as string,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;

      // get user account using userId
      const user = await usersRepository.findOne({
        where: { id: userId },
        relations: ["account"],
      });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const transactions = await transactionsRepository
        .createQueryBuilder("transaction")
        .where("transaction.debitedAccount = :account", {
          account: user?.account.id,
        })
        .orWhere("transaction.creditedAccount = :account", {
          account: user?.account.id,
        })
        .loadAllRelationIds()
        .getMany();

      res.json(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new TransactionsController();
