import express from "express";
import TestResultController from "../controllers/TestResultController.js";
import { jwtGuard } from "../middlewares/authentication/jwtGuard.js";
import { Roles } from "../middlewares/authentication/roleGuard.js";
import { Role } from "../utils/index.js";

const router = express.Router();

router.get(
  "/",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  TestResultController.getTestResult
);

router.post(
  "/",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  TestResultController.submitTest
);

export default router;
