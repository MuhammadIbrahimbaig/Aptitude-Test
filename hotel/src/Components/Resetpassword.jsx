import React, { useState } from "react";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState({ loading: false, message: "", error: false });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setStatus({ loading: false, message: "Passwords do not match!", error: true });
        }

        setStatus({ loading: true, message: "", error: false });

        try {
            const response = await fetch("http://localhost:4001/Mywork/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword: password }), // ✅ backend ke hisaab se
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Something went wrong");

            setStatus({ loading: false, message: data.message || "Password reset successful!", error: false });
        } catch (error) {
            setStatus({ loading: false, message: error.message, error: true });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-pink-100 to-pink-300">
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Reset Password
                </h2>

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />

                {/* New Password */}
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />

                {/* Confirm Password */}
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1351d8] to-[#9c00ff] text-white py-2 rounded-full font-medium shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                    disabled={status.loading}
                >
                    {status.loading ? "Resetting..." : "Reset Password"}
                </button>

                {status.message && (
                    <p className={`mt-4 text-sm text-center ${status.error ? "text-red-500" : "text-green-600"}`}>
                        {status.message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ResetPassword;
