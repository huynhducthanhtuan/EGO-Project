import {
  checkExistedQuestion,
  handleCreateNewQuestion,
  handleUpdateQuestion,
  handleDeleteQuestionById,
  handleDeleteManyQuestions,
  getQuestionDetail
} from "../services/crudDatabase/question.js";
import { checkExistedTest } from "../services/crudDatabase/test.js";
import {
  validateCreateQuestion,
  validateUpdateQuestion
} from "../validators/questionValidator.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const QuestionController = {
  createQuestion: catchAsync(async (req, res, next) => {
    const { status, error } = await validateCreateQuestion(req);
    const testId = req.body.testId;

    if (status === "Fail") return next(new AppError(error, 400));

    const isExistedTestId = await checkExistedTest(testId);
    if (isExistedTestId === false)
      return next(new AppError("Test ID is not existed", 404));

    const course = await handleCreateNewQuestion(req.body);

    return res.json({
      status: "Success",
      error: null,
      data: course
    });
  }),

  updateQuestion: catchAsync(async (req, res, next) => {
    const questionId = req.params.questionId;
    const testId = req.body.testId;

    const { status, error } = await validateUpdateQuestion(req);
    if (status === "Fail") return next(new AppError(error, 400));

    const isExistedTest = await checkExistedTest(testId);
    if (isExistedTest === false)
      return next(new AppError("Test is not existed", 404));

    const isExistedQuestion = await checkExistedQuestion(questionId);
    if (isExistedQuestion === false)
      return next(new AppError("Question is not existed", 404));

    const question = await handleUpdateQuestion(questionId, req.body);

    return res.json({
      status: "Success",
      error: null,
      data: question
    });
  }),

  deleteQuestion: catchAsync(async (req, res) => {
    const questionId = req.params.questionId;
    const isDeleted = await handleDeleteQuestionById(questionId);

    return res.json({
      status: "Success",
      error: null,
      data: isDeleted
    });
  }),

  deleteQuestions: catchAsync(async (req, res) => {
    const questionIds = req.body.questionIds;
    const isDeleted = await handleDeleteManyQuestions(questionIds);

    return res.json({
      status: "Success",
      error: null,
      data: isDeleted
    });
  }),

  getQuestion: catchAsync(async (req, res) => {
    const questionId = req.params.questionId;

    const questionDetail = await getQuestionDetail(questionId);

    return res.json({
      status: "Success",
      error: null,
      data: questionDetail
    });
  })
};

export default QuestionController;
