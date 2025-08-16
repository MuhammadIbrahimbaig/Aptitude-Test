let { User } = require("../Collection/User");
let { Role } = require("../Collection/Role");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const Otp = require("../Collection/OtpSchema");
const SendingOtpUserVerify = require("../utils/SentOtp");
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
  return otp.toString();
}
let all_pages = {
  // ======================== Register ========================
  Register: async function (req, res) {
    let { n, e, p } = req.body;

    let email_check = await User.findOne({ email: e });
    if (email_check) {
      return res.status(409).json({ msg: "Email Already Exist" });
    }

    let roleData = await Role.findOne({ code: 3 });
    if (!roleData) {
      return res.status(500).json({ msg: "User role not found" });
    }

    let secure_password = bcrypt.hashSync(p, 15);

    let user = new User({
      name: n,
      email: e,
      password: secure_password,
      roleId: roleData._id,
    });
    await user.save();
    await SendingOtpUserVerify(e);
    res.status(200).json({ msg: "Registration Successful" });
  },

  // ======================== Login ========================
  Login: async function (req, res) {
    let { e, p } = req.body;

    let user = await User.findOne({ email: e }).populate("roleId");
    if (!user) return res.status(401).json({ msg: "Invalid Email" });

    if (!user?.isVerified) {
      return res.status(400).json({
        success: false,
        error: "Please verify your email before logging in",
      });
    }

    let isMatch = bcrypt.compareSync(p, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Incorrect Password" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({
      msg: "Login Success",
      token: token,
      role: user.roleId.code,
      name: user.name,
      email: user.email,
    });
  },

  // ======================== Verify OTP ========================
  VerifyOtp: async function (req, res) {
    let { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, error: "Email and OTP are required" });
    }

    try {
      const otpRecord = await Otp.findOne({ email, otp });

      if (!otpRecord) {
        return res.status(400).json({ success: false, error: "Invalid OTP" });
      }

      if (new Date() > otpRecord.expirationTime) {
        return res
          .status(400)
          .json({ success: false, error: "OTP has expired" });
      }

      if (otpRecord.isUsed) {
        return res
          .status(400)
          .json({ success: false, error: "OTP has already been used" });
      }

      otpRecord.isUsed = true;
      await otpRecord.save();

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      user.isVerified = true;
      await user.save();
      await Otp.deleteMany({ email });

      res.status(200).json({
        success: true,
        message: "OTP validated successfully.",
        data: user,
      });
    } catch (error) {
      console.error("Error validating OTP:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  // ======================== Forgot Password ========================
  ForgotPassword: async function (req, res) {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }


     await SendingOtpUserVerify(email);
      res.status(200).json({
        success: true,
        message: "OTP sent to your email. Please check to reset your password.",
      });
    } catch (error) {
      console.error("ForgotPassword Error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  // ======================== Verify OTP for Password Reset ========================
  VerifyResetOtp: async function (req, res) {
    let { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, error: "Email and OTP are required" });
    }

    try {
      const otpRecord = await Otp.findOne({ email, otp });

      if (!otpRecord) {
        return res.status(400).json({ success: false, error: "Invalid OTP" });
      }

      if (new Date() > otpRecord.expirationTime) {
        return res
          .status(400)
          .json({ success: false, error: "OTP has expired" });
      }

      if (otpRecord.isUsed) {
        return res
          .status(400)
          .json({ success: false, error: "OTP has already been used" });
      }

      otpRecord.isUsed = true;
      await otpRecord.save();

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      user.isVerified = true;
      await user.save();
      await Otp.deleteMany({ email });

      res.status(200).json({
        success: true,
        message: "OTP validated successfully.",
        data: user,
      });
    } catch (error) {
      console.error("Error validating OTP:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  // ======================== Reset Password ========================
  ResetPassword: async function (req, res) {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email and new password required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error("ResetPassword Error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  
  ResendOtp: async function (req, res) {
    const { email } = req.body; // changed from req.query to req.body

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    try {
      const otp = generateOTP();
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 10); // OTP valid for 10 minutes

      const newOtp = new Otp({
        email,
        otp,
        expirationTime,
      });

      await newOtp.save();

      await SendingOtpUserVerify(email);

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
};

module.exports = all_pages;
