import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ShowBooking() {
    const [bookings, setBookings] = useState([]);
    const [token, setToken] = useState("");

    async function ShowData() {
        const tok = localStorage.getItem("token");
        setToken(tok);

        axios.get("http://localhost:4001/Mywork/get-booking", {
            headers: {
                Authorization: `Bearer ${tok}`,
                "Content-Type": "application/json",
            }
        })
            .then(result => {
                if (Array.isArray(result.data)) {
                    setBookings(result.data);
                } else if (Array.isArray(result.data.data)) {
                    setBookings(result.data.data);
                } else {
                    setBookings([]);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        ShowData();
    }, []);

    // Delete Booking
    async function DeleteRecord(id) {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        try {
            await axios.delete(`http://localhost:4001/Mywork/remove-booking/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            toast.success("Booking Deleted Successfully");
            ShowData();
        } catch (e) {
            toast.error(e.response?.data?.msg || e.message);
        }
    }

    // Update Status
    async function UpdateStatus(id, newStatus) {
        try {
            await axios.put(
                `http://localhost:4001/Mywork/update-booking-status/${id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            toast.success(`Booking ${newStatus} successfully`);
            ShowData();
        } catch (e) {
            toast.error(e.response?.data?.msg || e.message);
        }
    }

    return (
        <div className="container my-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">📑 Booking Management</h2>
                <p className="text-muted">Manage all bookings from one place</p>
            </div>

            <div className="card shadow-lg rounded-3">
                <div className="card-body p-4">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">

                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Room</th>
                                    <th scope="col">Check-In</th>
                                    <th scope="col">Check-Out</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td>{booking.user_id?.name }</td>
                                        <td>{booking.user_id?.email }</td>
                                        <td className="fw-semibold">
                                            {booking.room_id?.room_name || "N/A"}
                                        </td>
                                        <td>{new Date(booking.check_in).toLocaleDateString()}</td>
                                        <td>{new Date(booking.check_out).toLocaleDateString()}</td>
                                        <td className="fw-bold text-success">
                                            ${booking.total_price}
                                        </td>
                                        <td>
                                            <span
                                                className={`badge rounded-pill px-3 py-2 
                                                         ${booking.status === "pending"
                                                        ? "bg-warning text-dark"
                                                        : booking.status === "booked"
                                                            ? "bg-primary"
                                                            : booking.status === "checked-in"
                                                                ? "bg-success"
                                                                : booking.status === "checked-out"
                                                                    ? "bg-info text-dark"
                                                                    : booking.status === "cancelled"
                                                                        ? "bg-danger"
                                                                        : "bg-secondary"}`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            {booking.status === "pending" && (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-success me-2 mb-2"
                                                        onClick={() => UpdateStatus(booking._id, "checked-in")}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger me-2 mb-2"
                                                        onClick={() => UpdateStatus(booking._id, "cancelled")}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                            {booking.status === "checked-in" && (
                                                <button
                                                    className="btn btn-sm btn-info me-2"
                                                    onClick={() => UpdateStatus(booking._id, "checked-out")}
                                                >
                                                    Check-Out
                                                </button>
                                            )}

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => DeleteRecord(booking._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
