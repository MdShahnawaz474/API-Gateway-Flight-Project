const express = require("express");

const { InfoController, Usercontroller } = require("../../controllers");

const router = express.Router();

router.get("/info", InfoController.info);
router.post("/signup", Usercontroller.createUser);

module.exports = router;
