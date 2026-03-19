const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/appError.js");

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

module.exports = {
  createNewUser,
};
