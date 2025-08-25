import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Footer() {
    return (
        <div>
            <div className="newsletter mt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="row justify-content-center">
                    <div className="col-lg-10 border rounded p-1">
                        <div className="border rounded text-center p-1">
                            <div className="bg-white rounded text-center p-5">
                                <h4 className="mb-4">
                                    Subscribe Our <span className="text-primary text-uppercase">Newsletter</span>
                                </h4>
                                <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                                    <input
                                        className="form-control w-100 py-3 ps-4 pe-5"
                                        type="text"
                                        placeholder="Enter your email"
                                    />
                                    <button
                                        type="button"
                                        className="btn border-0 btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">

                <div className=" bg-footer text-light footer wow fadeIn" data-wow-delay="0.1s">
                    <div className="container pb-5">
                        <div className="row g-5">
                            <div className="col-md-6 col-lg-4">
                                <div className="rounded p-4" >
                                    <Link
                                        to="/home"
                                        className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
                                    >
                                        <img
                                            src={logo}
                                            alt="Hotel Logo"
                                            className="object-fit-cover"
                                            style={{ height: "120px", width: "280px" }}
                                        />
                                    </Link>
                                    <p className="text-white mb-0">
                                       Welcome to our Hotel Management System – a modern and user-friendly platform designed to make hotel booking and management easier than ever.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <h6 className="section-title text-start font-medium text-white text-[19px] text-uppercase mb-4">Contact</h6>
                                <p className="mb-2">
                                    <i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA
                                </p>
                                <p className="mb-2">
                                    <i className="fa fa-phone-alt me-3"></i>+012 345 67890
                                </p>
                                <p className="mb-2">
                                    <i className="fa fa-envelope me-3"></i>info@example.com
                                </p>
                                <div className="d-flex pt-2">
                                    <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-youtube"></i></a>
                                    <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-12">
                                <div className="row gy-5 g-4">
                                    <div className="row">
                                        {/* Usefull Links */}
                                        <div className="col-md-6">
                                            <h6 className="section-title text-start font-medium text-white text-[19px] text-uppercase mb-4">
                                                Usefull Links
                                            </h6>
                                            <Link to="/about" className="btn btn-link text-decoration-none text-white">About Us</Link>
                                            <Link to="/contact" className="btn btn-link text-decoration-none text-white">Contact Us</Link>
                                            <Link to="/service" className="btn btn-link text-decoration-none text-white">Service</Link>

                                        </div>

                                        {/* Services */}
                                        <div className="col-md-6">
                                            <h6 className="section-title text-start font-medium text-white text-[19px] text-uppercase mb-4">
                                                Services
                                            </h6>
                                            <Link to="/services/food" className="btn btn-link text-decoration-none text-white">Food & Restaurant</Link>
                                            <Link to="/services/spa" className="btn btn-link text-decoration-none text-white">Spa & Fitness</Link>
                                            <Link to="/services/sports" className="btn btn-link text-decoration-none text-white">Sports & Gaming</Link>
                                            <Link to="/services/events" className="btn btn-link text-decoration-none text-white">Event & Party</Link>
                                            <Link to="/services/gym" className="btn btn-link text-decoration-none text-white">GYM & Yoga</Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="copyright">
                            <div className="row">
                                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                    &copy; <a className=" border-bottom text-decoration-none" href="#">LuxaryStay</a>, All Right Reserved.
                                </div>
                                <div className="col-md-6 text-center text-md-end">
                                    <div className="footer-menu">
                                        <a href="#" className="text-decoration-none text-white">Home</a>
                                        <a href="#" className="text-decoration-none text-white">Cookies</a>
                                        <a href="#" className="text-decoration-none text-white">Help</a>
                                        <a href="#" className="text-decoration-none text-white">FQAs</a>
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