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
      <div className="col-md-6 d-flex flex-column  bg-gradient-to-r from-[#1351d8] to-[#9c00ff] align-items-center justify-content-center text-white"
       
      >
        <div className="text-center">
        
          <h3 className="fw-bold">HotelLOgo</h3>
          <p>hotel name</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-md-6 bg-white p-5">
        <h2 className="text-center text-black py-3 ">Members Log in</h2>
        <form onSubmit={login}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Name"
              className="form-control py-3 rounded-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter Your Psssword"
              name="password"
              className="form-control mt-4 py-3 rounded-2"
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
  className="btn w-100 text-white fw-bold py-3 rounded-2  bg-gradient-to-r from-[#1351d8] to-[#9c00ff]"
  
>
  Log In
</button>

          <div className="mt-3 text-center">
            <small>
              Don’t have an account?{" "}
              <Link className="text-decoration-none " to="/">Register Here</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}
