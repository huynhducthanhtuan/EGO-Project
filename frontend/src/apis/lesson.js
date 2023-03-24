import httpRequest from "../configs/axiosConfig";
import { getSigninToken } from "../helpers";

export const getLessonApi = (lessonId) => {
  const token = getSigninToken();
  return httpRequest.get(`/lessons/${lessonId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getLessonsByCourseApi = (courseId) => {
  const token = getSigninToken();
  return httpRequest.get(`/lessons?courseId=${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createLessonApi = (lesson) => {
  const token = getSigninToken();
  return httpRequest.post("/lessons", JSON.stringify(lesson), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateLessonApi = (lessonId, lesson) => {
  const token = getSigninToken();
  return httpRequest.patch(`/lessons/${lessonId}`, JSON.stringify(lesson), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteLessonApi = (lessonId) => {
  const token = getSigninToken();
  return httpRequest.delete(`/lessons/${lessonId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
