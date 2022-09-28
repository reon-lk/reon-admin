const express = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const cloudinary = require("../middleware/cloudinary");

const User = require("../models/userModel");
const Page = require("../models/pageModel");
const Vehicle = require("../models/vehicleModel");
const Tour = require("../models/tourHireModel");

const mainId = "7777";
//admin

// @desc    Admin Get admin details
// @route   POST /api/admin/me
// @access  Private

const getMe = async (req, res) => {
  res.json(req.user);
};

//users

// @desc    Admin Get all users
// @route   POST /api/admin/user
// @access  Private
const getUsers = async (req, res) => {
  const users = await User.find({ role: "0" })
    .sort({ updatedAt: -1 })
    .select("-password");

  res.json(users);
};

// @desc    Admin Get user
// @route   POST /api/admin/user/:uId
// @access  Private
const getUser = async (req, res) => {
  const uId = { uId: req.params.uId };

  const users = await User.findOne(uId);

  res.json(users);
};

// @desc    Admin Register new user
// @route   POST /api/admin/user/register
// @access  Private

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.send("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.send("User already exists");
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
      profile: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
      role: "1",
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

// @desc    Admin Block user
// @route   POST /api/admin/user/block/:uId
// @access  Private

const blockUser = async (req, res) => {
  const { uId } = req.params;

  const user = await User.findOne({ uId: uId });

  if (!user) {
    res.send("User not found");
  } else if (user.status == 0) {
    res.send("User is blocked");
  } else if (user.status == 4) {
    res.send("User is deleted");
  } else {
    const block = await User.findOneAndUpdate(
      { uId: uId },
      {
        status: "0",
      },

      { new: true }
    );
    res.json(`user ${uId} is blocked`);
  }
};

// @desc    Admin Block user
// @route   POST /api/admin/user/unblock/:uId
// @access  Private

const unblockUser = async (req, res) => {
  const { uId } = req.params;

  const user = await User.findOne({ uId: uId });

  if (!user) {
    res.send("User not found");
  } else if (user.status == 1) {
    res.send("User is active");
  } else if (user.status == 4) {
    res.send("User is deleted");
  } else {
    const unblock = await User.findOneAndUpdate(
      { uId: uId },
      {
        status: "1",
      },

      { new: true }
    );
    res.json(`user ${uId} is unblocked`);
  }
};

//pages

// @desc    Admin Get all users
// @route   GET /api/admin/page
// @access  Private

const getPages = async (req, res) => {
  const pages = await Page.find().sort({ updatedAt: -1 });

  res.json(pages);
};

// @desc    Admin Get page detail
// @route   GET /api/admin/page/:pId
// @access  Private

const getPage = async (req, res) => {
  const { pId } = req.params;
  const page = await Page.findOne({ pId: pId });

  res.json(page);
};

// @desc    Admin create page for user
// @route   POST /api/admin/page/create/:pId
// @access  Private

const registerPage = async (req, res) => {
  const { pageName, pageDescription, phone, address } = req.body;

  if (!pageName || !pageDescription || !phone || !address) {
    return res.send("Please add all fields");
  }
  const check = await Page.findOne({ phone });
  if (check) {
    return res.send("phone number already exists");
  }
  const utcTimestamp = new Date().getTime();

  const result = await cloudinary.uploader.upload(
    req.files.profile[0].path,
    { folder: "page" },
    (use_filename) => true,
    (unique_filename) => false
  );
  const results = await cloudinary.uploader.upload(
    req.files.banner[0].path,
    { folder: "page" },
    (use_filename) => true,
    (unique_filename) => false
  );

  const createPage = await Page.create({
    pId: mainId + utcTimestamp,
    uId: req.params.uId,
    profile: {
      public_id: result.public_id,
      secure_url: result.secure_url,
    },
    banner: {
      public_id: results.public_id,
      secure_url: results.secure_url,
    },
    pageName,
    pageDescription,
    phone,
    address,
    link: mainId + utcTimestamp,
    status: "0", //wait=0, active=1, block=2, active&pending=3, deleted=4
    statusComment: "Admin create page",
    tempPageName: pageName,
    tempPageDescription: pageDescription,
    tempPhone: phone,
    tempAddress: address,
    tempLink: mainId + utcTimestamp,
  });

  await User.findOneAndUpdate(
    { uId: req.params.uId },
    { $set: { isPage: "1", updateDate: utcTimestamp } },
    { new: true }
  );

  res.json(createPage);
};

// @desc    Admin block page
// @route   Patch /api/admin/page/block/:pId
// @access  Private

const pageBlock = async (req, res) => {
  const { pId } = req.params;
  const page = await Page.findOne({ pId: pId });

  if (!page) {
    res.send("page not found");
  } else if (page.status == 0) {
    res.send("page is not approved!");
  } else if (page.status == 2) {
    res.send("page is blocked!");
  } else {
    const block = await Page.findOneAndUpdate(
      { pId: pId },
      {
        status: "2",
        statusComment: "Admin block page",
      },

      { new: true }
    );

    res.send(block);
  }
};

// @desc    Admin unblock page
// @route   Patch /api/admin/page/block/:pId
// @access  Private

const pageUnblock = async (req, res) => {
  const { pId } = req.params;
  const page = await Page.findOne({ pId: pId });

  if (!page) {
    res.send("page not found");
  } else if (page.status == 0) {
    res.send("page is not approved!");
  } else if (page.status == 1) {
    res.send("page is active!");
  } else {
    const unblock = await Page.findOneAndUpdate(
      { pId: pId },
      {
        status: "1",
        statusComment: "Admin unblocked the page",
      },

      { new: true }
    );

    res.send(unblock);
  }
};

// @desc    Admin Get vehicles
// @route   GET /api/admin/vehicle
// @access  Private

const getPageVehicles = async (req, res) => {
  const { pId } = req.params;
  const vehicles = await Vehicle.find({ pId: pId }).sort({ updatedAt: -1 });

  res.json(vehicles);
};

const filter = async (req, res) => {
  const filter = {};
  const { category, vehicleType, location, vehicleFuelType, vehicleACType } =
    req.query;

  if (category) {
    filter.category = category;
  }

  if (vehicleType) {
    filter.vehicleType = vehicleType;
  }

  if (location) {
    filter.location = location;
  }

  if (vehicleFuelType) {
    filter.vehicleFuelType = vehicleFuelType;
  }

  if (vehicleACType) {
    filter.vehicleACType = vehicleACType;
  }

  filter.status = { $in: [1, 3] };

  const vehicles = await Vehicle.find(filter);

  if (!vehicles) {
    res.status(500).send({ sucess: false });
  }

  res.json(vehicles);
};

// @desc    Admin Get vehicles
// @route   GET /api/admin/vehicle
// @access  Private

const getPageVehiclesCount = async (req, res) => {
  const { pId } = req.params;
  const counts = await Vehicle.find({ pId: pId }).countDocuments();

  res.json({ counts });
};

// @desc    Admin Get vehicles
// @route   GET /api/admin/vehicle
// @access  Private

const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find().sort({ updatedAt: -1 });

  res.json(vehicles);
};

