import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetOtpVerify() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4001/Mywork/verify-reset-otp", {
                email,
                otp
            });

            toast.success("OTP Verified! Now reset your password.");
            //  email ko forward karo ResetPassword.jsx ko
            navigate("/reset", { state: { email } });
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.error || "Verification failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-pink-100 to-pink-300">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Verify OTP for Password Reset
                </h2>
                <form className="space-y-4" onSubmit={handleVerify}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* OTP */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            placeholder="6-digit OTP"
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none tracking-widest text-center font-semibold"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-medium shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    >
                        Verify OTP
                    </button>

                    {/* Resend Link */}
                    <p className="text-center text-sm text-gray-500 mt-3">
                        Didn’t get the OTP?{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Resend
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
