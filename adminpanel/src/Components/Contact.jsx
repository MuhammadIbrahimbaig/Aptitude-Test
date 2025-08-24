import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


export default function ShowContact() {
    const [contacts, setContacts] = useState([]);
    const [token, setToken] = useState("");

    // ✅ Fetch Contacts
    async function fetchContacts() {
        const tok = localStorage.getItem("token");
        setToken(tok);

        try {
            const result = await axios.get("http://localhost:4001/Mywork/get-contact", {
                headers: {
                    Authorization: `Bearer ${tok}`,
                    "Content-Type": "application/json",
                }
            });

            if (Array.isArray(result.data)) {
                setContacts(result.data);
            } else if (Array.isArray(result.data.data)) {
                setContacts(result.data.data);
            } else {
                setContacts([]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch contacts");
        }
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    // ✅ Delete Contact
    async function deleteContact(id) {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;

        try {
            await axios.delete(`http://localhost:4001/Mywork/remove-contact/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            Swal.fire("success","Contact deleted successfully","success");
            fetchContacts();
        } catch (e) {
            toast.error(e.response?.data?.msg || e.message);
        }
    }

    return (
        <div className="container my-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Contact Management</h2>
                <p className="text-muted">Manage all contacts from one place</p>
            </div>

            <div className="card shadow-lg rounded-3">
                <div className="card-body p-4">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id}>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.message}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => deleteContact(contact._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {contacts.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted">
                                            No contacts found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
