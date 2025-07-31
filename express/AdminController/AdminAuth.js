let { User, Role } = require("../Collection/User");
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let all_pages = {

  // Register
  StaffRegister: async function (req, res) {
    let { n, e, p } = req.body;

    // Check if email exists
    let email_check = await User.findOne({ email: e });
    if (email_check) {
      return res.status(409).json({ msg: 'Email Already Exist' });
    }

    // Find role by code (3 = user)
    let roleData = await Role.findOne({ code: 3 });
    if (!roleData) {
      return res.status(500).json({ msg: "User role not found" });
    }

    // Hash password
    let secure_password = bcrypt.hashSync(p, 15);

    // Create user
    let user = new User({
      name: n,
      email: e,
      password: secure_password,
      roleId: roleData._id
    });

    await user.save();
    res.status(200).json({ msg: "Registration Successful" });
  },

  // Login
  AdminLogin: async function (req, res) {
    let { e, p } = req.body;

    // Find user and populate role
    let user = await User.findOne({ email: e }).populate("roleId");
    if (!user) {
      return res.status(401).json({ msg: "Invalid Email" });
    }

    // Password check
    let isMatch = bcrypt.compareSync(p, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }

    // JWT token
    let token = jwt.sign({
      id: user._id,
      role: user.roleId.code  
    }, "secret_key", { expiresIn: "1h" });

    res.status(200).json({
      msg: "Login Success",
      token: token,
      role: user.roleId.code,   // or name
      name: user.name,
      email: user.email
    });
  },
  


};

module.exports = all_pages;
