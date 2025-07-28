let mail = require("nodemailer");
require("dotenv").config();

const User = require("../Collection/User");
let crypt = require("bcrypt");
// For Sending Email User Registartion
let secure_info = mail.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSKEY
  }
})
// Insert Data
let data = {
  Register: async function (req, res) {
    try {
      let { name, email, password, age } = req.body;
      let email_check = await User.findOne({ email: email });
      if (email_check) {
        res.status(409).json({ msg: "Email is already exist!" })
      }
      else {
        let hashed_p = crypt.hashSync(password, 10)
        console.log(hashed_p);
        let Users = new User({ name, email, password: hashed_p, age });
        await Users.save();
        res.status(200).json({ msg: "User Registration Succesfully!" });

        // For Sending Email User Registartion
        let EmailBodyInfo = {
          to: email,
          from: process.env.EMAIL,
          subject: "Account has been Registered!",
          html: `<h3>Hello ${name}</h3><br/><P>Your account has been created!`

        }
        secure_info.sendMail(EmailBodyInfo, function (e, i) {
          if (e) {
            console.log(e);
          }
          else {
            console.log("Email Has been Sent");
          }
        })
      }

    } catch (error) {
      res.status(500).json({ msg: error.message });
      console.log(error);
    }
  },
  // Show Data
  read: async function (req, res) {
    try {
      const users = await User.find()
      res.json(users);
      // setRecv(res.data);
    } catch (error) {
      res.status(500).json({ m: error.message })
    }
  },
  // DLt
  DeleteRecord : async  function(req, res){
    try {
      let { id } = req.params
      let find = await User.findById(id)
      if (!find) {
        res.status(404).json({msg: "Record Not Found"})
      }
      else{
        await User.findByIdAndDelete(find)
        res.status(200).json({msg: "Record Deleted"})
      }
    } catch (error) {
      res.status(404).json({msg:error.message})
    }
  },
  // Edit
    EditRecord : async  function(req, res){
      try {
        let { a } = req.params
        let {n,e,p,age, c} = req.body
        let find = await User.findById(a)
        if (!find) {
          res.status(404).json({msg: "Record Not Found"})
        }
        else{
          let new_pass = crypt.hashSync(p,15)
          await User.findByIdAndUpdate(a,{
            name: n,
            email : e,
            password : new_pass,
            age : age,
            City : c
          })
          res.status(200).json({msg: "Record Updated"})
        }
      } catch (error) {
        res.status(504).json({msg:error.message})
      }
    }
};




module.exports = data;
