import carousel1 from '..//assets/images/carousel-1.jpg';
import carousel2 from '..//assets/images/carousel-2.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4001/Mywork/read')
            .then(res => {
                console.log('Room issue', res.data);

                setRooms(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <div className="container p-0 mb-5">
                <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src={carousel1} alt="Slide 1" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{ maxWidth: '700px' }}>
                                    <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">Luxury Living</h6>
                                    <h1 className="display-3 text-white mb-4 animated slideInDown">Discover A Brand Luxurious Hotel</h1>
                                    <a href="#" className="btn border-0 btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Our Rooms</a>
                                    <a href="#" className="btn border-0 btn-light py-md-3 px-md-5 animated slideInRight">Book A Room</a>
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
                                    <a href="#" className="btn btn-light py-md-3 px-md-5 animated slideInRight">Book A Room</a>
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
                            <div class="col-md-10">
                                <div class="row g-2">
                                    <div class="col-md-3">
                                        <div class="date" id="date1" data-target-input="nearest">
                                            <input type="text" class="form-control datetimepicker-input"
                                                placeholder="Check in" data-target="#date1" data-toggle="datetimepicker" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="date" id="date2" data-target-input="nearest">
                                            <input type="text" class="form-control datetimepicker-input" placeholder="Check out" data-target="#date2" data-toggle="datetimepicker" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-select">
                                            <option selected>Adult</option>
                                            <option value="1">Adult 1</option>
                                            <option value="2">Adult 2</option>
                                            <option value="3">Adult 3</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-select">
                                            <option selected>Child</option>
                                            <option value="1">Child 1</option>
                                            <option value="2">Child 2</option>
                                            <option value="3">Child 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button class="btn border-0 btn-primary w-100">Submit</button>
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
                            <div class="card border-0 shadow-sm">
                                <div class="card-body">
                                    <i class="fa fa-bed fa-2x text-primary mb-3"></i>
                                    <h5 class="card-title">Luxury Rooms</h5>
                                    <p class="card-text">Well-furnished and spacious rooms for a relaxing stay.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card border-0 shadow-sm">
                                <div class="card-body">
                                    <i class="fa fa-user-shield fa-2x text-primary mb-3"></i>
                                    <h5 class="card-title">24/7 Service</h5>
                                    <p class="card-text">Round-the-clock support and room service available.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card border-0 shadow-sm">
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
                        <div className="text-center">
                            <h6 className="section-title text-center text-primary text-uppercase">Our Rooms</h6>
                            <h1 className="mb-5">Explore Our <span className="text-primary text-uppercase">Rooms</span></h1>
                        </div>
                        <div className="row g-4">
                            {rooms.length === 0 ? (
                                <div className="text-center w-100">
                                    <h5 className="text-muted">No record found</h5>
                                </div>
                            ) : (
                                rooms.map((room, index) => (
                                    <div className="col-lg-4 col-md-6" key={index}>
                                        <div className="room-item shadow rounded overflow-hidden">
                                            <div className="position-relative">
                                                <img className="img-fluid fixed-wh object-fit-cover" src={`http://localhost:4001/Mywork/${room.image}`} alt="room" />


                                                <small className="position-absolute start-0 top-100 translate-middle-y btn border-0 btn-primary text-white rounded py-1 px-3 ms-4">
                                                    ${room.price}/Night
                                                </small>
                                            </div>
                                            <div className="p-4 mt-2">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <h5 className="mb-0">{room.type}</h5>
                                                    <div className="ps-2">
                                                        {Array(3).fill().map((_, i) => (
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
                                                        {room.is_available ? "Available" : "Booked"}
                                                    </small>
                                                    <small><i className="fa fa-wifi text-primary me-2"></i>Wifi</small>
                                                </div>
                                                <p className="text-body mb-3">{room.features.join(', ')}</p>
                                                <div className="d-flex justify-content-between">
                                                    <a className="btn btn-sm btn-primary rounded py-2 px-4 border-0" href="#">View Detail</a>
                                                    <a className="btn btn-sm btn-dark rounded py-2 px-4" href="#">Book Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>


                    </div>
                </div>

            </section>
        </div>
    );
};

export default Home;
