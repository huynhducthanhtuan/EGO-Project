import { returnValidationResult } from "./index.js";
import { body } from "express-validator";

const validateCourseName = async (req, isOptional = false) => {
  await body("name")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Course name is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Course name must include A-Z")
    .run(req);
};

const validateCourseCost = async (req, isOptional = false) => {
  await body("cost")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage(`Course cost is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Course cost must greater than 0`)
    .run(req);
};

const validateCourseDescription = async (req, isOptional = false) => {
  await body("description")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Course description is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Course description must include A-Z")
    .run(req);
};

const validateCourseThumbnail = async (req, isOptional = false) => {
  await body("thumbnail")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Course thumbnail is required")
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
    .withMessage("Course thumbnail is invalid")
    .run(req);
};

const validateCourseUserId = async (req) => {
  await body("userId")
    .trim()
    .notEmpty()
    .withMessage("Course userId is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Course userId must include 24 characters")
    .run(req);
};

export const validateCourse = async (req) => {
  await Promise.all([
    validateCourseName(req),
    validateCourseCost(req),
    validateCourseDescription(req),
    validateCourseThumbnail(req),
    validateCourseUserId(req)
  ]);
  return returnValidationResult(req);
};

export const validateUpdateCourse = async (req) => {
  const isOptional = true;

  await Promise.all([
    validateCourseName(req, isOptional),
    validateCourseCost(req, isOptional),
    validateCourseDescription(req, isOptional),
    validateCourseThumbnail(req, isOptional)
  ]);
  return returnValidationResult(req);
};
