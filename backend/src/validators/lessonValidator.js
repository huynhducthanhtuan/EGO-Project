import { returnValidationResult } from "./index.js";
import { body } from "express-validator";

const validateLessonName = async (req, isOptional = false) => {
  await body("name")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Name lesson is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Name lesson must include A-Z")
    .isLength({ min: 10, max: 100 })
    .withMessage("Name lesson must from 10 to 100 characters")
    .run(req);
};

const validateVideoId = async (req, isOptional = false) => {
  await body("videoId")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Video Id is required")
    .isLength(11)
    .withMessage("Video Id is invalid")
    .run(req);
};

export const validateLesson = async (req) => {
  await Promise.all([validateLessonName(req), validateVideoId(req)]);
  return returnValidationResult(req);
};

export const validateUpdateLesson = async (req) => {
  const isOptional = true;

  await Promise.all([
    validateLessonName(req, isOptional),
    validateVideoId(req, isOptional)
  ]);
  return returnValidationResult(req);
};
