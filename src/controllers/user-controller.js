const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services/index");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index.js");
const AppError = require("../utils/errors/appError.js");
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.createNewUser({
      email: email,
      password: password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log(error);

    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError(
        "Email and Password are required",
        StatusCodes.BAD_REQUEST,
      );
    }

    const user = await UserService.signInUser({
      email,
      password,
    });

    console.log(user);

    SuccessResponse.data = user;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
   console.log(error);

  return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Something went wrong",
    data: {},
    error: error.explanation || error.message,
  });
}};

module.exports = {
  createUser,
  signInUser,
};
