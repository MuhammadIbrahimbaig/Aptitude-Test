import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateRoom = () => {
    const [room_name, setRoomName] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus] = useState("");
    const [features, setFeatures] = useState("");
    const [shortdescription, setDescription] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        const typeToCapacity = {
            Single: 1,
            Double: 2,
            Deluxe: 3,
            Suit: 5
        };

        if (type in typeToCapacity) {
            setCapacity(typeToCapacity[type]);
        } else {
            setCapacity("");
        }
    }, [type]);

    const SubmitFunc = async () => {
        try {
            const tokendata = localStorage.getItem('token'); // fetch fresh token

            const formData = new FormData();
            formData.append("room_name", room_name);
            formData.append("room_number", roomNumber);
            formData.append("type", type);
            formData.append("price", price);
            formData.append("capacity", capacity);
            formData.append("status", status);
            formData.append("features", features);
            formData.append("short_description", shortdescription);
            if (image) {
                formData.append("image", image);
            }

            await axios.post("http://localhost:4001/Mywork/saveroom", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${tokendata}` // use fresh token here
                }
            });

            // Clear form inputs
            setRoomName("");
            setRoomNumber("");
            setType("");
            setPrice("");
            setCapacity("");
            setStatus("");
            setFeatures("");
            setDescription("");
            setImage(null);
            document.getElementById("image").value = null;
            toast.success("Room Added Successfully");
        } catch (e) {
            console.error(e);
            toast.error(e?.response?.data?.msg || "Something went wrong!");
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "550px", width: "100%" }}>
                    <h3 className="text-center mb-4 text-primary">
                        <i className="bi bi-door-open-fill me-2"></i>Create Room
                    </h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="roomNumber" className="form-label">Room Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomNumber"
                                placeholder="Enter room number"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomName" className="form-label">Room Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomName"
                                placeholder="Enter room name"
                                value={room_name}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Room Type</label>
                            <select
                                className="form-select"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Select type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Suit">Suit</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="Enter room price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                value={capacity}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Room Status</label>
                            <select
                                className="form-select"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="available">Available</option>
                                <option value="booked">Booked</option>
                                <option value="cleaning">Cleaning</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Room Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="shortdescription" className="form-label">Short Description</label>
                            <textarea
                                className="form-control"
                                id="shortdescription"
                                value={shortdescription}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="features" className="form-label">Features (comma-separated)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="features"
                                placeholder="e.g. AC, Wi-Fi, TV"
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={SubmitFunc}
                        >
                            <i className="bi bi-plus-circle me-1"></i>Create Room
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
