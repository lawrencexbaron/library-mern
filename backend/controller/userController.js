const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { registerValidation, loginValidation } = require("../utils/validation");

// Get Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
};

// Create User
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = new User({
    name,
    email,
    password,
    role,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name,
          email,
          password,
          role,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
};

// Register User
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerValidation(req.body);
  if (error) {
    const messages = error.details.map((el) => el.message);
    return res.status(400).json({ data: { message: messages }, status: 400 });
  }

  const emailExist = await User.findOne({ email: email });
  if (emailExist)
    return res
      .status(400)
      .json({ data: { message: "Email already exists" }, status: 400 });

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    const userSaved = await user.save();
    res.status(200).json({ data: { user: userSaved._id }, status: 200 });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginValidation(req.body);
  if (error) {
    const messages = error.details.map((el) => el.message);
    return res.status(400).json({ data: { message: messages }, status: 400 });
  }

  const user = await User.findOne({ email: email });
  if (!user)
    return res
      .status(400)
      .json({ data: { message: "Email is not found" }, status: 400 });

  const validPass = await bcrypt.compareSync(password, user.password);
  if (!validPass)
    return res
      .status(400)
      .json({ data: { message: "Invalid password" }, status: 400 });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res
    .header("auth-token", token)
    .json({ data: { token: token, user: user._id }, status: 200 });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  register,
  login,
};
