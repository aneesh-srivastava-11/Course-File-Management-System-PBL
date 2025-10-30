// models/User.js - defines users table
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }, // hashed password
  role: { type: DataTypes.ENUM("student", "faculty", "admin"), defaultValue: "student" }
}, {
  timestamps: true
});

export default User;
