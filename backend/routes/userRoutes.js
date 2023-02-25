const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  register,
} = require("../controller/userController");

// Get Users
router.get("/", getUsers);

// Get User by ID
router.get("/:userId", getUserById);

// Create User
router.post("/", createUser);

// Update User
router.patch("/:userId", updateUser);

// Delete User
router.delete("/:userId", deleteUser);

// Login User
router.post("/login", login);

// Register User
router.post("/register", register);

module.exports = router;
