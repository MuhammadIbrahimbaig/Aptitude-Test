import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Room() {
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
            {/* <!-- Page Header Start --> */}
            <div class="container page-header mb-5 p-0 testimonial">
                <div class="container  py-5">
                    <div class="container text-center pb-5">
                        <h1 class="display-3 text-white mb-3 animated slideInDown">Services</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center text-uppercase">
                                <li class="breadcrumb-item "><Link to='/' className='text-decoration-none text-white'>Home</Link></li>
                                <li class="breadcrumb-item "><a className='text-decoration-none text-white' href="#">Pages</a></li>
                                <li class="breadcrumb-item  text-white active" aria-current="page">Services</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}
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
                                            {/* <img className="img-fluid" src={`http://localhost:4001/uploads/${room.image}`} alt="room" /> */}
                                            <img className="img-fluid" src={`http://localhost:4001/${room.image}`} alt="room" />
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
        </div>

    )
}