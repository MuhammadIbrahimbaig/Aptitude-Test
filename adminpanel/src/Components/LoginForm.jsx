import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();

    // ✅ Validation with SweetAlert
    if (!email.trim()) {
      Swal.fire("Error", "Email is required", "error");
      return;
    }

    if (!password.trim()) {
      Swal.fire("Error", "Password is required", "error");
      return;
    }

    if (password.length < 5) {
      Swal.fire("Error", "Password must be at least 5 characters long", "error");
      return;
    }

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
        Swal.fire("Success", "Admin Login Successful!", "success").then(() => {
          navigate("/home");
        });
      } else if (type === "staff") {
        Swal.fire("Success", "Staff Login Successful!", "success").then(() => {
          navigate("/home");
        });
      } else {
        Swal.fire("Error", "Access Denied: Unknown user role", "error");
      }
  
    } catch (err) {
      Swal.fire("Error", "Invalid Credentials", "error");
    }
  }

  
  return (
    <div className="bg-custom-o d-flex align-items-center justify-content-center vh-100 bg-light">
      <ToastContainer />
      <div className="card shadow-lg px-4 pb-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="d-flex justify-content-center">
          <img src="/src/assets/img/output-onlinepngtools.png" alt="" className="object-cover w-75 " />
        </div>
  


        <form onSubmit={login}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="form-control py-4"
              placeholder="Enter your Email"

              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
           
            <input
              type="password"
              name="password"
              placeholder="Enter your password "
              className="form-control py-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>
          <button type="submit" className="btn bg-custom w-100 text-white border py-3 mt-3 fw-bold ">Login</button>
        </form>
      </div>
    </div>
  );
}
