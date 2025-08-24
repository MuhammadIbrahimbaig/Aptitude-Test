const express = require("express");
const router = express.Router();
const UserController = require("../Controller/function");
const AdminLogin = require("../AdminController/AdminAuth");
const Room = require("../Controller/Room");
const BookingController = require("../Controller/BookingController");
const InvoiceController = require("../Controller/InvoiceController");
const uploadMiddleware = require("../Midleware/uploadMiddleware");
const protect = require("../Midleware/ProtectedRoutes");
const ContactController = require("../Controller/ContactController");





// Ibrahim Routing Section
router.post("/saveroom", protect, uploadMiddleware, Room.CreateRoom);
router.get("/read", protect, uploadMiddleware, Room.Read);
router.put("/edit/:a", protect, Room.EditRecord);
router.delete("/remove/:id", protect, Room.DeleteRecord);
router.post("/create-contact", protect, ContactController.CreateContact);
router.get("/get-contact", protect, ContactController.GetContacts);
// forgot password
router.post("/forgot-password", UserController.ForgotPassword);

// verify reset otp
router.post("/verify-reset-otp", UserController.VerifyResetOtp);

// reset password
router.post("/reset-password", UserController.ResetPassword);

// resend otp
router.post("/resend-otp", UserController.ResendOtp);




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
router.post("/Feedback", UserController.FeedbackSubmit);
router.get("/UserFeedback", AdminLogin.UserFeedback);
router.delete("/UserFeedDelete/:id", AdminLogin.UserFeedDelete);
router.put("/Userguest/:id", UserController.Userguest);
router.get("/Userread", UserController.Useread);  
router.post("/service", AdminLogin.Service);  
router.get("/serviceget", AdminLogin.ServiceGet);  
router.put("/serviceupdate/:id", AdminLogin.updateService);  
router.delete("/servicedelete/:id", AdminLogin.deleteService);  















// Zeeshan
router.post("/create-booking", protect, BookingController.CreateBooking);
router.get("/get-booking", protect, BookingController.getBooking);
router.put("/update-booking-status/:id", BookingController.UpdateBookingStatus);
router.delete("/remove-booking/:id", protect, BookingController.DeleteRecord);
// Invoice Route
router.get("/Mywork/invoices/:invoiceName", (req, res) => {
    const { invoiceName } = req.params;
    const filePath = path.join(__dirname, "../invoices", invoiceName);

    res.download(filePath, (err) => {
        if (err) {
            console.error("Download error:", err);
            res.status(404).json({ message: "File not found" });
        }
    });

});





module.exports = router;
