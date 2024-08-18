const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, getAllUsers);

module.exports = router;
