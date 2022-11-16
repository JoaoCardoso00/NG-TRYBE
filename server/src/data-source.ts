import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  logging: false,
  entities: ["src/app/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
});
