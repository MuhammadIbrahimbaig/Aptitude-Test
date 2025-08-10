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
      await axios.post("http://localhost:4001/Mywork/", {
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
        src="/src/assets/images/pexels-maceiras-2467558.jpg"
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
  <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
      <div style={{ width: "80%", maxWidth: "420px" }}>
        <h5 className="fs-5">Wellcome to User</h5>
        <div className="d-flex gap-2">
        <p className="text-secondary">  Already Created account?</p>
           <Link className="text-decoration-none" to="/login">
              Login
            </Link>
        </div>
         
      
        <h2 className=" mb-4 font-bold text-warning">
          Sign Up 
        </h2>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="fullName"
              className="form-control py-2 rounded-1 shadow-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control py-2 rounded-1 shadow-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control py-2 rounded-1 shadow-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
           <Link className="text-decoration-none " to="/Forgot">
              Forgot Password
            </Link>
          </div>

          <button type="submit" className="btn btn-primary mt-4 rounded-0 rounded-1 w-100 border-0">
            Register
          </button>

        
        </form>
      </div>
    </div>
  </div>
);

}