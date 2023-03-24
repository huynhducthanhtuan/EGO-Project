import {
  checkRegisterById,
  checkRegisteredCourse,
  deleteManyRegisters,
  registerCourse,
  deleteRegisterById,
  getRegisterByUserAndCourse,
  getRegisteredCoursesByUser,
  getNotRegisteredCoursesByUser
} from "../services/crudDatabase/register.js";
import { checkExistedCourseId } from "../services/crudDatabase/course.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const RegisterController = {
  registerNewCourse: catchAsync(async (req, res, next) => {
    const { userId, courseId } = req.body;

    const isExistedCourse = await checkExistedCourseId(courseId);

    if (isExistedCourse === false)
      return next(new AppError("Course is not existed", 404));

    const newRegister = { userId, courseId };

    const isExistedRegister = await checkRegisteredCourse(newRegister);

    if (isExistedRegister)
      return next(new AppError("You registered this course", 400));

    const newRegisterInfo = await registerCourse(newRegister);

    return res.send({
      status: "Success",
      error: null,
      data: newRegisterInfo
    });
  }),

  deleteRegister: catchAsync(async (req, res, next) => {
    const registerId = req.params.registerId;
    const isExistedRegister = await checkRegisterById(registerId);

    if (isExistedRegister === false)
      return next(new AppError("Register is not existed", 404));

    const deleteInfo = await deleteRegisterById(registerId);

    return res.json({
      status: "Success",
      error: null,
      data: deleteInfo
    });
  }),

  deleteRegisters: catchAsync(async (req, res) => {
    const registerIds = req.body.registerIds;
    const deleteInfo = await deleteManyRegisters(registerIds);
    const deleteCount = deleteInfo.deletedCount;

    return res.json({
      status: "Success",
      error: null,
      data: deleteCount
    });
  }),

  getRegister: catchAsync(async (req, res, next) => {
    const { userId, courseId } = req.query;

    const isExistedCourse = await checkExistedCourseId(courseId);

    if (isExistedCourse === false)
      return next(new AppError("Course is not existed", 404));

    const register = await getRegisterByUserAndCourse({ userId, courseId });

    return res.json({
      status: "Success",
      error: null,
      data: register
    });
  }),

  getRegisteredCoursesByUser: catchAsync(async (req, res, next) => {
    const userId = req.query.userId;
    const courses = await getRegisteredCoursesByUser(userId);

    return res.json({
      status: "Success",
      error: null,
      data: courses
    });
  }),

  getNotRegisteredCoursesByUser: catchAsync(async (req, res, next) => {
    const userId = req.query.userId;
    const courses = await getNotRegisteredCoursesByUser(userId);

    return res.json({
      status: "Success",
      error: null,
      data: courses
    });
  })
};

export default RegisterController;
