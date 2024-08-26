import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/user";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "testApi",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
