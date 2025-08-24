import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


export default function StaffCreate() {
  const [departments, setDepartments] = useState([]);
  const [deptForm, setDeptForm] = useState({ name: "" });
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    joiningDate: "",
    salary: "",
    designation: ""
  });

  // Departments fetch on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:4001/Mywork/DepartFetch");
      setDepartments(res.data);

      
      if (!form.designation && res.data.length > 0) {
        setForm(prev => ({ ...prev, designation: res.data[0]._id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  // Department Add
  const handleDeptSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/Mywork/AddDepart", deptForm);

      // Agar backend newly created dept return kare
      if (res.data.department) {
        setDepartments(prev => [...prev, res.data.department]);
        // Naya department add hone par form.designation ko update karna
        setForm(prev => ({ ...prev, designation: res.data.department._id }));
      } else {
        // Warna poori list refresh karo
        fetchDepartments();
      }

      Swal.fire("Sucess","Department added!","success");
      setDeptForm({ name: "" });
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error");
    }
  };

  // Staff Add
  // Staff Add
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation checks
    if (!form.name.trim()) {
      Swal.fire("error","Name is required","error");
      return;
    }
    if (form.name.trim().length < 3) {
       Swal.fire("error","Name must be at least 3 characters long","error");
      return;
    }
    if (!form.email.trim()) {
       Swal.fire("error","Email is required","error");
      return;
    }
    if (!/^\d+$/.test(form.phone)) {
  Swal.fire("Error", "Phone number must contain only digits", "error");
  return;
}
if (form.phone.trim().length < 11) {
  Swal.fire("Error", "Phone number must be at least 11 digits", "error");
  return;
}

    if (!form.password.trim()) {
       Swal.fire("error","Password is required","error");
      return;
    }
    if (form.password.length < 8) {
        Swal.fire("error","Password must be at least 8 characters long","error");
      return;
    }
    if (!form.designation) {
       Swal.fire("error","Please select a department","error");
      return;
    }

    try {
      await axios.post("http://localhost:4001/Mywork/addstaff", form);
       Swal.fire("success","Staff Registered Successfully!","success");
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        joiningDate: "",
        salary: "",
        designation: departments.length > 0 ? departments[0]._id : "" // Reset to first department if exists
      });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="d-flex justify-content-between mb-3">
        <h2>Staff Registration</h2>
        <button className="btn btn-primary bg-custom" onClick={() => setShowModal(true)}>
          Add Department
        </button>
      </div>

      {/* Staff Form */}
      <form onSubmit={handleSubmit}>
        <div className="card p-4 shadow-lg">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input id="name" value={form.name} onChange={handleChange} required className="form-control py-4" placeholder="Enter Name" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input id="email" type="email" value={form.email} onChange={handleChange} required className="form-control py-4" placeholder="Enter Email" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input id="phone" value={form.phone} onChange={handleChange} className=" py-4 form-control" placeholder="Enter Phone Numer" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <input id="password" type="password" value={form.password} onChange={handleChange} required className="form-control py-4" placeholder="Enter Password 8 Digit" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Joining Date</label>
              <input id="joiningDate" type="date" value={form.joiningDate} onChange={handleChange} className="form-control py-4"  />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Salary</label>
              <input id="salary" type="number" value={form.salary} onChange={handleChange} className="form-control py-4" placeholder="Enter Staff Salary" />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Designation (Department)</label>
              <select
                id="designation"
                value={form.designation}
                onChange={handleChange}
                required
                className="form-control py-4"
              >
                <option value="">-- Select Department --</option>
                {departments.map(dep => (
                  <option key={dep._id} value={dep._id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="">
            <button type="submit" className="btn bg-custom w-25 text-white py-3 fw-medium border-0">Register</button>
          </div>
        </div>
      </form>

      {/* Department Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form onSubmit={handleDeptSubmit}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Department</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <label className="form-label">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={deptForm.name}
                    onChange={(e) => setDeptForm({ name: e.target.value })}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="submit" className="btn btn-primary">Add Department</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
