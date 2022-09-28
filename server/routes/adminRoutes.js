const express = require("express");
const router = express.Router();

const {
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
  getPageVehicles,
  filter,
  getPageVehiclesCount,
  getVehicle,
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
} = require("../controllers/adminController");

const {
  pageValidAdmin,
  pageCheckAdmin,
  vehicleValidAdmin,
  checkVehicle,
} = require("../middleware/adminValidations");

const { isAdmin, isUser } = require("../middleware/userValidation");
const { authProtect } = require("../middleware/authProtect");
const upload = require("../middleware/upload");

router.get("/user/vehcile", authProtect, isAdmin, filter)

router.get("/user", authProtect, isAdmin, getUsers);
router.get("/user/:uId", authProtect, isAdmin, getUser);
router.post(
  "/user/register",
  authProtect,
  isAdmin,
  upload.single("profile"),
  registerUser
);
router.patch("/user/block/:uId", authProtect, isAdmin, blockUser);
router.patch("/user/unblock/:uId", authProtect, isAdmin, unblockUser);

router.get("/page", authProtect, isAdmin, getPages);
router.get("/page/:pId", authProtect, isAdmin, getPage);
router.get("/page/vehicle/:pId", authProtect, isAdmin, getPageVehicles);
router.post(
  "/page/register/:uId",
  authProtect,
  isAdmin,
  pageCheckAdmin,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  registerPage
);
router.patch(
  "/page/block/:pId",
  authProtect,
  isAdmin,
  pageValidAdmin,
  pageBlock
);
router.patch(
  "/page/unblock/:pId",
  authProtect,
  isAdmin,
  pageValidAdmin,
  pageUnblock
);

router.get("/vehicle", authProtect, isAdmin, getVehicles);
router.get("/vehicleCount/:pId", authProtect, isAdmin, getPageVehiclesCount);
router.get("/vehicle/:vId", authProtect, isAdmin, getVehicle);
router.post(
  "/vehicle/add/:pId",
  authProtect,
  isAdmin,
  checkVehicle,
  upload.fields([
    { name: "vehicleImages", maxCount: 1 },
    { name: "vehicleRegistration", maxCount: 1 },
    { name: "vehicleInsurance", maxCount: 1 },
    { name: "vehicleTax", maxCount: 1 },
    { name: "vehicleThirdPartyInsurance", maxCount: 1 },
  ]),
  addVehicle
);

router.patch(
  "/vehicle/block/:vId",
  authProtect,
  isAdmin,
  vehicleValidAdmin,
  blockVehicle
);
router.patch(
  "/vehicle/unblock/:vId",
  authProtect,
  isAdmin,
  vehicleValidAdmin,
  unblockVehicle
);

router.get("/hires",authProtect, isAdmin, getHires)

router.get("/dashboard/userCount", authProtect, isAdmin, usersCount);
router.get("/dashboard/ownerCount", authProtect, isAdmin, pagesCount);
router.get("/dashboard/vehicleCount", authProtect, isAdmin, vehiclesCount);
router.get("/dashboard/hireCount", authProtect, isAdmin, hiresCount);

router.get("/dashboard/pendingPage", authProtect, isAdmin, PendingPages);
router.get("/dashboard/pendingPage/:pId", authProtect, isAdmin, PendingPage);
router.patch(
  "/dashboard/pendingPage/approve/:pId",
  authProtect,
  isAdmin,
  pageValidAdmin,
  approvePendingPages
);

router.get("/dashboard/pendingVehicle", authProtect, isAdmin, pendingVehicles);
router.get("/dashboard/pendingVehicle/:vId", authProtect, isAdmin, pendingVehicle);
router.patch(
  "/dashboard/pendingVehicle/approve/:vId",
  authProtect,
  isAdmin,
  vehicleValidAdmin,
  approvePendingVehicles
);

router.get("/profile", authProtect, isAdmin, getMe);

module.exports = router;
