import {
  checkExistedEmail,
  checkExistedUsername,
  createNewUser,
  checkUserSignIn,
  checkValidToken
} from "../services/crudDatabase/user.js";
import { generateAccessToken } from "../services/authentication/index.js";
import { validateUser, validateSignIn } from "../validators/userValidator.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const UserController = {
  createUser: catchAsync(async (req, res, next) => {
    const { status, error } = await validateUser(req);

    if (status === "Fail") return next(new AppError(error, 400));

    const { password, username, name, email, role } = req.body;
    const [isExistedUsername, isExistedEmail] = await Promise.all([
      checkExistedUsername(username),
      checkExistedEmail(email)
    ]);

    const isExistedUser = isExistedEmail || isExistedUsername;
    if (isExistedUser)
      return next(new AppError("Username or Email is existed", 400));

    const newUser = {
      password,
      username,
      name,
      email,
      role
    };

    const output = await createNewUser(newUser);

    const payload = { _id: output._id, role: role };
    const token = await generateAccessToken(payload);

    return res.json({
      status: "Success",
      error: null,
      data: { ...output, token }
    });
  }),

  signIn: catchAsync(async (req, res, next) => {
    const { status, error } = await validateSignIn(req);
    if (status === "Fail") return next(new AppError(error, 400));

    const { password, username } = req.body;

    const user = { username, password };
    const output = await checkUserSignIn(user);
    if (output === null) {
      return res.json({
        status: "Fail",
        error: "Wrong Username Or Password",
        data: output
      });
    } else {
      return res.json({
        status: "Success",
        error: null,
        data: output
      });
    }
  }),

  checkValidToken: catchAsync(async (req, res, next) => {
    const token = req.body.token;
    const isValidToken = await checkValidToken(token);

    return res.json({
      status: "Success",
      error: null,
      data: isValidToken
    });
  })
};

export default UserController;
