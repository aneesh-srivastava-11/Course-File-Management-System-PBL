// routes/fileRoutes.js
import express from "express";
import { uploadMiddleware, uploadFile, listFiles } from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/files/upload  (protected)
router.post("/upload", protect, uploadMiddleware, uploadFile);

// GET /api/files/  (protected)
router.get("/", protect, listFiles);

export default router;
