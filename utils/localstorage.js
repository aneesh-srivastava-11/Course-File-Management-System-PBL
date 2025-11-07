import fs from "fs";
import path from "path";

export const saveLocalFile = async (file) => {
  const uploadDir = path.join(process.cwd(), "uploads");

  // Make folder if not exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const newFilename = Date.now() + "-" + file.originalname;
  const newPath = path.join(uploadDir, newFilename);

  // Move file from temp folder to uploads/
  fs.renameSync(file.path, newPath);

  return {
    filename: newFilename,
    path: "/uploads/" + newFilename
  };
};
