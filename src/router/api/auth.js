const express =require("express")
const { signupController, signinController, otpVarification, resendOtp } = require("../../controllers/auth.controller")
const router =express.Router()

// localhost:3001/api/auth/signup
router.post("/signup", signupController)
router.post("/signin", signinController)
router.post("/otp-varify", otpVarification)
router.post("/resend-otp", resendOtp)



module.exports =router