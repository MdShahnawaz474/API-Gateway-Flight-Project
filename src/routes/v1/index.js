const express = require("express");
const userRoutes = require("./user-routes.js");
const { InfoController, Usercontroller } = require("../../controllers");

const router = express.Router();

router.get("/info", InfoController.info);
router.use("/user", userRoutes);

module.exports = router;
