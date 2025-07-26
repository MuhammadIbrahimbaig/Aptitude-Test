import { Link } from 'react-router-dom';
import room1 from '../assets/images/room-1.jpg';
import room2 from '../assets/images/room-2.jpg';
import room3 from '../assets/images/room-3.jpg';

export default function Room() {
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
                        {/* Room Card 1 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="room-item shadow rounded overflow-hidden">
                                <div className="position-relative">
                                    <img className="img-fluid" src={room1} alt="" />
                                    <small className="position-absolute start-0 top-100 translate-middle-y btn border-0 btn-primary text-white rounded py-1 px-3 ms-4">$100/Night</small>
                                </div>
                                <div className="p-4 mt-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h5 className="mb-0">Junior Suite</h5>
                                        <div className="ps-2">
                                            {Array(3).fill().map((_, i) => <small key={i} className="fa fa-star text-primary"></small>)}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <small className="border-end me-3 pe-3"><i className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                        <small className="border-end me-3 pe-3"><i className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        <small><i className="fa fa-wifi text-primary me-2"></i>Wifi</small>
                                    </div>
                                    <p className="text-body mb-3">Erat ipsum justo amet duo et elitr dolor...</p>
                                    <div className="d-flex justify-content-between">
                                        <a className="btn btn-sm btn-primary rounded py-2 px-4 border-0" href="#">View Detail</a>
                                        <a className="btn btn-sm btn-dark rounded py-2 px-4" href="#">Book Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Room Card 2 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="room-item shadow rounded overflow-hidden">
                                <div className="position-relative">
                                    <img className="img-fluid" src={room2} alt="" />
                                    <small className="position-absolute start-0 top-100 translate-middle-y btn border-0 btn-primary text-white rounded py-1 px-3 ms-4">$100/Night</small>

                                </div>
                                <div className="p-4 mt-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h5 className="mb-0">Executive Suite</h5>
                                        <div className="ps-2">
                                            {Array(1).fill().map((_, i) => <small key={i} className="fa fa-star text-primary"></small>)}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <small className="border-end me-3 pe-3"><i className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                        <small className="border-end me-3 pe-3"><i className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        <small><i className="fa fa-wifi text-primary me-2"></i>Wifi</small>
                                    </div>
                                    <p className="text-body mb-3">Erat ipsum justo amet duo et elitr dolor...</p>
                                    <div className="d-flex justify-content-between">
                                        <a className="btn btn-sm btn-primary rounded py-2 px-4 border-0" href="#">View Detail</a>
                                        <a className="btn btn-sm btn-dark rounded py-2 px-4" href="#">Book Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Room Card 3 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="room-item shadow rounded overflow-hidden">
                                <div className="position-relative">
                                    <img className="img-fluid" src={room3} alt="" />
                                    <small className="position-absolute start-0 top-100 translate-middle-y btn border-0 btn-primary text-white rounded py-1 px-3 ms-4">$100/Night</small>

                                </div>
                                <div className="p-4 mt-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h5 className="mb-0">Super Deluxe</h5>
                                        <div className="ps-2">
                                            {Array(5).fill().map((_, i) => <small key={i} className="fa fa-star text-primary"></small>)}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <small className="border-end me-3 pe-3"><i className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                        <small className="border-end me-3 pe-3"><i className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        <small><i className="fa fa-wifi text-primary me-2"></i>Wifi</small>
                                    </div>
                                    <p className="text-body mb-3">Erat ipsum justo amet duo et elitr dolor...</p>
                                    <div className="d-flex justify-content-between">
                                        <a className="btn btn-sm btn-primary rounded py-2 px-4 border-0" href="#">View Detail</a>
                                        <a className="btn btn-sm btn-dark rounded py-2 px-4" href="#">Book Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}