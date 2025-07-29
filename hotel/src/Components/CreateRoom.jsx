import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export const CreateRoom = () => {
    const [roomNumber, setRoomNumber] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [features, setFeatures] = useState("");
    const [image, setImage] = useState(null);


    const SubmitFunc = async () => {
        try {
            const formData = new FormData();
            formData.append("room_number", roomNumber);
            formData.append("type", type);
            formData.append("price", price);
            formData.append("capacity", capacity);
            formData.append("is_available", isAvailable);
            formData.append("features", features);  
            if (image) {
                formData.append("image", image);  
            }

            await axios.post("http://localhost:4001/Mywork/saveroom", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Room Added Successfully");
        } catch (e) {
            console.log(e);
            toast.error(e?.response?.data?.msg || "Something went wrong!");
        }
    };
    return (
        <div>
            <ToastContainer />
            <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
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
                            <label htmlFor="type" className="form-label">Room Type</label>
                            <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Select type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Deluxe">Deluxe</option>
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
                                placeholder="Enter room capacity"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="isAvailable" className="form-label">Availability</label>
                            <select className="form-select" id="isAvailable" value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
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

                        <button type="button" className="btn btn-primary w-100" onClick={SubmitFunc}>
                            <i className="bi bi-plus-circle me-1"></i>Create Room
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}
