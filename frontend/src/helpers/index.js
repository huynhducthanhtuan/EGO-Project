export const updatePageTitle = (title) => {
  document.title = title;
};

export const refreshPage = () => {
  window.location.reload(false);
};

export const getSigninToken = () => {
  return JSON.parse(localStorage.getItem("signin_token"));
};
