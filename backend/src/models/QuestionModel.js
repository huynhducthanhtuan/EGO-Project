import mongoose from "mongoose";
import { ObjectId } from "../constants/index.js";

const QuestionSchema = new mongoose.Schema(
  {
    testId: {
      type: ObjectId,
      required: true,
      ref: "Test"
    },
    content: {
      type: String,
      required: true
    },
    isMultiChoice: {
      type: Boolean,
      default: false,
      required: true
    },
    score: {
      type: Number,
      default: 0,
      required: true
    }
  },
  { timestamps: true }
);

const QuestionModel = mongoose.model("Question", QuestionSchema);

export default QuestionModel;
