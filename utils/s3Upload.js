// utils/s3Upload.js - simple helper to upload a file to S3
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Create S3 client with credentials from .env
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Upload function: receives multer file object (with .path and .originalname)
export const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const key = `uploads/${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: file.mimetype
  };

  // send upload command
  await s3.send(new PutObjectCommand(params));

  // Return S3 key and public URL
  return {
    key,
    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  };
};
