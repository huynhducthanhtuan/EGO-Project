import express from "express";
import RegisterController from "../controllers/RegisterController.js";
import { jwtGuard } from "../middlewares/authentication/jwtGuard.js";
import { Roles } from "../middlewares/authentication/roleGuard.js";
import { Role } from "../utils/index.js";

const router = express.Router();

router.get("/", jwtGuard, Roles(Role.LEARNER), RegisterController.getRegister);

router.post(
  "/",
  jwtGuard,
  Roles(Role.LEARNER),
  RegisterController.registerNewCourse
);

router.delete(
  "/:registerId",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  RegisterController.deleteRegister
);

router.delete(
  "/",
  Roles(Role.TEACHER, Role.LEARNER),
  RegisterController.deleteRegisters
);

router.get(
  "/my-registers",
  jwtGuard,
  Roles(Role.LEARNER),
  RegisterController.getRegisteredCoursesByUser
);

router.get(
  "/my-not-registers",
  jwtGuard,
  Roles(Role.LEARNER),
  RegisterController.getNotRegisteredCoursesByUser
);

export default router;
