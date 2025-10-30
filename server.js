// server.js - main entry point
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

// Simple root route
app.get("/", (req, res) => res.send("Course File System API running"));

// Error handler (should be after routes)
app.use(errorHandler);

// Sync DB and start server
const PORT = process.env.PORT || 5000;
sequelize.sync()
  .then(() => {
    console.log("✅ Connected to database (sequelize.sync)");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });
