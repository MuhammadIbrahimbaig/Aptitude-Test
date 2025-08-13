import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  async function login(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4001/Mywork/login", {
        e: email,
        p: password
      });

      const role = res.data.role;

      if (role === 3) {
        toast.success("User Login Successful!", {
          position: "top-center",
          autoClose: 500,
          theme: "colored",
          onClose: () => {
            navigate("/home");
          }
        });
      } else if (role === 2) {
        toast.success("Staff Login Successful!", {
          position: "top-center",
          autoClose: 500,
          theme: "colored",
          onClose: () => {
            navigate("/about");
          }
        });
      } else if (role === 1) {
        toast.success("Admin Login Successful!", {
          position: "top-center",
          autoClose: 500,
          theme: "colored",
          onClose: () => {
            navigate("/about");
          }
        });
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

    } catch (err) {
      toast.error("Invalid Credentials", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored"
      });
    }
  }

return (
  <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <ToastContainer />
    <div className="row w-100 shadow rounded overflow-hidden" style={{ maxWidth: "900px" }}>
      
      {/* Left Side */}
      <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-white"
        style={{
          background: "linear-gradient(135deg, #9d97ff, #9d97ff)",
          padding: "2rem",
        }}
      >
        <div className="text-center">
        
          <h3 className="fw-bold">YOUR COMPANY</h3>
          <p>Login system slogan goes here</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-md-6 bg-white p-5">
        <h2 className="text-center text-black  mb-4">Members Log in</h2>
        <form onSubmit={login}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <input type="checkbox" /> Remember Me
            </div>
            <Link className="text-decoration-none" to="/forgot">Forgot Password?</Link>
          </div>
          <button
  type="submit"
  className="btn w-100 text-white fw-bold"
  style={{ background: "#9d97ff" }}
>
  Log In
</button>

          <div className="mt-3 text-center">
            <small>
              Don’t have an account?{" "}
              <Link className="text-decoration-none" to="/">Register Here</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}
