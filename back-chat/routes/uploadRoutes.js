import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// --------
// Multer storage configuration
// --------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads");
    // Ensure the uploads folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Save file as timestamp + original filename
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

// --------
// File upload endpoint
// --------
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
 res.status(200).json({
  success: true,
  file_url: fileUrl,
  original_name: req.file.originalname,
  type: req.file.mimetype,
});
});

// --------
// Serve uploaded files
// --------
router.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

export default router;
