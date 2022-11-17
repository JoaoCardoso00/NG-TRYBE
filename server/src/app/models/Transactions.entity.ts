import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./Accounts.entity";

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn()
  debitedAccount: Account;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn()
  creditedAccount: Account;

  @Column()
  value: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: number;
}
