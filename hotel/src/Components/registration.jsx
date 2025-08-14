import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4001/Mywork/register", {
        n: username,
        e: email,
        p: password,
      });

      toast.success("Registration Successful!", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });

      // Clear form after success
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (error) {
      toast.error(`Something went wrong: ${error.response?.data?.msg || error.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  }
 return (
  <div
    className="row g-0" // no gutters for edge-to-edge layout
    style={{ width: "100vw", height: "100vh" }}
  >
    <ToastContainer/>
    {/* Left side image */}
   <div className="col-6 d-none d-md-block">
      <img
        src="/src/assets/images/christian-lambert-vmIWr0NnpCQ-unsplash.jpg"
        className=""
        alt="Left Side"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>

    {/* Right side form */}
  {/* Right side form */}
    <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-light">
      <div
        className="shadow p-4 p-md-5 rounded"
        style={{ width: "85%", maxWidth: "420px", backgroundColor: "#fff" }}
      >
        {/* Header */}
        <h5 className="fw-semibold text-center mb-1">Welcome to   <span className="bg-gradient-to-r from-[#1351d8] to-[#9c00ff] bg-clip-text text-transparent font-semibold">
               Luxurystay
</span>
 </h5>
        <div className="d-flex justify-content-center gap-2 mb-4">
          <p className="text-secondary mb-0">Already have an account?</p>
          <Link className="text-decoration-none fw-medium" to="/login">
            Login
          </Link>
        </div>

        {/* Title */}
        <p className="mb-4  text-[32px] text-dark font-medium text-center">Sign Up</p>

        {/* Form */}
        <form onSubmit={submit}>
          <div className="mb-3">
            {/* <label className="form-label fw-semibold">Username</label> */}
            <input
              type="text"
              name="fullName"
              className="form-control py-3 rounded-2 shadow-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            {/* <label className="form-label fw-semibold">Email address</label> */}
            <input
              type="email"
              name="email"
              className="form-control py-3 mt-4 rounded-2 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            {/* <label className="form-label fw-semibold">Password</label> */}
            <input
              type="password"
              name="password"
              className="form-control py-3 mt-4    rounded-2 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot password link */}
          <div className="text-end mb-4">
            <Link className="text-decoration-none small" to="/Forgot">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
 <button
  type="submit"
  class="py-2 w-full font-semibold text-white rounded-2 py-3   bg-gradient-to-r from-[#1351d8] to-[#9c00ff] hover:from-[#9c00ff] hover:to-[#1351d8]"
>
  Register
</button>


        </form>
      </div>
  </div>
  </div>
);

}