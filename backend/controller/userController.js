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
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err });
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

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "3d" });
};

// Register User
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerValidation(req.body);
  if (error) {
    const messages = error.details.map((el) => el.message);
    return res.status(400).json({ message: messages, status: 400 });
  }

  const emailExist = await User.findOne({ email: email });
  if (emailExist)
    return res
      .status(400)
      .json({ message: "Email already exists", status: 400 });

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    const userSaved = await user.save();
    // create and assign a token
    const token = createToken(userSaved._id);

    res
      .status(200)
      .header("auth-token", token)
      .json({
        user: {
          id: userSaved._id,
          name: userSaved.name,
          email: userSaved.email,
          role: userSaved.role,
        },
        token: token,
      });
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
    return res.status(400).json({ message: messages });
  }

  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "Email is not found" });

  const validPass = await bcrypt.compareSync(password, user.password);
  if (!validPass)
    return res.status(400).json({ message: "Invalid password", status: 400 });

  const token = createToken(user._id);
  res
    .header("auth-token", token)
    .status(200)
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
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
