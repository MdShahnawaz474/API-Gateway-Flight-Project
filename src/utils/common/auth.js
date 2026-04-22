const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");
const serverConfig = require("../../config/server-config.js");
const validatePassword = (plainPassword, encryptedPassword) => {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createToken = async (input, key) => {
  try {
    return jwt.sign(input, serverConfig.JWT_SECRET, {
      expiresIn: serverConfig.JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const verifyToken = async (token) => {
  try {
    jwt.verify(token, serverConfig.JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  validatePassword,
  createToken,
  verifyToken,
};
