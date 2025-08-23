import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4001/Mywork/verify-otp", {
        email,
        otp
      });

      Swal.fire({
                 icon: "Success",
                 title: "Verifivation Successfully",
                 text: "Verifivation Successfully Complete  ",
                 position: "center",
                 showConfirmButton: false,
                 timer: 2000,
                 width: 400,    
                 padding: "2rem" 
               })
         .then(() => {
           navigate("/login");
         });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Verification failed");
    }
  };

return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark fw-medium">Verify Your Email</h2>
        <p className="text-muted small">
          Please enter your registered email and the OTP sent to you.
        </p>
      </div>

      <form onSubmit={handleVerify}>
        {/* Email Input */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
        <input
  type="email"
  className="form-control form-control-lg placeholder:text-[14px]"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  placeholder="Enter your email"
/>

        </div>

        {/* OTP Input */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Enter OTP</label>
          <input
            type="text"
            className="form-control form-control-lg text-center tracking-widest placeholder:text-[14px]"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter OTP"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 fs-6 btn-lg mt-3">
          Verify OTP
        </button>

        {/* Extra Hint */}
        <div className="text-center mt-3">
          <small className="text-muted">
            Didn’t receive OTP? <a href="#" className="text-primary">Resend</a>
          </small>
        </div>
      </form>
    </div>
  </div>
);

}
