import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StaffFetch() {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editStaff, setEditStaff] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    joiningDate: "",
    salary: "",
    designation: "",
  });

  useEffect(() => {
    fetchStaff();
    fetchDepartments();
  }, []);

  // ✅ Fetch all staff
  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token missing! User is not logged in.");
        return;
      }

      const res = await axios.get("http://localhost:4001/Mywork/StaffFetch", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setStaffList(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  // ✅ Fetch all departments
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:4001/Mywork/DepartFetch");
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  // ✅ Edit click
  const handleEditClick = (staff) => {
    setEditStaff({
      _id: staff._id,
      name: staff.name || "",
      email: staff.email || "",
      phone: staff.phone || "",
      joiningDate: staff.joiningDate ? staff.joiningDate.split("T")[0] : "",
      salary: staff.salary || "",
      designation: staff.designation?._id || "",
    });
  };

  // ✅ Input change
  const handleChange = (e) => {
    setEditStaff({ ...editStaff, [e.target.name]: e.target.value });
  };

  // ✅ Update staff
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:4001/Mywork/staffEdit/${editStaff._id}`,
        editStaff
      );
      fetchStaff();
      document.getElementById("closeModal").click();
      toast.success("Staff updated successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error updating staff!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // ✅ Delete staff with confirmation
  const handleDelete = (id) => {
    toast.info(
      <div style={{ textAlign: "center" }}>
        <p>Are you sure you want to delete?</p>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={async () => {
            try {
              await axios.delete(
                `http://localhost:4001/Mywork/staffDelete/${id}`
              );
              fetchStaff();
              toast.dismiss();
              toast.success("Staff deleted successfully!", {
                position: "top-center",
                autoClose: 2000,
              });
            } catch (err) {
              console.error(err);
              toast.dismiss();
              toast.error("Error deleting staff!", {
                position: "top-center",
                autoClose: 2000,
              });
            }
          }}
        >
          Yes
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            toast.dismiss();
            toast.info("Delete cancelled", {
              position: "top-center",
              autoClose: 1500,
            });
          }}
        >
          No
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4 text-center">Staff List</h2>
      <table className="table table-bordered table-hover text-center align-middle shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joining Date</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.length > 0 ? (
            staffList.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.phone || "-"}</td>
                <td>
                  {staff.joiningDate
                    ? new Date(staff.joiningDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>{staff.salary || "-"}</td>
                <td>{staff.designation?.name || "-"}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEditClick(staff)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(staff._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No staff found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5>Edit Staff</h5>
              <button
                type="button"
                className="btn-close"
                id="closeModal"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editStaff.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editStaff.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editStaff.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Joining Date</label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={editStaff.joiningDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Salary</label>
                    <input
                      type="number"
                      name="salary"
                      value={editStaff.salary}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Department</label>
                    <select
                      name="designation"
                      value={editStaff.designation}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
