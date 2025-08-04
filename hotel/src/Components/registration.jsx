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
        <div>
            <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer />

                <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '420px' }}>
                    <h2 className="text-center mb-4 text-primary">Sign Up <i class="fa-solid fa-user"></i></h2>
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                name="fullName"
                                className="form-control"
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

                     

                        <button type="submit" className="btn btn-primary w-100 border-0">
                            Register
                        </button>
                     
                                             
                                          
                    <small>
                                              Already Create account? <Link className="text-decoration-non" to="/login">Login</Link>
                                          </small>
                    </form>
                </div>
            </div>
        </div>
    )
}