const User = require("../models/userModel");

const isAdmin = async (req, res, next) => {
  if (!req.user) {
    res.status(201).json("Please signin");
  } else {
    const user = await User.findOne({ uId: req.user.uId });
    if (!user && user.role == 1) {
      res.send("Not allowed");
    }
    next();
  }
};

const isUser = async (req, res, next) => {
  if (!req.user) {
    res.status(201).json("Please signin");
  } else {
    const user = await User.findOne({ uId: req.user.uId });
    if (!user && user.role == 0) {
      res.send("Not allowed");
    }
    next();
  }
};

const checkPage = async (req, res, next) => {
  if (!req.user) {
    return res.status(201).json("Please signin");
  }
  const user = await User.findOne({ uId: req.user.uId });
  if (!user && user.role == 0) {
    res.send("Not allowed");
  } else if (user.isPage == 0) {
    res.send("You don/'t have reon page");
  } else {
    next();
  }
};

module.exports = {
  isAdmin,
  isUser,
  checkPage,
};
