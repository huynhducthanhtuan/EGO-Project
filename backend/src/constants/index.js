import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const ObjectId = mongoose.Types.ObjectId;
export const MONGO_URI = process.env.MONGO_URI;
export const EXPIRES_IN = process.env.EXPIRES_IN;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const PORT = process.env.PORT || 4001;
export const NODE_ENV = process.env.NODE_ENV;
export const DEVELOPMENT_URL = `http://localhost:${PORT}`;
export const PRODUCTION_URL = process.env.PRODUCTION_URL;
export const HOST_URL =
  NODE_ENV === "development" ? DEVELOPMENT_URL : PRODUCTION_URL;
export const SWAGGER_URL = `${HOST_URL}/api-docs/`;

export const DEFAULT_USER_AVATAR =
  "https://res.cloudinary.com/dtpti4fdq/image/upload/v1677661649/default-avatar_urcr1t.jpg";
export const DEFAULT_COURSE_THUMBNAIL =
  "https://res.cloudinary.com/dtpti4fdq/image/upload/v1677661649/default-course-thumbnail_livmtf.png";
