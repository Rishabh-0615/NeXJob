
import multer from "multer";

const storage = multer.memoryStorage()

const uploadResume = multer({ storage }).fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 }
]);


export default uploadResume;