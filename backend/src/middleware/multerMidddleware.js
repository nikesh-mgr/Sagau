import multer from "multer";
import path from "path";
import fs from "fs";

// ===========================================
// Create Upload Folder Automatically
// ===========================================

const createFolder = (folder) => {
  const uploadPath = `uploads/${folder}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });

    console.log(`✅ Created Folder : ${uploadPath}`);
  }

  return uploadPath;
};

// ===========================================
// Allowed Image Types
// ===========================================

const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const extension = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  const mime = allowedTypes.test(file.mimetype);

  if (extension && mime) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));
};

// ===========================================
// Storage Factory
// ===========================================

const storage = (folder) =>
  multer.diskStorage({
    destination(req, file, cb) {
      cb(null, createFolder(folder));
    },

    filename(req, file, cb) {
      const uniqueName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname);

      cb(null, uniqueName);
    },
  });

// ===========================================
// Upload Factory
// ===========================================

const uploadFactory = (folder) =>
  multer({
    storage: storage(folder),

    fileFilter: imageFilter,

    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });

// ===========================================
// Exports
// ===========================================

export const uploadProfile = uploadFactory("profiles");

export const uploadJob = uploadFactory("jobs");

export const uploadPortfolio = uploadFactory("portfolio");

export const uploadPayment = uploadFactory("payments");
