// Check if the user's role is allowed
// permittedRoles: permitted roles array
export const Roles = (...permittedRoles) => {
  return (req, res, next) => {
    if (permittedRoles.length === 0) next();

    const user = req.user;

    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      return res.status(403).json({
        status: "Fail",
        error: "Forbidden",
        data: null
      });
    }
  };
};
