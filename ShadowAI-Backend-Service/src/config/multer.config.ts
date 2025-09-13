import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import shadowAiLogger from "../libs/logger.libs";

const newLocation = path.join(process.cwd(), "images");

if (!fs.existsSync(newLocation)) {
  shadowAiLogger.info(`Creating images directory`);
  fs.mkdirSync(newLocation, { recursive: true });
}

const storageConfig = multer.diskStorage({
  destination: newLocation,
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storageConfig,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
