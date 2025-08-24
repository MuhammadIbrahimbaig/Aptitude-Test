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
  <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
    <ToastContainer />
    <div className="card p-4 shadow-lg rounded-4 w-100 " style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Add New Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Service Title</label>
          <input
            type="text"
            className="form-control py-4"
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

        <button type="submit" className=" border-0 py-3 btn bg-custom text-white w-100 py-2 fw-medium">
          Add Service
        </button>
      </form>
    </div>
  </div>
);

}
