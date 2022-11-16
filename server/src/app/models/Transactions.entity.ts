import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Accounts } from "./Accounts.entity";

@Entity({ name: "transactions" })
export class Transactions {
  @PrimaryColumn("uuid")
  id: number;

  @OneToMany((type) => Accounts, (account) => account.id)
  debitedAccountId: number;

  @OneToMany((type) => Accounts, (account) => account.id)
  creditedAccountId: number;

  @Column()
  value: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: number;
}
