import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Router se import

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const navigate = useNavigate(); // ✅ navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: false });

    try {
      const response = await fetch(
        "http://localhost:4001/Mywork/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // ✅ Success message
      setStatus({
        loading: false,
        message: data.message || "OTP sent successfully!",
        error: false,
      });

      // ✅ Navigate to Reset Password page with email state
      navigate("/reset-otp", { state: { email } });

    } catch (error) {
      setStatus({ loading: false, message: error.message, error: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-pink-100 to-pink-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-700 placeholder-gray-400"
        />

        {/* Submit Button */}
        <div className="d-flex justify-content-center mt-3 ">
          <button
            type="submit"
            className="relative z-[2] after:duration-350 rounded after:delay-150 text-white py-2 overflow-hidden text-base leading-[1.1] font-bold tracking-wide uppercase inline-flex items-center justify-center gap-3 px-6 md:px-7 md:py-3 transition-colors ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-[#1351d8] to-[#9c00ff] after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white hover:after:w-full hover:after:left-0 rounded-full"
            disabled={status.loading}
          >
            {status.loading ? "Sending..." : "Send OTP"}
          </button>
        </div>

        {/* Status Message */}
        {status.message && (
          <p
            className={`mt-4 text-sm text-center ${status.error ? "text-red-500" : "text-green-600"
              }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
