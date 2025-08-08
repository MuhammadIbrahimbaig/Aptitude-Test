
let { User, Role , Staff} = require("../Collection/User");
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let all_pages = {

  // Register
StaffRegister: async function (req, res) {
 try {
    const { name, email, phone, password, joiningDate, salary, designation } = req.body;

    // Check if email already exists
    const emailExists = await Staff.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    // Find role with code = 2 (staff role)
    const staffRole = await Role.findOne({ code: 2 });
    if (!staffRole) {
      return res.status(400).json({ msg: "Staff role not defined in database" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 15);

    // Create staff with roleId set to staffRole._id
    const staff = new Staff({
      name,
      email,
      phone,
      password: hashedPassword,
      roleId: staffRole._id,
      joiningDate,
      salary,
      designation
    });

    await staff.save();
    return res.status(200).json({ msg: "Staff registered successfully" });

  } catch (error) {
    console.error("StaffRegister error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
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
  
 // READ DATA
 UserData: async function (req, res) {
  try {
   
    const users = await User.find().populate('roleId');

   
    const filteredUsers = users.filter(user => user.roleId?.code === 3);


    const safeUsers = filteredUsers.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password, 
      role: user.roleId.name,
      roleCode: user.roleId.code
    }));

    res.json(safeUsers);
  } catch (error) {
    console.error('Error fetching users ', error);
    res.status(500).json({ error: error.message });
  }
},

UserDelete:async function (req, res) {
 try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

UserUpdate:async function (req, res) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password: hashedPassword
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



};

module.exports = all_pages;
