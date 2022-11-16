import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "accounts" })
export class Accounts {
  @PrimaryColumn("uuid")
  id: number;

  @Column()
  balance: number;
}
