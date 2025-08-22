import { Link } from "react-router-dom";

export default function Services() {


    return (
        <div>
            {/* <!-- Service Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title text-center text-primary text-uppercase">Our Services</h6>
                        <h1 className="mb-5">Explore Our <span className="text-primary text-uppercase">Services</span></h1>
                    </div>
                    <div className="row g-4">

                        {/* Repeatable service item */}
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <Link to="/services/rooms" className="service-item  btn border-0 py-md-3 px-md-5 me-3 animated slideInLeft relative z-[2] text-white bg-white overflow-hidden   transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white hover:after:w-full hover:after:left-0 px-3 text-decoration-none rounded">
                                <div className="service-icon bg-transparent border rounded p-1">
                                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                                        <i className="fa fa-hotel fa-2x text-primary"></i>
                                    </div>
                                </div>
                                <h5 className="mb-3 text-black">Rooms & Appartment</h5>
                                <p className="text-body mb-0">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                            </Link>
                        </div>

                        {/* Add other services below the same way */}
                        {/* Food & Restaurant */}
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                            <Link to="/services/food" className="service-item  btn border-0 py-md-3 px-md-5 me-3 animated slideInLeft relative z-[2] text-white bg-white overflow-hidden font-bold tracking-wide uppercase transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white hover:after:w-full hover:after:left-0 px-3text-decoration-none rounded">
                                <div className="service-icon bg-transparent border rounded p-1">
                                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                                        <i className="fa fa-utensils fa-2x text-primary"></i>
                                    </div>
                                </div>
                                <h5 className="mb-3 text-black">Food & Restaurant</h5>
                                <p className="text-body mb-0">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                            </Link>
                        </div>

                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                            <a className="service-item  btn border-0 py-md-3 px-md-5 me-3 animated slideInLeft relative z-[2] text-white bg-white overflow-hidden font-bold tracking-wide uppercase transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white hover:after:w-full hover:after:left-0 px-3text-decoration-none rounded" href="">
                                <div class="service-icon bg-transparent border rounded p-1">
                                    <div class="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                                        <i class="fa fa-dumbbell fa-2x text-primary"></i>
                                    </div>
                                </div>
                                <h5 class="mb-3 text-black">GYM & Yoga</h5>
                                <p class="text-body mb-0">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- Service End --> */}
           
        </div>
    )
}