import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const File = sequelize.define("File", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  filename: { type: DataTypes.STRING, allowNull: false },
  uploaded_by: { type: DataTypes.STRING, allowNull: false },
  course_id: { type: DataTypes.INTEGER },
  s3_key: { type: DataTypes.STRING },
  s3_url: { type: DataTypes.STRING }
}, {
  timestamps: true
});

export default File;   // ✅ IMPORTANT