// @desc    Admin Get vehicle details
// @route   GET /api/admin/vehicle/:vId
// @access  Private

const getVehicle = async (req, res) => {
  const { vId } = req.params;
  const vehicle = await Vehicle.findOne({ vId: vId });

  res.json(vehicle);
};

// @desc    Admin add vehicle for page
// @route   GET /api/admin/vehicle/add/:pId
// @access  Private

const addVehicle = async (req, res) => {
  const utcTimestamp = new Date().getTime();

  const {
    category,
    vehicleType,
    vehicleNo,
    vehicleName,
    vehicleDescription,
    vehicleFuelType,
    seats,
    location,
    vehicleACType,
  } = req.body;

  if (
    !vehicleType ||
    !vehicleNo ||
    !vehicleName ||
    !vehicleDescription ||
    !vehicleFuelType ||
    !vehicleACType ||
    !category ||
    !seats ||
    !location
  ) {
    res.send("Please add all fields");
  } else {
    const vehicleExists = await Vehicle.findOne({
      vehicleNo: vehicleNo,
    });
    if (vehicleExists) {
      return res.json("Vehicle already exists");
    } else {
      const vehicleImages = await cloudinary.uploader.upload(
        req.files.vehicleImages[0].path,
        { folder: "vehicle" },
        (use_filename) => true,
        (unique_filename) => false
      );

      const vehicleRegistration = await cloudinary.uploader.upload(
        req.files.vehicleRegistration[0].path,
        { folder: "vehicle" },
        (use_filename) => true,
        (unique_filename) => false
      );

      const vehicleInsurance = await cloudinary.uploader.upload(
        req.files.vehicleInsurance[0].path,
        { folder: "vehicle" },
        (use_filename) => true,
        (unique_filename) => false
      );

      const vehicleTax = await cloudinary.uploader.upload(
        req.files.vehicleTax[0].path,
        { folder: "vehicle" },
        (use_filename) => true,
        (unique_filename) => false
      );

      const vehicleThirdPartyInsurance = await cloudinary.uploader.upload(
        req.files.vehicleThirdPartyInsurance[0].path,
        { folder: "vehicle" },
        (use_filename) => true,
        (unique_filename) => false
      );

      const vehicle = await Vehicle.create({
        vId: mainId + utcTimestamp,
        pId: req.params.pId,
        vehicleImages: {
          public_id: vehicleImages.public_id,
          secure_url: vehicleImages.secure_url,
        },
        category,
        vehicleType,
        vehicleNo,
        vehicleName,
        vehicleDescription,
        vehicleFuelType,
        seats,
        location,
        vehicleACType, // AC=1, NonAC=0
        vehicleRegistration: {
          public_id: vehicleRegistration.public_id,
          secure_url: vehicleRegistration.secure_url,
        },
        vehicleInsurance: {
          public_id: vehicleInsurance.public_id,
          secure_url: vehicleInsurance.secure_url,
        },
        vehicleTax: {
          public_id: vehicleTax.public_id,
          secure_url: vehicleTax.secure_url,
        },
        vehicleThirdPartyInsurance: {
          public_id: vehicleThirdPartyInsurance.public_id,
          secure_url: vehicleThirdPartyInsurance.secure_url,
        },
        status: "0", // wait=0, active=1, block=2, active&pending=3 deleted=4
        statusComment: "vehicle added",
        tempCategory: category,
        tempVehicleType: vehicleType,
        tempSeats: seats,
        tempLocation: location,
        tempVehicleName: vehicleName,
        tempVehicleDescription: vehicleDescription,
        tempVehicleACType: vehicleACType,
      });

      res.json(vehicle);
    }
  }
};

