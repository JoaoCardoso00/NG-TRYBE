import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "accounts" })
export class Accounts {
  @PrimaryColumn("uuid")
  id: number;

  @Column({ insert: false, default: 100.0 })
  balance: number;
}
