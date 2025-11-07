import multer from "multer";
import File from "../models/File.js";
import { saveLocalFile } from "../utils/localStorage.js";

// Save file temporarily in temp/
const upload = multer({ dest: "temp/" });
export const uploadMiddleware = upload.single("file");

export const uploadFile = async (req, res) => {
  try {
    const { course_id, uploaded_by } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save file locally
    const saved = await saveLocalFile(req.file);

    // Save file metadata to SQL DB
    const fileRecord = await File.create({
      filename: saved.filename,
      uploaded_by,
      course_id,
      s3_key: null,     // not used now
      s3_url: saved.path
    });

    res.json({
      message: "File saved LOCALLY",
      file: fileRecord
    });

  } catch (err) {
    res.status(500).json({ message: "Local upload failed", error: err.message });
  }
};
export const listFiles = async (req, res) => {
  try {
    const files = await File.findAll({ order: [["createdAt", "DESC"]] });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch files", error: err.message });
  }
};