// @desc    Admin block vehicle
// @route   GET /api/admin/vehicle/block/:vId
// @access  Private

const blockVehicle = async (req, res) => {
  const { vId } = req.params;
  const vehicle = await Vehicle.findOne({ vId: vId });

  if (!vehicle) {
    res.send("Vehicle not found");
  } else if (vehicle.status == 4) {
    res.send("vehicle is deleted");
  } else if (vehicle.status == 0) {
    res.send("vehicle is not approved");
  } else if (vehicle.status == 2) {
    res.send("vehicle is blocked");
  } else {
    const block = await Vehicle.findOneAndUpdate(
      { vId: vId },
      {
        status: "2",
        statusComment: "Admin block vehicle",
      },

      { new: true }
    );

    res.send(block);
  }
};

// @desc    Admin unblock vehicle
// @route   GET /api/admin/vehicle/block/:vId
// @access  Private

const unblockVehicle = async (req, res) => {
  const { vId } = req.params;
  const vehicle = await Vehicle.findOne({ vId: vId });

  if (!vehicle) {
    res.send("Vehicle not found");
  } else if (vehicle.status == 4) {
    res.send("vehicle is deleted");
  } else if (vehicle.status == 0) {
    res.send("vehicle is not approved");
  } else if (vehicle.status == 1) {
    res.send("vehicle is active");
  } else {
    const unblock = await Vehicle.findOneAndUpdate(
      { vId: vId },
      {
        status: "1",
        statusComment: "Admin unblock vehicle",
      },

      { new: true }
    );

    res.send(unblock);
  }
};

// @desc    Admin Get all hire
// @route   POST /api/admin/hire
// @access  Private

const getHires = async (req, res) => {
  const hire = await Tour.find().sort({ updatedAt: -1 });

  res.send(hire);
};
// Dashboard

// @desc    Admin Get all users count
// @route   POST /api/admin/dasboard/users
// @access  Private

const usersCount = async (req, res) => {
  const count = await User.countDocuments({
    status: { $in: [1, 3] },
    role: 0,
   
  });

  res.json({
    userCount: count,
  });
};

