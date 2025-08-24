import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Regex Patterns
  const usernameRegex = /^[A-Za-z\s]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  async function submit(e) {
    e.preventDefault();

    // ✅ Validations
    if (!usernameRegex.test(username)) {
      toast.error("Username must be 3–20 characters (letters & spaces only).", {
        position: "top-center",
        autoClose: 2500,
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-center",
        autoClose: 2500,
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      return;
    }

    try {
      await axios.post("http://localhost:4001/Mywork/register", {
        n: username,
        e: email,
        p: password,
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been registered.",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        width: 400,
        padding: "2rem",
      }).then(() => {
        navigate("/verify-otp", { state: { email } });
      });

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: `Something went wrong: ${
          error.response?.data?.msg || error.message
        }`,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        width: 400,
        padding: "2rem",
      });
    }
  }

  return (
    <div className="row g-0" style={{ width: "100vw", height: "100vh" }}>
      <ToastContainer />

      {/* Left Side Image */}
      <div className="col-6 d-none d-md-block">
        <img
          src="/src/assets/images/christian-lambert-vmIWr0NnpCQ-unsplash.jpg"
          alt="Left Side"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Right Side Form */}
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-gradient-to-br from-blue-300 via-pink-100 to-pink-300">
        <div
          className="shadow p-4 p-md-5 rounded-4"
          style={{ width: "85%", maxWidth: "420px", backgroundColor: "#fff" }}
        >
          <h5 className="fw-semibold text-center mb-1">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#1351d8] to-[#9c00ff] bg-clip-text text-transparent font-semibold">
              Luxurystay
            </span>
          </h5>

          <div className="d-flex justify-content-center gap-2 mb-4">
            <p className="text-secondary mb-0">Already have an account?</p>
            <Link className="text-decoration-none fw-medium" to="/login">
              Login
            </Link>
          </div>

          <p className="mb-4 fs-3 text-dark text-center">Sign Up</p>

          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control py-3 rounded-2 shadow-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control py-3 mt-4 rounded-2 shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control py-3 mt-4 rounded-2 shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="text-end mb-4">
              <Link className="text-decoration-none small" to="/forgot">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="relative z-[2] text-white py-3 w-full overflow-hidden text-base leading-[1.1] font-bold tracking-wide uppercase inline-flex items-center justify-center gap-3 px-6 md:px-7 md:py-3 transition-colors ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-[#1351d8] to-[#9c00ff] hover:text-white rounded-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
