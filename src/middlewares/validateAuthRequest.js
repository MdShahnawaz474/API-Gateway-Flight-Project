const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common/index.js");
const AppError = require("../utils/errors/appError.js");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while authenticating user";
    ErrorResponse.error = new AppError([
      "Email is required and must be provided in the correct format",
    ]);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while authenticating user";
    ErrorResponse.error = new AppError([
      "password is required and must be provided in the correct format",
    ]);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateAuthRequest,
};