// @desc    Admin Get all pages count
// @route   POST /api/admin/dasboard/pages
// @access  Private

const pagesCount = async (req, res) => {
  const count = await Page.countDocuments({ status: { $in: [1, 3] } });

  res.json({
    ownersCount: count,
  });
};

// @desc    Admin Get all vehicles count
// @route   POST /api/admin/dasboard/vehicles
// @access  Private

const vehiclesCount = async (req, res) => {
  const count = await Page.countDocuments({ status: { $in: [1, 3] } });

  res.json({
    vehiclesCount: count,
  });
};

// @desc    Admin Get all hires count
// @route   POST /api/admin/dasboard/hires
// @access  Private

const hiresCount = async (req, res) => {
  const count = await Tour.countDocuments({ isFinished: 1,isAccept:1,isConfirm:1 });

  res.json({
    hiresCount: count,
  });
};

// @desc    Admin Get all pendingPage
// @route   POST /api/admin/dasboard/pendingPage
// @access  Private

const PendingPages = async (req, res) => {
  const pending = await Page.find({ status: 0 });

  res.json(pending);
};

// @desc    Admin view pendingPage details
// @route   POST /api/admin/dasboard/pendingPage/:pId
// @access  Private

const PendingPage = async (req, res) => {
  const { pId } = req.params;
  const page = await Page.findOne({ pId: pId });

  res.json(page);
};

// @desc    Admin approve pendingPage
// @route   POST /api/admin/dasboard/pendingPage/approve/:pId
// @access  Private

const approvePendingPages = async (req, res) => {
  const { pId } = req.params;
  const page = await Page.findOne({ pId: pId });

  if (!page) {
    res.send("page not found");
  } else if (page.status == 1) {
    res.send("page is approved!");
  } else if (page.status == 2) {
    res.send("page is blocked!");
  } else if (page.status == 4) {
    res.send("page is deleted!");
  } else {
    const approve = await Page.findOneAndUpdate(
      { pId: pId },
      {
        status: "1",
        statusComment: "Admin approved page",
      },

      { new: true }
    );

    res.json(approve);
  }
};

// @desc    Admin Get all pendingVehicles
// @route   POST /api/admin/dasboard/pendingVehicle
// @access  Private

const pendingVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({ status: 0 });

  res.json(vehicles);
};

// @desc    Admin view pendingVehicles
// @route   POST /api/admin/dasboard/pendingVehicle/:vId
// @access  Private

const pendingVehicle = async (req, res) => {
  const { vId } = req.params;
  const vehicle = await Vehicle.findOne({ vId: vId });
  const page = await Page.findOne({ pId: vehicle.pId });

  res.json({
    vehicle: vehicle,
    page: page,
  });
};

// @desc    Admin approve pendingVehicles
// @route   POST /api/admin/dasboard/pendingVehicle/approve/:vId
// @access  Private

const approvePendingVehicles = async (req, res) => {
  const { vId } = req.params;
  const vehicle = await Vehicle.findOne({ vId });

  if (!vehicle) {
    res.send("Vehicle not found");
  } else if (vehicle.status == 4) {
    res.send("vehicle is deleted");
  } else if (vehicle.status == 1) {
    res.send("vehicle is approved");
  } else if (vehicle.status == 2) {
    res.send("vehicle is blocked");
  } else {
    const approve = await Vehicle.findOneAndUpdate(
      { vId: vId },
      {
        status: "1",
        statusComment: "Admin approved vehicle",
      },

      { new: true }
    );

    res.json(approve);
  }
};

// // Generate JWT
// const generateToken = (uId) => {
//     return jwt.sign({ uId }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });
//   };

module.exports = {
  getUsers,
  getUser,
  registerUser,
  blockUser,
  unblockUser,
  getPages,
  getPage,
  registerPage,
  pageBlock,
  pageUnblock,
  getVehicles,
  getVehicle,
  getPageVehiclesCount,
  getPageVehicles,
  filter,
  addVehicle,
  blockVehicle,
  unblockVehicle,
  getHires,
  usersCount,
  pagesCount,
  vehiclesCount,
  hiresCount,
  PendingPages,
  PendingPage,
  approvePendingPages,
  pendingVehicles,
  pendingVehicle,
  approvePendingVehicles,
  getMe,
};
