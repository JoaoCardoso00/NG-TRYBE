import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "accounts" })
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ insert: false, default: 100.0 })
  balance: number;
}
