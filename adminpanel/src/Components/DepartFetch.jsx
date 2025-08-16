import { useEffect, useState } from "react";
import axios from "axios";

export default function DepartFetch() {
  const [departments, setDepartments] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios
      .get("http://localhost:4001/Mywork/DepartFetch")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      axios
        .delete(`http://localhost:4001/Mywork/DepartDelete/${id}`)
        .then(() => {
          alert("Department deleted successfully!");
          fetchDepartments();
        })
        .catch((err) => console.error("Error deleting department", err));
    }
  };

  const handleEditOpen = (id, name) => {
    setEditId(id);
    setEditName(name);
    setEditModal(true);
  };

  const handleEditSave = () => {
    axios
      .put(`http://localhost:4001/Mywork/DepartEdit/${editId}`, { name: editName })
      .then(() => {
        alert("Department updated successfully!");
        fetchDepartments();
        setEditModal(false);
      })
      .catch((err) => console.error("Error updating department", err));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div style={{ width: "70%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Department List</h2>
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead style={{ backgroundColor: "#d0e7ff" }}>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dep, index) => (
                <tr key={dep._id}>
                  <td>{index + 1}</td>
                  <td>{dep.name}</td>
                  <td>
                    <button
                      onClick={() => handleEditOpen(dep._id, dep.name)}
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dep._id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Departments Found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "300px",
                textAlign: "center",
              }}
            >
              <h3>Edit Department</h3>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "10px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <div>
                <button
                  onClick={handleEditSave}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditModal(false)}
                  style={{
                    backgroundColor: "gray",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
