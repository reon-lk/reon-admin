const User = require("../models/userModel");
const Page = require("../models/pageModel");
const Vehicle = require("../models/vehicleModel");

const pageCheckAdmin = async (req, res, next) => {
  const uId = { uId: req.params.uId };
  const user = User.findOne(uId);
  const page = Page.findOne(user.uId);

  if (!user) {
    res.send("User not found");
  } else if (user.status == 0) {
    res.send("User is blocked");
  } else if (user.status == 4) {
    res.send("User is deleted");
  } else if (user.isPage == 1) {
    res.send("user already have a page");
  } else {
    next();
  }
};

const pageValidAdmin = async (req, res, next) => {
  const pId = { pId: req.params.pId };
  const page = await Page.findOne(pId);
  const user = User.findOne(page.uId);

  if (!user) {
    res.send("User not found");
  } else if (user.status == 0) {
    res.send("User is blocked");
  } else if (user.status == 4) {
    res.send("User is deleted");
  } else {
    next();
  }
};

const checkVehicle = async (req, res, next) => {
  const pId = { pId: req.params.pId };
  const page = await Page.findOne(pId);
  const user = await User.findOne({ uId: page.uId });

  if (!page) {
    res.send("page not found");
  } else if (page.status == 0) {
    res.send("page is not approved!");
  } else if (page.status == 2) {
    res.send("page is blocked!");
  } else if (page.status == 4) {
    res.send("page is deleted!");
  } else if (!user) {
    res.send("User not found!");
  } else if (user.status == 0) {
    res.send("User is blocked!");
  } else if (user.status == 4) {
    res.send("User is deleted!");
  } else {
    next();
  }
};

const vehicleValidAdmin = async (req, res, next) => {
  const vId = { vId: req.params.vId };
  const vehicle = await Vehicle.findOne(vId);
  const page = await Page.findOne({pId:vehicle.pId});
  const user = await User.findOne({ uId: page.uId });

  if (!page) {
    res.send("page not found");
  } else if (page.status == 0) {
    res.send("page is not approved!");
  } else if (page.status == 2) {
    res.send("page is blocked!");
  } else if (page.status == 4) {
    res.send("page is deleted!");
  } else if (!user) {
    res.send("User not found!");
  } else if (user.status == 0) {
    res.send("User is blocked!");
  } else if (user.status == 4) {
    res.send("User is deleted!");
  } else {
    next();
  }
};

module.exports = {
  pageValidAdmin,
  pageCheckAdmin,
  vehicleValidAdmin,
  checkVehicle,
};
