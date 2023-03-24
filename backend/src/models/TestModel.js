import mongoose from "mongoose";
import { ObjectId } from "../constants/index.js";

const TestSchema = new mongoose.Schema(
  {
    lessonId: {
      type: ObjectId,
      required: true,
      ref: "Lesson"
    },
    timeLimit: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

const TestModel = mongoose.model("Test", TestSchema);

export default TestModel;
