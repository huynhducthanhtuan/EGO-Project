import httpRequest from "../configs/axiosConfig";
import { getSigninToken } from "../helpers";

export const submitTestApi = (testResult) => {
  const token = getSigninToken();
  return httpRequest.post(`/test-results`, JSON.stringify(testResult), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getTestResultApi = (userId, testId) => {
  const token = getSigninToken();
  return httpRequest.get(`/test-results?userId=${userId}&testId=${testId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
