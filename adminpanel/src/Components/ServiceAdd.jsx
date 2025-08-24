import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ServiceAdd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:4001/Mywork/service", {
        title,
        description,
      });

      toast.success(response.data.msg);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error adding service");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg rounded-4">
        <div className="mb-3">
          <label className="form-label">Service Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter service title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Service Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter service description"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Service
        </button>
      </form>
    </div>
  );
}
