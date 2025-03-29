import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const uploadToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "job-applications", resource_type: "raw", public_id: fileName },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;
