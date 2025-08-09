import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RoomRead() {
    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem("token"); // token fetch from storage

        axios.get("http://localhost:4001/Mywork/read", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(result => setRooms(result.data))
            .catch(err => console.log(err));

    }, []);

    const [roomNumber, setRoomNumber] = useState("");
    const [roomName, setRoomName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus] = useState("");
    const [id, setID] = useState("");


    // Delete
async function DeleteRecord(id, n) {
    if (!window.confirm(`Are you sure you want to delete "${n}" record?`)) {
        return;
    }

    try {
        await axios.delete(`http://localhost:4001/Mywork/remove/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        toast.success("Record Deleted Successfully");
        RoomRead(); // refresh table/list
    } catch (e) {
        toast.error(e.response?.data?.msg || e.message);
    }
}

    async function EditRoom() {
        try {
            await axios.put(
                `http://localhost:4001/Mywork/edit/${a}`,
                {
                    room_number: roomNumber,
                    room_name: roomName,
                    type: type,
                    price: price,
                    capacity: capacity,
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            toast.success("Record Updated Successfully");

            // Refresh the data
            axios.get('http://localhost:4001/Mywork/read', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
                .then(result => setRooms(result.data))
                .catch(err => console.log(err));

            const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            if (modal) modal.hide();

        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
        }
    }



    const setRoomData = (r) => {
        setRoomNumber(r.room_number);
        setRoomName(r.room_name);
        setType(r.type);
        setPrice(r.price);
        setCapacity(r.capacity);
        setStatus(r.status);
        setID(r._id);
    };

    return (
        <div className="container my-5">


            <h2 className="text-center text-primary mb-4">Room Management</h2>

            <div className="table-responsive shadow rounded">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Room No</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Capacity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room._id}>
                                <td>{room.room_number}</td>
                                <td>{room.room_name}</td>
                                <td>{room.type}</td>
                                <td>{room.price}</td>
                                <td>{room.capacity}</td>
                                <td>
                                    <span className={`badge 
                                 ${room.status === "available" ? "bg-success" :
                                            room.status === "booked" ? "bg-danger" :
                                                room.status === "cleaning" ? "bg-warning text-dark" :
                                                    room.status === "maintenance" ? "bg-secondary" : ""}`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm text-success me-2"
                                        data-bs-toggle="modal" data-bs-target="#editModal"
                                        onClick={() => setRoomData(room)}>
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>
                                    <button className="btn btn-sm text-danger"
                                        onClick={() => DeleteRecord(room._id, room.room_name)}>
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Room</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control mb-2" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="Room Number" />
                            <input type="text" className="form-control mb-2" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Room Name" />
                            <input type="text" className="form-control mb-2" value={type} onChange={(e) => setType(e.target.value)} placeholder="Room Type" />
                            <input type="number" className="form-control mb-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                            <input type="number" className="form-control mb-2" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" />
                            <select
                                className="form-select mb-2"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="available">Available</option>
                                <option value="booked">Booked</option>
                                <option value="cleaning">Cleaning</option>
                                <option value="maintenance">Maintenance</option>
                            </select>

                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={() => EditRoom(id)} data-bs-dismiss="modal">Save changes</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
