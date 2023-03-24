import {
  createNewTest,
  getTestDetail,
  getTestsByLesson,
  checkExistedTest,
  updateExistedTest,
  handleDeleteTests
} from "../services/crudDatabase/test.js";
import { checkExistedLessonId } from "../services/crudDatabase/lesson.js";
import {
  validateTest,
  validateUpdateTestOptional
} from "../validators/testValidator.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const TestController = {
  createTest: catchAsync(async (req, res, next) => {
    const { status, error } = await validateTest(req);
    const lessonId = req.body.lessonId;

    if (status === "Fail") return next(new AppError(error, 400));

    const isExistedLessonId = await checkExistedLessonId(lessonId);
    if (isExistedLessonId === false)
      return next(new AppError("Lesson Id is not existed", 404));

    const test = await createNewTest(req.body);

    return res.json({
      status: "Success",
      error: null,
      data: test
    });
  }),

  getTestsByLesson: catchAsync(async (req, res) => {
    const lessonId = req.query.lessonId;
    const listTests = await getTestsByLesson(lessonId);

    return res.json({
      status: "Success",
      error: null,
      data: listTests
    });
  }),

  getTestById: catchAsync(async (req, res) => {
    const testId = req.params.testId;
    const testDetail = await getTestDetail(testId);

    return res.json({
      status: "Success",
      error: null,
      data: testDetail
    });
  }),

  updateTest: catchAsync(async (req, res, next) => {
    const testId = req.params.id;

    const { status, error } = await validateUpdateTestOptional(req);
    if (status === "Fail") return next(new AppError(error, 400));

    const isExistedTestId = await checkExistedTest(testId);
    if (isExistedTestId === false)
      return next(new AppError("Test Id is not existed", 404));

    const test = await updateExistedTest(testId, req.body);

    return res.json({
      status: "Success",
      error: null,
      data: test
    });
  }),

  deleteTest: catchAsync(async (req, res) => {
    const testId = req.params.testId;
    const deleteTestArray = [testId];
    const deleteInfo = await handleDeleteTests(deleteTestArray);

    return res.json({
      status: "Success",
      error: null,
      data: deleteInfo
    });
  }),

  deleteManyTests: catchAsync(async (req, res) => {
    const testIds = req.body.testIds;
    const deleteInfo = await handleDeleteTests(testIds);

    return res.json({
      status: "Success",
      error: null,
      data: deleteInfo
    });
  })
};

export default TestController;
