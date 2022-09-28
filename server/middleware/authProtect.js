const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
// const { mapReduce } = require("../models/userModel");

const authProtect = async (req, res, next) => {
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     let token = req.headers.authorization.split(" ")[1];
//     if (!token) {
//      return res.send('Not authorized, no token')
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findOne({ uId: decoded.uId }).select('-password');
//     next();
//   } else {
//     res.send("Not Authorized!");
//   }

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1SWQiOiI3Nzc3MTY2Mjg0MDg5NzUzOCIsImlhdCI6MTY2Mjg2Njg1OSwiZXhwIjoxNjY1NDU4ODU5fQ.VkmzoOm7n4EY9arwGaTYHyD_jwW3CsVAyzdkjkK5p8A"
  if (!token) {
    return res.send('Not authorized, no token')
   }
   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   req.user = await User.findOne({ uId: decoded.uId }).select('-password');
   next();
};


module.exports = {
  authProtect,
};
