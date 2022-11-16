import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./Accounts.entity";

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Account, (account) => account.id)
  debitedAccountId: number;

  @OneToMany(() => Account, (account) => account.id)
  creditedAccountId: number;

  @Column()
  value: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: number;
}
