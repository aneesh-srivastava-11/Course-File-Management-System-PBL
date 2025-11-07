// controllers/fileController.js - handle file upload and list
import multer from "multer";
import fs from "fs";
import File from "../models/File.js";
import { uploadToS3 } from "../utils/s3Upload.js";

// Multer configuration - store uploaded file temporarily in "temp/" folder
const upload = multer({ dest: "temp/" });
export const uploadMiddleware = upload.single("file");

// Upload file: expects form-data with 'file', 'course_id', 'uploaded_by'
export const uploadFile = async (req, res) => {
  try {
    const { course_id, uploaded_by } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload file from temp folder to S3
    const s3Result = await uploadToS3(req.file);

    // Save metadata to SQL
    const record = await File.create({
      filename: req.file.originalname,
      uploaded_by: uploaded_by || (req.user && req.user.name) || "unknown",
      course_id: course_id ? parseInt(course_id) : null,
      s3_key: s3Result.key,
      s3_url: s3Result.url
    });

    // Remove temp local file
    try {
      fs.unlinkSync(req.file.path);
    } catch (e) {
      console.warn("Could not delete temp file:", e.message);
    }

    res.status(201).json({ message: "File uploaded", file: record });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// List all files (could add filters later)
export const listFiles = async (req, res) => {
  try {
    const files = await File.findAll({ order: [["createdAt", "DESC"]] });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Could not list files", error: err.message });
  }
};
