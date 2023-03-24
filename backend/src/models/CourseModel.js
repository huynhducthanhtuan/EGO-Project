import mongoose from "mongoose";
import { ObjectId, DEFAULT_COURSE_THUMBNAIL } from "../constants/index.js";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      default: 0
    },
    description: {
      type: String
    },
    thumbnail: {
      type: String,
      default: DEFAULT_COURSE_THUMBNAIL
    },
    userId: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", CourseSchema);

export default CourseModel;
