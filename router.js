const express = require("express");
const registerUser = require("./registerUser");
const checkExistingUser = require("./checkUser");
const router = express.Router();

router.post("/register", registerUser);
router.get("/getuser", checkExistingUser);

module.exports = router;
