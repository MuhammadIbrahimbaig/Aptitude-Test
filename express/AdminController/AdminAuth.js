
let  User    = require("../Collection/User");
let { Role   } = require("../Collection/Role");
let { Department   } = require("../Collection/Department");
let  Staff   = require("../Collection/Staff");
let { Feedback   } = require("../Collection/Feedback");
let { Service   } = require("../Collection/service");





let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let all_pages = {

 Service: async function (req, res) {
    try {
      let { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      let newService = new Service({ title, description });
      await newService.save();

      res.status(201).json({ msg: "Service added successfully", service: newService });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error });
    }
  },

  ServiceGet:async function (req , res) {
    try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
  },

  updateService : async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const service = await Service.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!service) return res.status(404).json({ error: "Service not found" });

    res.json(service);
  } catch (err) {
    res.status(400).json({ error: "Failed to update service" });
  }
},

deleteService : async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) return res.status(404).json({ error: "Service not found" });

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete service" });
  }
},

  UserFeedback:async function (req,res) {
      try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ msg: "❌ Server Error" });
  }
  },

UserFeedDelete: async function (req, res) {
  try {
    const deletedFeed = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeed) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},
 
StaffRegister: async function (req, res) {
  try {
    const { name, email, phone, password, joiningDate, salary, designation } = req.body;

    // Email check
    const emailExists = await Staff.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    // Staff role check
    const staffRole = await Role.findOne({ code: 2 });
    if (!staffRole) {
      return res.status(400).json({ msg: "Staff role not defined in database" });
    }

    // Department check (designation = department _id)
    const dept = await Department.findById(designation);
    if (!dept) {
      return res.status(400).json({ msg: "Invalid department selected" });
    }

    // Password hash
    const hashedPassword = bcrypt.hashSync(password, 15);

    // Staff creation
    const staff = new Staff({
      name,
      email,
      phone,
      password: hashedPassword,
      roleId: staffRole._id,
      joiningDate,
      salary,
      designation: dept._id
    });

    await staff.save();

    // User creation
    const user = new User({
      name,
      email,
      password: hashedPassword,
      roleId: staffRole._id,  // Linking role from the Role collection
      isVerified: true  // Defaulting to false, can be updated later
    });

    await user.save();

    return res.status(200).json({ msg: "Staff registered successfully" });

  } catch (error) {
    console.error("StaffRegister error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
},


  StaffFetch:async function (req, res) {
     try {
    const staffList = await Staff.find()
      .populate("designation", "name") // sirf name field lao
      .populate("roleId", "name"); // optional
    res.json(staffList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg:err.message });
  }
  },

StaffEdit: async function (req, res) {
  try {
    const { name, email, phone, designation } = req.body; // designation will be department _id

    // Validate department _id
    const deptExists = await Department.findById(designation);
    if (!deptExists) {
      return res.status(400).json({ message: "Department does not exist" });
    }

    // Update staff
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        designation: deptExists._id // store as ObjectId
      },
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(updatedStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

StaffDelete: async function (req, res) {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

DepartFetch:async function (req, res) {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ message: "Error fetching departments", error: err });
  }
},

DepartEdit: async function (req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Department.findByIdAndUpdate(id, { name: name }, { new: true });
    res.status(200).json({ message: "Department updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating department" });
  }
},

DepartDelete: async function (req, res) {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting department" });
  }
},


AddDepart: async function (req, res) {
 try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Department name is required." });
    }
    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ msg: "Department already exists." });
    }
    const department = new Department({ name });
    await department.save();
    res.status(201).json({ msg: "Department added successfully.", department });
  } catch (err) {
    console.error("AddDepart error:", err);
    res.status(500).json({ msg: "Server error." });
  }
},



AdminLogin: async function (req, res) {
  const { e, p } = req.body;

  try {
    // Find user in User collection and populate role
    const user = await User.findOne({ email: e }).populate("roleId");

    if (!user) {
      return res.status(401).json({ msg: "Invalid Email" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        error: "Please verify your email before logging in",
      });
    }

    // Check password
    const isMatch = bcrypt.compareSync(p, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }

    // Determine user type based on role code
    let userType = "user";
    if (user.roleId?.code === 1) {
      userType = "admin";
    } else if (user.roleId?.code === 2) {
      userType = "staff";
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        type: userType,
      },
      process.env.JWT_SECRET_KEY
    );

    // Return response
    res.status(200).json({
      msg: "Login Success",
      token,
      userId: user._id,  // ✅ This must be here
      role: user.roleId?.code || null,
      name: user.name,
      email: user.email,
      type: userType // "admin" or "staff"
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
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
