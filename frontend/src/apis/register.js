import httpRequest from "../configs/axiosConfig";
import { getSigninToken } from "../helpers";

export const registerCourseApi = ({ userId, courseId }) => {
  const token = getSigninToken();
  const register = { userId, courseId };
  return httpRequest.post("/registers", JSON.stringify(register), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getRegisterApi = ({ userId, courseId }) => {
  const token = getSigninToken();
  return httpRequest.get(`/registers?userId=${userId}&courseId=${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getMyRegisteredCoursesApi = (userId) => {
  const token = getSigninToken();
  return httpRequest.get(`/registers/my-registers?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getMyNotRegisteredCoursesApi = (userId) => {
  const token = getSigninToken();
  return httpRequest.get(`/registers/my-not-registers?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
