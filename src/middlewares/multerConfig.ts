import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const timestamp = Date.now();
    const filename = `${baseName}_${timestamp}${ext}`;
    cb(null, filename);
  },
});

export const uploadConfig = multer({ storage });
