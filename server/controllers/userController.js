const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const cloudinary = require("../middleware/cloudinary");

const User = require("../models/userModel");

const mainId = "7777";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.send("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send("User already exists");
  } else {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const utcTimestamp = new Date().getTime();

    const result = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "user" },
      (use_filename) => true,
      (unique_filename) => false
    );

    // Create user
    const user = await User.create({
      uId: mainId + utcTimestamp,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profile: { public_id: result.public_id, secure_url: result.secure_url },
      role: "0",
      status: "1",
      isPage: "0",
    });

    if (user) {
      res.send({
        user,
      });
    } else {
      res.send("Invalid user data");
    }
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body
  

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    
    res.json({
      user,
      token: generateToken(user.uId),
    });
  } else {
    res.json("Invalid credentials");
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/me
// @access  Private
const me = async (req, res) => {
  res.send(req.user);
};

// Generate JWT
const generateToken = (uId) => {
  return jwt.sign({ uId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  register,
  login,
  me,
};
