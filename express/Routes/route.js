const express = require("express");
const router = express.Router();
const UserController = require("../Controller/function");
const AdminLogin = require("../AdminController/AdminAuth");
const Room = require("../Controller/Room");
const BookingController = require("../Controller/BookingController");
const uploadMiddleware = require("../Midleware/uploadMiddleware"); // ✅ Correct path
const protect = require("../Midleware/ProtectedRoutes");

// router.post("/save", UserController.Register);
// router.get("/read", UserController.read)
// router.delete("/remove/:id", UserController.DeleteRecord);
// router.put("/edit/:a", UserController.EditRecord);

// Ibrahim Routing Section
router.post("/saveroom", protect, uploadMiddleware, Room.CreateRoom);
router.get("/read", protect, uploadMiddleware, Room.Read);
router.put("/edit/:a", protect, Room.EditRecord);
router.delete("/remove/:id", protect, Room.DeleteRecord);


// Asfhan Routing Section
router.post("/register", UserController.Register);
router.post("/verify-otp", UserController.VerifyOtp);
router.post("/login", UserController.Login);
router.post("/forgot-password", UserController.ForgotPassword);
router.post("/verify-reset-otp", UserController.VerifyResetOtp);
router.post("/resend-otp", UserController.ResendOtp);
router.post("/AdminLogin", AdminLogin.AdminLogin);
router.get("/UserFetch", AdminLogin.UserData);
router.delete("/UserDelete/:id", AdminLogin.UserDelete);
router.put("/editUser/:id", AdminLogin.UserUpdate);
router.post("/addstaff", AdminLogin.StaffRegister);
router.post("/AddDepart", AdminLogin.AddDepart);
router.get("/StaffFetch", AdminLogin.StaffFetch);
router.get("/DepartFetch", AdminLogin.DepartFetch);
router.put("/DepartEdit/:id", AdminLogin.DepartEdit);
router.delete("/DepartDelete/:id", AdminLogin.DepartDelete);
router.put("/staffEdit/:id", AdminLogin.StaffEdit);
router.delete("/staffDelete/:id", AdminLogin.StaffDelete);














// Zeeshan
router.post("/create-booking", protect, BookingController.CreateBooking);
router.get("/get-booking", protect, BookingController.getBooking);
router.put("/edit-booking/:id", protect, BookingController.EditRecord);
router.delete("/remove-booking/:id", protect, BookingController.DeleteRecord);

module.exports = router;
