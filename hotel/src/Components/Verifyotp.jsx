import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

      toast.success("OTP Verified Successfully!");
      navigate("/login"); // Redirect to login or dashboard after verification
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Verify Your Email</h2>
      <form onSubmit={handleVerify} className="w-50">
        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Enter OTP</label>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Verify OTP
        </button>
      </form>
    </div>
  );
}
