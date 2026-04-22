const express = require("express");
const userRoutes = require("./user-routes.js");
const { InfoController, Usercontroller } = require("../../controllers");
const { AuthRequestMiddleware } = require("../../middlewares/index.js");

const router = express.Router();

router.get("/info", AuthRequestMiddleware.checkAuth, InfoController.info);
router.use("/user", userRoutes);

module.exports = router;
