const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController.js");
const { protect, isAdmin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, isAdmin, getAllUsers); // admin only

module.exports = router;
