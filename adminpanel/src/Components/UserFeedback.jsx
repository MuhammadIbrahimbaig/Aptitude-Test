import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import

export default function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  //  Fetch Feedbacks
  const fetchFeedbacks = () => {
    setLoading(true);
    axios
      .get("http://localhost:4001/Mywork/UserFeedback")
      .then((res) => setFeedbacks(res.data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch feedbacks!",
        });
      })
      .finally(() => setLoading(false));
  };



  //  Delete Feedback
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this feedback!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4001/Mywork/UserFeedDelete/${id}`)
          .then(() => {
            fetchFeedbacks();
            Swal.fire("Deleted!", "Feedback has been deleted.", "success");
          })
          .catch(() =>
            Swal.fire({
              icon: "error",
              title: "Failed to delete feedback",
            })
          );
      }
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-primary fw-bold">Feedback List</h2>


      {/*  Feedback Table */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="spinner-border text-primary me-2" role="status"></div>
          <strong>Loading feedbacks...</strong>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle text-center">
            <thead className="table-dark text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, index) => (
                  <tr key={fb._id} className="align-middle">
                    <td>{index + 1}</td>
                    <td>{fb.name}</td>
                    <td className="text-break">{fb.email}</td>
                    <td>{"⭐".repeat(fb.rating)}</td>
                    <td className="text-muted">{fb.comment}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(fb._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3 text-muted">
                    No feedbacks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
