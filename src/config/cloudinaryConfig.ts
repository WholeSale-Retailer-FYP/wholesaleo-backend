import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};
export { cloudinaryConfig };
