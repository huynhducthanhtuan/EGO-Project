import mongoose from "mongoose";
import { ObjectId } from "../constants/index.js";

const AnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: ObjectId,
      required: true,
      ref: "Question"
    },
    content: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

const AnswerModel = mongoose.model("Answer", AnswerSchema);

export default AnswerModel;
