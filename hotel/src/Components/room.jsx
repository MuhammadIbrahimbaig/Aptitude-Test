import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Room() {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

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
            <div class="container page-header mb-5 p-0 testimonial" >
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
                        <h6 className="section-title text-center text-primary text-uppercase" >Our Rooms</h6>
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
                                        <div className="room-item shadow rounded overflow-hidden">
                                            <div className="position-relative">
                                                <img className="img-fluid fixed-wh object-fit-cover" src={`http://localhost:4001/Mywork/${room.image}`} alt="room" />


                                                <small className="position-absolute start-0 top-100 translate-middle-y btn border-0 btn-primary text-white rounded py-1 px-3 ms-4">
                                                    ${room.price}/Night
                                                </small>
                                            </div>
                                            <div className="p-4 mt-2">
                                                <div className="">
                                                    <h6 className='cardroom'>{room.room_name}</h6>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">{room.type}</p>
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
                                                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                                                    </small>



                                                    <small><i className="fa fa-wifi text-primary me-2"></i>Wifi</small>
                                                </div>
                                                <p className="text-body mb-3">{room.features.join(', ')}</p>
                                                <div className="d-flex justify-content-between">
                                                    <Link className="btn btn-sm btn-primary rounded py-2 px-4 border-0"  data-bs-toggle="modal" data-bs-target="#roomDetailModal">View Detail</Link>

                                                    <button className="btn btn-sm btn-dark rounded py-2 px-4">
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
            {/* modal */}
            <div class="modal fade" id="roomDetailModal" tabindex="-1" aria-labelledby="roomDetailModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="roomDetailModalLabel">Room Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
{/*                           
                            <h6 class="fw-bold">Room Number:</h6>
                            <p>{{ $room-> room_number}}</p>

                            <h6 class="fw-bold">Room Type:</h6>
                            <p>{{ $room-> type}}</p>

                            <h6 class="fw-bold">Price:</h6>
                            <p>${{ $room-> price}} / night</p>

                            <h6 class="fw-bold">Capacity:</h6>
                            <p>{{ $room-> capacity}} Guests</p>

                            <h6 class="fw-bold">Features:</h6>
                            <ul>
                  @foreach(explode(',', $room->features) as $feature)
                                <li>{{ $feature }}</li>
                                @endforeach
                            </ul>

                            <h6 class="fw-bold">Short Description:</h6>
                            <p>{{ $room-> short_description}}</p> */}
                            <h2>Hello</h2>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}