import carousel1 from '..//assets/images/carousel-1.jpg';
import carousel2 from '..//assets/images/carousel-2.jpg';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
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
            }
            );
    }, []);
    return (
        <div>
            <div className=" p-0 mb-5">
                <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src={carousel1} alt="Slide 1" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{ maxWidth: '700px' }}>
                                    <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">Luxury Living</h6>
                                    <h1 className="display-3 text-white mb-4 animated slideInDown">Discover A Brand Luxurious Hotel</h1>
                                    <a href="#" className="btn border-0 btn-primary py-md-3 px-md-5 me-3 animated slideInLeft relative z-[2] text-white overflow-hidden font-bold tracking-wide uppercase transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-[#1351d8] to-[#9c00ff] after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white hover:after:w-full hover:after:left-0 px-3 after:duration-350 after:delay-50">Our Rooms</a>
                                    <a href="#" className="btn border-0 bg-white py-md-3 px-md-5 me-3 animated slideInLeft relative z-[2]  overflow-hidden font-bold tracking-wide uppercase transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white  hover:after:w-full hover:after:left-0 px-3 after:duration-350 after:delay-50">Book A Room</a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src={carousel2} alt="Slide 2" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{ maxWidth: '700px' }}>
                                    <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">Luxury Living</h6>
                                    <h1 className="display-3 text-white mb-4 animated slideInDown">Discover A Brand Luxurious Hotel</h1>


                                    <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Our Rooms</a>
                                    <a href="#" >Book A Room</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
            {/* <!-- Booking Start --> */}
            <div class="booking pb-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container">
                    <div class="bg-white shadow" style={{ padding: '35px' }}>
                        <div class="row g-2">
                            <div class="col-12">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Booking End  */}
            <section>
                <div class="container my-5">
                    <div class="text-center mb-4">
                        <h2>Why Choose Us?</h2>
                        <p>We offer the best rooms and services.</p>
                    </div>
                    <div class="row text-center">
                        <div class="col-md-4">
                            <div class="card border-0 shadow-lg">
                                <div class="card-body">
                                    <i class="fa fa-bed fa-2x text-primary mb-3"></i>
                                    <h5 class="card-title">Luxury Rooms</h5>
                                    <p class="card-text">Well-furnished and spacious rooms for a relaxing stay.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card border-0 shadow-lg">
                                <div class="card-body">
                                    <i class="fa fa-user-shield fa-2x text-primary mb-3"></i>
                                    <h5 class="card-title">24/7 Service</h5>
                                    <p class="card-text">Round-the-clock support and room service available.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card border-0 shadow-lg">
                                <div class="card-body">
                                    <i class="fa fa-wifi fa-2x text-primary mb-3"></i>
                                    <h5 class="card-title">Free Wi-Fi</h5>
                                    <p class="card-text">Stay connected with fast and free internet access.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section>
                <div className="container-xxl py-5">
                    <div className="container">
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
                                            .slice(0, 3)
                                            .map((room, index) => (
                                                <div className="col-lg-4 col-md-6 " key={index} data-aos="fade-up" data-aos-delay={index * 100}>
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
                                                            <h6 className="cardroom ">{room.room_name}</h6>
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
                                                            <p className="text-body mb-3 ellipsis-2-lines ">{room.features.join(', ')}</p>
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
                </div>
                

            </section>


        </div>




    );
};

export default Home;
