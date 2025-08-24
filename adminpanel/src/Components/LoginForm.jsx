import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:4001/Mywork/Adminlogin", {
        e: email,
        p: password
      });
  
      const { token, role, type, userId, name, email: userEmail } = res.data;
  
      // Save token + user in localStorage
      const userData = { token, userId, role, type, name, email: userEmail };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      // Set default axios Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      // Redirect based on role
      if (type === "admin") {
        toast.success("Admin Login Successful!", {
          position: "top-center",
          autoClose: 500,
          theme: "colored",
          onClose: () => navigate("/home")
        });
      } else if (type === "staff") {
        toast.success("Staff Login Successful!", {
          position: "top-center",
          autoClose: 500,
          theme: "colored",
          onClose: () => navigate("/home")
        });
      } else {
        toast.error("Access Denied: Unknown user role", {
          position: "top-center",
          autoClose: 2500,
          theme: "colored"
        });
      }
  
    } catch (err) {
      toast.error("Invalid Credentials", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored"
      });
    }
  }
  
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <ToastContainer />
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center text-primary mb-4 fw-bold ">Login</h2>
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
          <button type="submit" className="btn bg-custom w-100 text-white border py-2 fw-bold">Login</button>
        </form>
      </div>
    </div>
  );
}
