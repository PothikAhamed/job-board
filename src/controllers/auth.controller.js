const { sendEmail } = require("../helpers/sendEmail");
const UserModel = require("../model/userModel");
const apiResponse = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signupController = asyncHandler(async (req, res) => {
  let { username, email, password } = req.body;

  console.log(req.body);
  

  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      apiResponse(res, 500, err || "internal server problem");
    } else {
      const otp = uuidv4().toString().substring(0, 5);
      let user = new UserModel({
        username,
        email,
        password: hash,
        otp: otp,
        otpExpire: Date.now() + 5 * 60 * 1000,
      });
      await user.save();
      await sendEmail(email, otp);
      return apiResponse(res, 201, "account created", user);
    }
  });
});
// =========================================/

exports.signinController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let existingUser = await UserModel.findOne({ email }).select("+password");
  if (!existingUser) {
    apiResponse(res, 404, "email not found");
  } else {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result) {
        let user = {
          email: existingUser.email,
          username: existingUser.username,
          role: existingUser.role,
          isActive: existingUser.isActive,
          isVeryfide: existingUser.isVeryfide,
        };
        jwt.sign(
          { email:existingUser.email, id:existingUser._id },
          process.env.privatekey,
          {expiresIn:'3m'},function (err, token) {
            console.log(token);
            apiResponse(res, 200, "user login success", {...user, token});
          },
        );

      } else {
        apiResponse(res, 404, "invalid password");
      }
    });
  }
});
// ==================================

exports.otpVarification = asyncHandler(async (req, res) => {
  let { email, otp } = req.body;

  let user = await UserModel.findOne({ email });

  if (!user) {
    return apiResponse(res, 404, "User not found");
  }

  if (user.otp !== otp) {
    return apiResponse(res, 400, "Invalid OTP");
  }

  if (user.otpExpire < Date.now()) {
    return apiResponse(res, 400, "OTP expired");
  }

  user.isVeryfide = true;
  user.otp = undefined;
  user.otpExpire = undefined;

  await user.save();

  apiResponse(res, 200, "Email verified successfully");
});
// ======================================

exports.resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return apiResponse(res, 404, "User not found");
  }

  if (user.isVeryfide) {
    return apiResponse(res, 400, "Email already verified");
  }

  const otp = uuidv4().substring(0, 5);

  user.otp = otp;
  user.otpExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  await sendEmail(email, otp);

  return apiResponse(res, 200, "OTP sent successfully");
});