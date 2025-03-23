import multer from "multer";

const storage = multer.memoryStorage();

const uploadFile = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("application/") && !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only document or image files are allowed"), false);
    }
    cb(null, true);
  },
}).fields([
  { name: "resume", maxCount: 1 },
  { name: "coverLetter", maxCount: 1 },
]);

export default uploadFile;
