import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Accounts } from "./Accounts.entity";

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryColumn("uuid")
  id: number;

  @OneToMany(() => Accounts, (account) => account.id)
  debitedAccountId: number;

  @OneToMany(() => Accounts, (account) => account.id)
  creditedAccountId: number;

  @Column()
  value: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: number;
}
