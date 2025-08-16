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
    console.log("API Response:", result.data);  // 👀 yahan console me dekho
    if (Array.isArray(result.data)) {
        setBookings(result.data);
    } else if (Array.isArray(result.data.data)) {
        setBookings(result.data.data);
    } else {
        setBookings([]); // fallback
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

    // Update Status (Accept / Reject)
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
            <h2 className="text-center text-primary mb-4">Booking Management</h2>

            <div className="table-responsive shadow rounded">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Booking ID</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(Array.isArray(bookings) ? bookings : []).map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking._id}</td>
                                <td>{new Date(booking.check_in).toLocaleString()}</td>
                                <td>{new Date(booking.check_out).toLocaleString()}</td>
                                <td>${booking.total_price}</td>
                                <td>
                                    <span className={`badge 
            ${booking.status === "pending" ? "bg-warning text-dark" :
                                            booking.status === "booked" ? "bg-primary" :
                                                booking.status === "accepted" ? "bg-success" :
                                                    booking.status === "rejected" ? "bg-danger" : "bg-secondary"}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>{new Date(booking.created_at).toLocaleString()}</td>
                                <td>
                                    {booking.status === "pending" && (
                                        <>
                                            <button className="btn btn-sm btn-success me-2"
                                                onClick={() => UpdateStatus(booking._id, "accepted")}>
                                                Accept
                                            </button>
                                            <button className="btn btn-sm btn-danger me-2"
                                                onClick={() => UpdateStatus(booking._id, "rejected")}>
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => DeleteRecord(booking._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
