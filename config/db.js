// config/db.js - connect to MySQL via Sequelize
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false // set true to see SQL logs
  }
);

export default sequelize;
