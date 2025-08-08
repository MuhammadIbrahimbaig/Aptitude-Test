import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function StaffCreate() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    joiningDate: "",
    salary: "",
    designation: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4001/Mywork/addstaff", form);  
      toast.success(" Staff Registered Successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        joiningDate: "",
        salary: "",
        designation: ""
      });
    } catch (error) {
      toast.error(` ${error.response?.data?.msg || "Something went wrong"}`);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>Staff Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input id="name" value={form.name} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input id="email" type="email" value={form.email} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input id="phone" value={form.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input id="password" type="password" value={form.password} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Joining Date</label>
          <input id="joiningDate" type="date" value={form.joiningDate} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input id="salary" type="number" value={form.salary} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input id="designation" value={form.designation} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
