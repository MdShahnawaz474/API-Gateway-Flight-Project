const express = require("express");
const { Usercontroller } = require("../../controllers/index.js");
const { AuthRequestMiddleware } = require("../../middlewares/index.js");
const router = express.Router();

router.post(
  "/signup",
  AuthRequestMiddleware.validateAuthRequest,
  Usercontroller.createUser,
);
router.post(
  "/signin",
  AuthRequestMiddleware.validateAuthRequest,
  Usercontroller.signInUser,
);

module.exports = router;
