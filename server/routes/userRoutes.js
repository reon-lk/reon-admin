const express = require("express");
const router = express.Router();

const { register, login, me } = require("../controllers/userController");

const {authProtect} = require("../middleware/authProtect");
const upload = require("../middleware/upload")

router.post("/register", upload.single("profile"), register);
router.post("/login", login);
router.get("/me", authProtect, me);

module.exports = router;
