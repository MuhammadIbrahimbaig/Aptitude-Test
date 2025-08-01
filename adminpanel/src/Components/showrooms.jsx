import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RoomRead() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4001/rooms')
            .then(result => setRooms(result.data))
            .catch(err => console.log(err));
    }, []);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [roomName, setRoomName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus] = useState("");
    const [id, setID] = useState("");

    // Search & Sort
    let filteredRooms = search
        ? rooms.filter((room) => room.roomName.toLowerCase().includes(search.toLowerCase()))
        : rooms;

    if (sort === "1") filteredRooms.sort((a, b) => a.roomName.localeCompare(b.roomName));
    if (sort === "2") filteredRooms.sort((a, b) => b.roomName.localeCompare(a.roomName));
    if (sort === "3") filteredRooms.sort((a, b) => a.price - b.price);
    if (sort === "4") filteredRooms.sort((a, b) => b.price - a.price);

    const deleteRoom = async (roomId, roomName) => {
        if (window.confirm(`Delete room: ${roomName}?`)) {
            await axios.delete(`http://localhost:4001/rooms/${roomId}`)
                .then(() => {
                    toast.success("Room deleted");
                    setRooms((prev) => prev.filter((room) => room._id !== roomId));
                })
                .catch((e) => toast.error(e.message));
        }
    };

    const editRoom = async () => {
        try {
            await axios.put(`http://localhost:4001/rooms/${id}`, {
                roomName, type, price, capacity, status
            });
            toast.success("Room updated");
            // Refresh room list
            const { data } = await axios.get('http://localhost:4001/rooms');
            setRooms(data);
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
        }
    };

    const setRoomData = (r) => {
        setRoomName(r.roomName);
        setType(r.type);
        setPrice(r.price);
        setCapacity(r.capacity);
        setStatus(r.status);
        setID(r._id);
    };

    return (
        <div className="container my-5">
            <div className="row mb-3">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Search Room"
                        onChange={(e) => setSearch(e.target.value)} value={search} />
                </div>
                <div className="col-md-6">
                    <select className="form-select" onChange={(e) => setSort(e.target.value)}>
                        <option disabled selected>Select Filter</option>
                        <option value="1">Name A-Z</option>
                        <option value="2">Name Z-A</option>
                        <option value="3">Price Low-High</option>
                        <option value="4">Price High-Low</option>
                    </select>
                </div>
            </div>

            <h2 className="text-center text-primary mb-4">Room Management</h2>

            <div className="table-responsive shadow rounded">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
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
                                <td>{room.roomName}</td>
                                <td>{room.type}</td>
                                <td>{room.price}</td>
                                <td>{room.capacity}</td>
                                <td>{room.status}</td>
                                <td>
                                    <button className="btn btn-sm text-success me-2"
                                        data-bs-toggle="modal" data-bs-target="#editModal"
                                        onClick={() => setRoomData(room)}>
                                        <i className="bi bi-pencil-fill"></i>
                                    </button>
                                    <button className="btn btn-sm text-danger"
                                        onClick={() => deleteRoom(room._id, room.roomName)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Room</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control mb-2" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                            <input type="text" className="form-control mb-2" value={type} onChange={(e) => setType(e.target.value)} />
                            <input type="number" className="form-control mb-2" value={price} onChange={(e) => setPrice(e.target.value)} />
                            <input type="number" className="form-control mb-2" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                            <input type="text" className="form-control mb-2" value={status} onChange={(e) => setStatus(e.target.value)} />
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
