import UserRouter from "./UserRouter.js";
import LessonRouter from "./LessonRouter.js";
import CourseRouter from "./CourseRouter.js";
import RegisterRouter from "./RegisterRouter.js";
import TestRouter from "./TestRouter.js";
import QuestionRouter from "./QuestionRouter.js";
import TestResultRouter from "./TestResultRouter.js";

import globalErrorHandler from "../controllers/ErrorController.js";
import AppError from "../utils/appError.js";

function routing(app) {
  app.use("/users", UserRouter);
  app.use("/lessons", LessonRouter);
  app.use("/courses", CourseRouter);
  app.use("/registers", RegisterRouter);
  app.use("/tests", TestRouter);
  app.use("/questions", QuestionRouter);
  app.use("/test-results", TestResultRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(globalErrorHandler);
}

export default routing;
