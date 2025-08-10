import { useState } from "react";
import about1 from '../assets/images/about-1.jpg';
import about2 from '../assets/images/about-2.jpg';
import about3 from '../assets/images/about-3.jpg';
import about4 from '../assets/images/about-4.jpg';
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";



export default function Booking() {
    const [roomId, setRoomId] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adult, setAdult] = useState("1");
    const [child, setChild] = useState("0");
    const [totalPrice, setTotalPrice] = useState(0);
    const [status, setStatus] = useState("booked");
    const [specialRequest, setSpecialRequest] = useState("");

    const SubmitBooking = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // ✅ pehle yahan define karo
            if (!token) {
                toast.error("User not logged in");
                return;
            }

            // ✅ ab decode karo
            const decoded = jwtDecode(token);
            const userId = decoded?.id; // payload key adjust karo

            const payload = {
                user_id: userId,
                room_id: roomId,
                check_in: checkIn,
                check_out: checkOut,
                adult,
                child,
                total_price: totalPrice,
                status,
                special_request: specialRequest
            };

            await axios.post("http://localhost:4001/create-booking", payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            // Reset form
            setRoomId("");
            setCheckIn("");
            setCheckOut("");
            setAdult("1");
            setChild("0");
            setTotalPrice(0);
            setStatus("booked");
            setSpecialRequest("");

            toast.success("Booking Created Successfully");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.msg || "Something went wrong!");
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="container page-header mb-5 p-0 testimonial">
                <div className="container-fluid py-5">
                    <div className="container text-center pb-5">
                        <h1 className="display-3 text-white mb-3 fw-bold">Booking</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item"><a className="text-decoration-none text-white" href="#">Home</a></li>
                                <li className="breadcrumb-item"><a className="text-decoration-none text-white" href="#">Pages</a></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Booking</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Booking Form */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title text-center text-primary text-uppercase">Room Booking</h6>
                        <h1 className="mb-5">Book A <span className="text-primary text-uppercase">Luxury Room</span></h1>
                    </div>
                    <div className="row g-5">
                        {/* Images */}
                        <div className="col-lg-6">
                            <div className="row g-3">
                                <div className="col-6 text-end">
                                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.1s" src={about1} style={{ marginTop: '25%' }} />
                                </div>
                                <div className="col-6 text-start">
                                    <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.3s" src={about2} />
                                </div>
                                <div className="col-6 text-end">
                                    <img className="img-fluid rounded w-50 wow zoomIn" data-wow-delay="0.5s" src={about3} />
                                </div>
                                <div className="col-6 text-start">
                                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.7s" src={about4} />
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="col-lg-6">
                            <div className="wow fadeInUp" data-wow-delay="0.2s">
                                <form onSubmit={SubmitBooking}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="checkin"
                                                    value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
                                                <label htmlFor="checkin">Check In</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="checkout"
                                                    value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
                                                <label htmlFor="checkout">Check Out</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select className="form-select" id="adult" value={adult} onChange={(e) => setAdult(e.target.value)}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                                <label htmlFor="adult">Select Adult</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select className="form-select" id="child" value={child} onChange={(e) => setChild(e.target.value)}>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                                <label htmlFor="child">Select Child</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <select className="form-select" id="room" value={roomId} onChange={(e) => setRoomId(e.target.value)} required>
                                                    <option value="">Select a Room</option>
                                                    <option value="room1">Room 1</option>
                                                    <option value="room2">Room 2</option>
                                                    <option value="room3">Room 3</option>
                                                </select>
                                                <label htmlFor="room">Select A Room</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Special Request" id="message" style={{ height: '100px' }}
                                                    value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} />
                                                <label htmlFor="message">Special Request</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3 border-0" type="submit">Book Now</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
