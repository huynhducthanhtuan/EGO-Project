import { getSigninToken } from "../helpers";
import { checkValidTokenApi } from "../apis/user";

export const isAuth = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    const token = getSigninToken();
    if (token) {
      const isValid = checkValidTokenApi(token);
      return isValid;
    } else {
      return false;
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    const token = getSigninToken();
    if (token) {
      return JSON.parse(token);
    } else {
      return false;
    }
  }
};
