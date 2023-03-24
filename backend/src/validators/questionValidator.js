import { returnValidationResult } from "./index.js";
import { body } from "express-validator";

const validateQuestionTestId = async (req, isOptional = false) => {
  await body("testId")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Question testId is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Question testId must include 24 characters")
    .run(req);
};

const validateQuestionContent = async (req, isOptional = false) => {
  await body("content")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Question content is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Question content must include A-Z")
    .run(req);
};

const validateQuestionIsMultiChoice = async (req, isOptional = false) => {
  await body("isMultiChoice")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Question isMultiChoice is required")
    .isBoolean()
    .withMessage("Question isMultiChoice must a boolean value")
    .run(req);
};

const validateQuestionScore = async (req, isOptional = false) => {
  await body("score")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage(`Question score is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Question score must greater than 0`)
    .run(req);
};

const validateQuestionAnswers = async (req, isOptional = false) => {
  await body("answers")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage("Question answers is required")
    .isArray({ min: 2, max: 5 })
    .withMessage("Question answers must a array including 2-5 answers")
    .run(req);
};

export const validateCreateQuestion = async (req) => {
  await Promise.all([
    validateQuestionTestId(req),
    validateQuestionContent(req),
    validateQuestionIsMultiChoice(req),
    validateQuestionScore(req),
    validateQuestionAnswers(req)
  ]);
  return returnValidationResult(req);
};

export const validateUpdateQuestion = async (req) => {
  const isOptional = true;

  await Promise.all([
    validateQuestionTestId(req, isOptional),
    validateQuestionContent(req, isOptional),
    validateQuestionIsMultiChoice(req, isOptional),
    validateQuestionScore(req, isOptional),
    validateQuestionAnswers(req, isOptional)
  ]);
  return returnValidationResult(req);
};
