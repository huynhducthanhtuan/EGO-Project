import {
  checkExistedLesson,
  createNewLesson,
  findLessonById,
  findListLessons,
  deleteLessonById,
  deleteManyLessons,
  checkExistedLessonId,
  checkExistedOtherLessonName,
  updateExistedLesson
} from "../services/crudDatabase/lesson.js";
import { checkExistedCourseId } from "../services/crudDatabase/course.js";
import {
  validateLesson,
  validateUpdateLesson
} from "../validators/lessonValidator.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const LessonController = {
  createLesson: catchAsync(async (req, res, next) => {
    const { status, error } = await validateLesson(req);
    const { name, description, videoId, courseId } = req.body;

    if (status === "Fail") return next(new AppError(error, 400));

    const isExistedCourseId = await checkExistedCourseId(courseId);
    if (isExistedCourseId === false)
      return next(new AppError("Course Id is not existed", 404));

    const isInvalidLesson = await checkExistedLesson(name, videoId, courseId);
    if (isInvalidLesson) return next(new AppError("Invalid Lesson", 400));

    const newLesson = { name, description, videoId, courseId };
    const saveLesson = await createNewLesson(newLesson);

    return res.json({ status: "Success", error: null, data: saveLesson });
  }),

  // [GET] View list lessons (by courseID)
  getLessons: catchAsync(async (req, res) => {
    const courseId = req.query.courseId;
    const lessons = await findListLessons(courseId);

    return res.json({
      status: "Success",
      error: null,
      data: lessons
    });
  }),

  getLesson: catchAsync(async (req, res) => {
    const lesson = await findLessonById(req.params.id);

    return res.json({
      status: "Success",
      error: null,
      data: lesson
    });
  }),

  updateLesson: catchAsync(async (req, res, next) => {
    const lessonId = req.params.id;
    const name = req.body.name;

    const { status, error } = await validateUpdateLesson(req);
    if (status === "Fail") return next(new AppError(error, 400));

    const [isExistedLessonId, isExistedOtherLessonName] = await Promise.all([
      checkExistedLessonId(lessonId),
      checkExistedOtherLessonName(lessonId, name)
    ]);

    if (isExistedLessonId === false)
      return next(new AppError("Lesson ID is not existed", 404));

    if (isExistedOtherLessonName)
      return next(new AppError("Lesson name is existed", 400));

    const lesson = await updateExistedLesson(lessonId, req.body);

    return res.json({
      status: "Success",
      error: null,
      data: lesson
    });
  }),

  deleteLesson: catchAsync(async (req, res) => {
    const lessonId = req.params.id;
    const lesson = await deleteLessonById(lessonId);

    return res.json({
      status: "Success",
      error: null,
      data: lesson
    });
  }),

  deleteLessons: catchAsync(async (req, res) => {
    const lessonIds = req.body.lessonIds;
    const deleteInfo = await deleteManyLessons(lessonIds);
    const deletedCount = deleteInfo.deletedCount;

    return res.json({
      status: "Success",
      error: null,
      data: deletedCount
    });
  })
};

export default LessonController;
