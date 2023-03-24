import { returnValidationResult } from "./index.js";
import { body } from "express-validator";

const validateTestTimeLimit = async (req, isOptional = false) => {
  await body("timeLimit")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage(`Time limit is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Time limit must greater than 0`)
    .run(req);
};

const validateTestScore = async (req, isOptional = false) => {
  await body("score")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage(`Score is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Score must greater than 0`)
    .run(req);
};

const validateTestDescription = async (req, isOptional = false) => {
  await body("description")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Test description is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Test description must include A-Z")
    .run(req);
};

export const validateTest = async (req) => {
  await Promise.all([
    validateTestTimeLimit(req),
    validateTestDescription(req),
    validateTestScore(req)
  ]);
  return returnValidationResult(req);
};

export const validateUpdateTestOptional = async (req) => {
  const isOptional = true;

  await Promise.all([
    validateTestTimeLimit(req, isOptional),
    validateTestDescription(req, isOptional),
    validateTestScore(req, isOptional)
  ]);
  return returnValidationResult(req);
};
