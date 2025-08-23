import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Room() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:4001/Mywork/read', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },

        })
            .then(res => {
                setRooms(res.data);
            })
            .catch(err => {
                console.error('Error fetching room data:', err);
            });
    }, []);

    return (
        <div>
            {/* Page Header */}
            <div className="container page-header mb-5 p-0 testimonial">
                <div className="container py-5">
                    <div className="container text-center pb-5">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">Our Rooms</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item">
                                    <Link to="/" className="text-decoration-none text-white">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#" className="text-decoration-none text-white">Pages</a>
                                </li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Services</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Room List */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center">
                        <h6 className="section-title text-primary text-uppercase">Our Rooms</h6>
                        <h1 className="mb-5">Explore Our <span className="text-primary text-uppercase">Rooms</span></h1>
                    </div>
                    <div className="row g-4">
                        {rooms.length === 0 ? (
                            <div className="text-center w-100">
                                <h5 className="text-muted">No record found</h5>
                            </div>
                        ) : (
                            rooms
                                .filter(room => room.status === "available")
                                .map((room, index) => (
                                    <div className="col-lg-4 col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                        <div className="room-item shadow rounded overflow-hidden fix-h">
                                            <div className="position-relative">
                                                <img
                                                    className="img-fluid fixed-wh object-fit-cover"
                                                    src={room.image}
                                                    alt="room"
                                                />

                                                <small className="book-btn position-absolute start-0 top-100 translate-middle-y btn border-0 btn-primary text-white rounded py-1 px-3 ms-4">
                                                    ${room.price}/Night
                                                </small>
                                            </div>
                                            <div className="p-4 mt-2">
                                                <h6 className="cardroom">{room.room_name}</h6>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">{room.type}</p>
                                                    <div className="ps-2">
                                                        {[...Array(3)].map((_, i) => (
                                                            <small key={i} className="fa fa-star text-primary"></small>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="d-flex mb-3">
                                                    <small className="border-end me-3 pe-3">
                                                        <i className="fa fa-users text-primary me-2"></i>{room.capacity} People
                                                    </small>
                                                    <small className="border-end me-3 pe-3">
                                                        <i className="fa fa-check text-primary me-2"></i>
                                                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                                                    </small>
                                                    <small><i className="fa fa-wifi text-primary me-2"></i>Wifi</small>
                                                </div>
                                                <p className="text-body mb-3">{room.features.join(', ')}</p>
                                                <div className="d-flex justify-content-between">
                                                    <button
                                                        className="px-3 relative z-[2]  overflow-hidden font-bold tracking-wide uppercase transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-[#1351d8] to-[#9c00ff] after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white hover:after:w-full hover:after:left-0 px-3 text-light py-2 after:duration-350 after:delay-50"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#roomDetailModal"
                                                        onClick={() => setSelectedRoom(room)}
                                                    >
                                                        View Detail
                                                    </button>
                                                    <button
                                                        className=" px-3 relative z-[2]  overflow-hidden font-bold tracking-wide uppercase transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-[#1351d8] to-[#9c00ff] after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white hover:after:w-full hover:after:left-0 px-3 text-light after:duration-350 after:delay-50"
                                                        onClick={() => navigate(`/booking/${room._id || room.id}`)}
                                                    >
                                                        Book Now
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </div>

            {/* Room Detail Modal */}
            <div className="modal fade" id="roomDetailModal" tabIndex="-1" aria-labelledby="roomDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header btn btn-primary text-white ">
                            <h5 className="modal-title fw-bold" id="roomDetailModalLabel">Room Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body border-0">
                            {selectedRoom ? (
                                <div className="card mb-3 border shadow rounded-4  overflow-hidden" >
                                    <div className="row g-0">

                                        {/* Left Image with VIP Badge */}
                                        <div className="col-md-6 position-relative">
                                            <img
                                                src={selectedRoom.image}
                                                className="img-fluid h-100"
                                                style={{ objectFit: "cover" }}
                                                alt={selectedRoom.room_name}
                                            />
                                        </div>

                                        {/* Right Content */}
                                        <div className="col-md-6">
                                            <div className="card-body p-3">
                                                <h4 className="fw-bold text-uppercase text-primary mb-2">{selectedRoom.room_name}</h4>

                                                <p className="mb-1">
                                                    <i className="bi bi-hash text-secondary me-2"></i>
                                                    <strong>Room Number:</strong> {selectedRoom.room_number}
                                                </p>
                                                <p className="mb-1">
                                                    <i className="bi bi-house-door text-secondary me-2"></i>
                                                    <strong>Type:</strong> {selectedRoom.type}
                                                </p>
                                                <p className="mb-1">
                                                    <i className="bi bi-people text-secondary me-2"></i>
                                                    <strong>Capacity:</strong> {selectedRoom.capacity} Guests
                                                </p>
                                                <p className="mb-2">
                                                    <i className="bi bi-currency-rupee text-success me-2"></i>
                                                    <strong className="text-success">Price:</strong> Rs {selectedRoom.price} / night
                                                </p>

                                                {/* Features */}
                                                <p className="mb-1 fw-bold">Features:</p>
                                                <div className="mb-2">
                                                    {selectedRoom.features.map((feature, i) => (
                                                        <span key={i} className="badge bg-light text-dark border me-1 mb-1">
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Short Description */}
                                                {selectedRoom.short_description && (
                                                    <p className="text-muted fst-italic mt-2">
                                                        {selectedRoom.short_description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}
