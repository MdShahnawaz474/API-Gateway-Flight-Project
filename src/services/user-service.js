const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const bcrypt = require("bcrypt");
const AppError = require("../utils/errors/appError.js");
const { Auth } = require("../utils/common/");
const userRepo = new UserRepository();

const createNewUser = async (data) => {
  try {
    const createUser = await userRepo.create(data);
    return createUser;
  } catch (error) {
    console.log(error);

    if (
      error.name === "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new user",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

const signInUser = async (data) => {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        "No user found with this email",
        StatusCodes.NOT_FOUND,
      );
    }

    const isPasswordMatch = Auth.validatePassword(data.password, user.password);
    if (!isPasswordMatch) {
      throw new AppError("Invalid password", StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const isAuthenticated = async (token) => {
  try {
    if (!token) {
      throw new AppError(
        "Missing JWT token in request",
        StatusCodes.BAD_REQUEST,
      );
    }
    const isVerified = await Auth.verifyToken(token);
    if (!isVerified) {
      throw new AppError("Invalid or expired token", StatusCodes.UNAUTHORIZED);
    }
    const user = await userRepo.get(isVerified.id);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      throw new AppError("Invalid or expired token", StatusCodes.UNAUTHORIZED);
    }
    console.log(error);
    throw error;
  }
};

module.exports = {
  createNewUser,
  signInUser,
  isAuthenticated,
};
