const express = require("express");
const registerUser = require("./registerUser");
const checkExistingUser = require("./checkUser");
const changeUserEmailByUsername = require("./changeUserEmail");
const getUserDetailsByUsername = require("./getUserDetails");
const router = express.Router();

router.post("/register", registerUser);
router.get("/getuser", checkExistingUser);
router.put("/emailUpdate", changeUserEmailByUsername);
router.get("/getdetails/:username", getUserDetailsByUsername);

module.exports = router;
