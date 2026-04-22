const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common/index.js");
const AppError = require("../utils/errors/appError.js");
const { UserService } = require("../services/index.js");

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

async function checkAuth(req, res, next) {
  try {
    const isAuthenticated = await UserService.isAuthenticated(
      req.headers["x-access-token"],
    );
   if(isAuthenticated){
    req.user = isAuthenticated
    next();
   }

  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Something went wrong",
      data: {},
      error: error.explanation || error.message,
    }); 
  }
}

module.exports = {
  validateAuthRequest,
  checkAuth,
};
