import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  username: "postgres",
  password: "123456",
  database: "desafio_tecnico",
  host: "127.0.0.1",
  dialect: "postgres",
  logging: false,
});
