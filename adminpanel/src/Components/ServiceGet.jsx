import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ServiceGet() {
  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  // ✅ Fetch services
  async function fetchServices() {
    try {
      let response = await axios.get("http://localhost:4001/Mywork/ServiceGet");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  // ✅ Delete service
  async function deleteService(id) {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:4001/Mywork/servicedelete/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  }

  // ✅ Open modal and set data
  function handleEdit(service) {
    setEditService(service._id);
    setForm({ title: service.title, description: service.description });
  }

  // ✅ Save edited service
  async function saveEdit() {
    try {
      await axios.put(
        `http://localhost:4001/Mywork/serviceupdate/${editService}`,
        form
      );
      setEditService(null);
      setForm({ title: "", description: "" });
      fetchServices();
      // modal close trigger
      document.querySelector("#editModal .btn-close").click();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Services</h2>
      <table className="table table-bordered table-striped shadow">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Service Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service, index) => (
              <tr key={service._id}>
                <td>{index + 1}</td>
                <td>{service.title}</td>
                <td>{service.description}</td>
                <td>
                  {/* ✅ Modal open trigger */}
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteService(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No services found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Bootstrap Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-success" onClick={saveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
