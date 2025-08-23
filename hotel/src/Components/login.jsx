import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "..//assets/images/logo.png";



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
        Swal.fire({
          icon: "success",
          title: "User Login Successfull",
          text: "User Account has been login Successfully  ",
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          width: 400,
          padding: "2rem"
        })
          .then(() => {
            navigate("/home");
          });
      } else if (role === 2) {
        Swal.fire({
          icon: "success",
          title: "Staff Login Successfull",
          text: "Staff Account has been login Successfully  ",
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          width: 400,
          padding: "2rem"
        })
          .then(() => {
            navigate("/home");
          });
      } else if (role === 1) {
        Swal.fire({
          icon: "success",
          title: "Admin Login Successfull",
          text: "Admin Account has been login Successfully  ",
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          width: 400,
          padding: "2rem"
        });
      }

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("name", res.data.name);
  localStorage.setItem("email", res.data.email);

} catch (err) {
  Swal.fire({
    icon: "error",
    title: "Invalid Credentials",
    text: "Please check your email & password!",
    position: "top",
    showConfirmButton: true,
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

            {/* <h3 className="fw-bold">HotelLOgo</h3> */}
            <div className="">
              <Link
                to="/home"
                className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
              >
                <img
                  src={logo}
                  alt="Hotel Logo"
                  className="object-fit-cover"
                  style={{ height: "400px", width: "900px" }}
                />
              </Link>
            </div>
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
                className="form-control py-3 shadow-sm rounded-2"
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
                className="form-control mt-4 py-3 shadow-sm rounded-2"
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
              type="submit" className="relative z-[2] after:duration-350 after:delay-150 text-white  py-3 w-full  overflow-hidden text-base leading-[1.1] font-bold  tracking-wide uppercase [transition:all_0.3s_linear] inline-flex items-center justify-center gap-3 px-6 md:px-7 py-2 md:py-3 transition-colors ease-in-out  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  bg-gradient-to-r from-[#1351d8] to-[#9c00ff] after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:[transition:all_.3s_ease-in-out] hover:text-white hover:after:w-full hover:after:left-0 rounded-full"
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
