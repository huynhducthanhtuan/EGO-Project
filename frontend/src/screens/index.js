import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  SignupPage,
  SigninPage,
  CourseDetailPage,
  CreateCoursePage,
  UpdateCoursePage,
  LessonDetailPage,
  CreateLessonPage,
  UpdateLessonPage,
  TestPage,
  TestTeacherPage,
  TestResultPage,
  UpdateTestPage,
  MyCoursesPage,
  ManageCoursePage,
  ManageLessonPage,
  ManageTestPage,
  NotFoundPage
} from "../pages";

function Screens() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/courses/my-courses" element={<MyCoursesPage />} />
      <Route path="/courses/create" element={<CreateCoursePage />} />
      <Route path="/courses/update/:courseId" element={<UpdateCoursePage />} />
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />
      <Route path="/lessons/create" element={<CreateLessonPage />} />
      <Route path="/lessons/update/:lessonId" element={<UpdateLessonPage />} />
      <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
      <Route path="/tests/update/:testId" element={<UpdateTestPage />} />
      <Route path="/tests/:testId" element={<TestPage />} />
      <Route path="/test-results/:testId" element={<TestResultPage />} />
      <Route path="/manage/courses" element={<ManageCoursePage />} />
      <Route path="/manage/lessons" element={<ManageLessonPage />} />
      <Route path="/manage/tests/:testId" element={<TestTeacherPage />} />
      <Route path="/manage/tests" element={<ManageTestPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Screens;
