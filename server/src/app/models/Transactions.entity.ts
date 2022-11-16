import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Account } from "./Accounts.entity";

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryColumn("uuid")
  id: number;

  @OneToMany(() => Account, (account) => account.id)
  debitedAccountId: number;

  @OneToMany(() => Account, (account) => account.id)
  creditedAccountId: number;

  @Column()
  value: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: number;
}
