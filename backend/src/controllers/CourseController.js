import {
  createNewCourse,
  findListCourses,
  getCourseById,
  deleteCourseById,
  deleteManyCourses,
  updateExistedCourse,
  checkExistedCourseId,
  checkExistedCourseName,
  checkExistedOtherCourseName
} from "../services/crudDatabase/course.js";
import { checkExistedUserId } from "../services/crudDatabase/user.js";
import {
  validateCourse,
  validateUpdateCourse
} from "../validators/courseValidator.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const CourseController = {
  createCourse: catchAsync(async (req, res, next) => {
    const { status, error } = await validateCourse(req);
    const { name, userId } = req.body;

    if (status === "Fail") return next(new AppError(error, 400));

    const [isExistedCourseName, isExistedUserId] = await Promise.all([
      checkExistedCourseName(name),
      checkExistedUserId(userId)
    ]);
    if (isExistedCourseName)
      return next(new AppError("Course name is existed", 400));

    if (isExistedUserId === false)
      return next(new AppError("User ID is not existed", 404));

    const course = await createNewCourse(req.body);
    return res.json({
      status: "Success",
      error: null,
      data: course
    });
  }),

  getCourses: catchAsync(async (req, res) => {
    const userId = req.query.userId;
    const courses = await findListCourses(userId);

    return res.json({
      status: "Success",
      error: null,
      data: courses
    });
  }),

  getCourseById: catchAsync(async (req, res) => {
    const courseId = req.params.courseId;
    const course = await getCourseById(courseId);

    return res.json({
      status: "Success",
      error: null,
      data: course
    });
  }),

  updateCourse: catchAsync(async (req, res, next) => {
    const courseId = req.params.courseId;
    const name = req.body.name;

    const { status, error } = await validateUpdateCourse(req);
    if (status === "Fail") return next(new AppError(error, 400));

    const [isExistedCourseId, isExistedOtherCourseName] = await Promise.all([
      checkExistedCourseId(courseId),
      checkExistedOtherCourseName(courseId, name)
    ]);

    if (isExistedCourseId === false)
      return next(new AppError("Course ID is not existed", 404));

    if (isExistedOtherCourseName)
      return next(new AppError("Course name is existed", 400));

    const course = await updateExistedCourse(courseId, req.body);

    return res.json({
      status: "Success",
      error: null,
      data: course
    });
  }),

  deleteCourseById: catchAsync(async (req, res) => {
    const courseId = req.params.courseId;
    const course = await deleteCourseById(courseId);

    return res.json({
      status: "Success",
      error: null,
      data: course
    });
  }),

  deleteManyCourses: catchAsync(async (req, res) => {
    const courseIds = req.body.courseIds;
    const deleteInfo = await deleteManyCourses(courseIds);
    const deletedCount = deleteInfo.deletedCount;

    return res.json({
      status: "Success",
      error: null,
      data: deletedCount
    });
  })
};

export default CourseController;
