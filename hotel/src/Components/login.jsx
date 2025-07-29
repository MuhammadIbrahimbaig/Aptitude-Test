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
      navigate("/about");  
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
            <ToastContainer/>
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center text-primary mb-4">Login</h2>
                <form  onSubmit={login}>
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

                    <button type="submit" className="btn btn-primary w-100">Login</button>

                    <div className="mt-3 text-center">
                        <small>
                            Don't have an account? <Link className="text-decoration-non" to="/">Register</Link>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
}
