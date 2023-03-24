import mongoose from "mongoose";
import { Role } from "../utils/index.js";
import { DEFAULT_USER_AVATAR } from "../constants/index.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      max: 100,
      required: true
    },
    password: {
      type: String,
      max: 200,
      required: true
    },
    name: {
      type: String,
      max: 200,
      required: true
    },
    email: {
      type: String,
      max: 200,
      required: true
    },
    role: {
      type: Number,
      enum: Role,
      default: Role.LEARNER,
      required: true
    },
    avatar: {
      type: String,
      max: 1000,
      default: DEFAULT_USER_AVATAR
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
