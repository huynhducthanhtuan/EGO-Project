import httpRequest from "../configs/axiosConfig";

export const signupApi = (user) => {
  return httpRequest.post("/users", JSON.stringify(user));
};

export const signinApi = (user) => {
  return httpRequest.post("/users/signin", JSON.stringify(user));
};

export const checkValidTokenApi = (token) => {
  return httpRequest.post(
    "/users/check-valid-token/",
    JSON.stringify({ token: token })
  );
};
