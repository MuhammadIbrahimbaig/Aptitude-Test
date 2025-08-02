import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RoomRead() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4001/Mywork/read')
            .then(result => setRooms(result.data))
            .catch(err => console.log(err));
    }, []);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [roomName, setRoomName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [id, setID] = useState("");

    // Search & Sort
    let filteredRooms = search
        ? rooms.filter((room) => room.room_name.toLowerCase().includes(search.toLowerCase()))
        : [...rooms];

    switch (sort) {
        case "1":
            filteredRooms.sort((a, b) => a.room_name.localeCompare(b.room_name));
            break;
        case "2":
            filteredRooms.sort((a, b) => b.room_name.localeCompare(a.room_name));
            break;
        case "3":
            filteredRooms.sort((a, b) => a.price - b.price);
            break;
        case "4":
            filteredRooms.sort((a, b) => b.price - a.price);
            break;
        case "5":
            filteredRooms.sort((a, b) => a.capacity - b.capacity);
            break;
        case "6":
            filteredRooms.sort((a, b) => b.capacity - a.capacity);
            break;
        default:
            break;
    }

    // const deleteRoom = async (roomId, roomName) => {
    //     if (window.confirm(`Delete room: ${roomName}?`)) {
    //         await axios.delete(`http://localhost:4001/Mywork/remove/${roomId}`)
    //             .then(() => {
    //                 toast.success("Room deleted");
    //                 setRooms((prev) => prev.filter((room) => room._id !== roomId));
    //             })
    //             .catch((e) => toast.error(e.message));
    //     }
    // };
    // Delete
    async function DeleteRecord(id, n) {
        if (window.confirm(`Are you sure want to delete ${n} record `)) {
            await axios.delete(`http://localhost:4001/Mywork/remove/${id}`).then(() => {
                toast.success("Record Deleted Successfully");
                RoomRead()
            }).catch((e) => {
                toast.error(e.message)
            })
        }
    }

    const editRoom = async () => {
        try {
            await axios.put(`http://localhost:4001/rooms/${id}`, {
                room_number: roomNumber,
                room_name: roomName,
                type,
                price,
                capacity,
                is_available: isAvailable
            });
            toast.success("Room updated");
            const { data } = await axios.get('http://localhost:4001/Mywork/read');
            setRooms(data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
        }
    };

    const setRoomData = (r) => {
        setRoomNumber(r.room_number);
        setRoomName(r.room_name);
        setType(r.type);
        setPrice(r.price);
        setCapacity(r.capacity);
        setIsAvailable(r.is_available);
        setID(r._id);
    };

    return (
        <div className="container my-5">
            <div className="row mb-3">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Search Room Name"
                        onChange={(e) => setSearch(e.target.value)} value={search} />
                </div>
                <div className="col-md-6">
                    <select className="form-select" onChange={(e) => setSort(e.target.value)}>
                        <option value="">Sort by</option>
                        <option value="1">Name A-Z</option>
                        <option value="2">Name Z-A</option>
                        <option value="3">Price Low-High</option>
                        <option value="4">Price High-Low</option>
                        <option value="5">Capacity Low-High</option>
                        <option value="6">Capacity High-Low</option>
                    </select>
                </div>
            </div>

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
                        {filteredRooms.map((room) => (
                            <tr key={room._id}>
                                <td>{room.room_number}</td>
                                <td>{room.room_name}</td>
                                <td>{room.type}</td>
                                <td>{room.price}</td>
                                <td>{room.capacity}</td>
                                <td>{room.is_available ? "Available" : "Booked"}</td>
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
                            <select className="form-select mb-2" value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")}>
                                <option value="true">Available</option>
                                <option value="false">Booked</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={editRoom} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
