import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserFetch() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios.get('http://localhost:4001/Mywork/UserFetch')
      .then(res => setUsers(res.data))
      .catch(() =>
        toast.error("Failed to fetch users.", {
          position: "top-center",
          theme: "colored"
        })
      )
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="mb-2 fw-semibold text-danger">Are you sure you want to delete this user?</p>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              className="btn btn-sm btn-danger"
              disabled={deletingId === id}
              onClick={() => {
                setDeletingId(id);
                axios
                  .delete(`http://localhost:4001/Mywork/UserDelete/${id}`)
                  .then(() => {
                    setUsers(users.filter(user => user._id !== id));
                    toast.success("User deleted successfully!", {
                      position: "top-center",
                      theme: "colored"
                    });
                    closeToast();
                  })
                  .catch(() => {
                    toast.error("Failed to delete user.", {
                      position: "top-center",
                      theme: "colored"
                    });
                    closeToast();
                  })
                  .finally(() => setDeletingId(null));
              }}
            >
              {deletingId === id ? "Deleting..." : "Yes"}
            </button>
            <button className="btn btn-sm btn-secondary" onClick={closeToast}>
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        theme: "colored"
      }
    );
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: ""
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    const { name, email, password } = formData;

    // Validation: At least one field must be changed
    if (!name && !email && !password) {
      toast.warn("Please fill at least one field.", {
        position: "top-center",
        theme: "colored"
      });
      return;
    }

    if (
      name === editUser.name &&
      email === editUser.email &&
      (password === "" || password === editUser.password)
    ) {
      toast.info("No changes detected.", {
        position: "top-center",
        theme: "colored"
      });
      return;
    }

    setUpdating(true);
    axios
      .put(`http://localhost:4001/Mywork/editUser/${editUser._id}`, formData)
      .then(() => {
        toast.success("User updated successfully!", {
          position: "top-center",
          theme: "colored"
        });

        const modalEl = document.getElementById("editModal");
        const modalInstance = window.bootstrap?.Modal.getInstance(modalEl);
        modalInstance?.hide();

        setEditUser(null);
        fetchUsers();
      })
      .catch(() => {
        toast.error("Failed to update user.", {
          position: "top-center",
          theme: "colored"
        });
      })
      .finally(() => setUpdating(false));
  };

  return (
    <div className="container my-5">
      <style>
        {`
          .custom-table thead {
            background-color: #0d6efd;
            color: white;
          }
          .custom-table tbody tr:hover {
            background-color: #f0f8ff;
          }
          .form-floating > label {
            padding-left: 0.75rem;
          }
          .modal-body input:focus {
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
            border-color: #86b7fe;
          }
        `}
      </style>

      <h2 className="text-center mb-4 text-primary fw-bold">User Management</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="spinner-border text-primary me-2" role="status"></div>
          <strong>Loading user data...</strong>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center shadow-sm custom-table">
            <thead className='table-dark'>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td className="text-break">{user.email}</td>
                    <td className="text-muted">{user.password?.substring(0, 14)}...</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => openEditModal(user)}
                      >
                        <i className="fa-solid fa-pen" />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(user._id)}
                        disabled={deletingId === user._id}
                      >
                        {deletingId === user._id ? (
                          <span className="spinner-border spinner-border-sm" role="status" />
                        ) : (
                          <i className="fa-solid fa-trash" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3 text-muted">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT USER MODAL */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-sm">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Edit User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" disabled={updating}></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="form-control"
                  placeholder="Name"
                />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="form-control"
                  placeholder="Email"
                />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  className="form-control"
                  placeholder="Password"
                />
                <label htmlFor="password">New Password</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" disabled={updating}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate} disabled={updating}>
                {updating ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                ) : null}
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
