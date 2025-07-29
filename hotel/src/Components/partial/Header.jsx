import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
export default function Header() {
    return (
        <div className="container bg-dark px-0">
            <div className="row gx-0">
                <div className="col-lg-3 bg-dark d-none d-lg-block">
                    <a href="index.html" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                        <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
                    </a>
                </div>
                <div className="col-lg-9">
                    <div className="row gx-0 bg-white d-none d-lg-flex">
                        <div className="col-lg-7 px-5 text-start">
                            <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                <i className="fa fa-envelope text-primary me-2"></i>
                                <p className="mb-0">info@example.com</p>
                            </div>
                            <div className="h-100 d-inline-flex align-items-center py-2">
                                <i className="fa fa-phone-alt text-primary me-2"></i>
                                <p className="mb-0">+012 345 6789</p>
                            </div>
                        </div>
                        <div className="col-lg-5 px-5 text-end">
                            <div className="d-inline-flex align-items-center py-2">
                                <Link to="/create" className="me-3"><i className="text-primary fab fa-facebook-f"></i></Link>
                                <a className="me-3" href="#"><i className="text-primary fab fa-twitter"></i></a>
                                <a className="me-3" href="#"><i className="text-primary fab fa-linkedin-in"></i></a>
                                <a className="me-3" href="#"><i className="text-primary fab fa-instagram"></i></a>
                                <a href="#"><i className="text-primary fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                        <a href="index.html" className="navbar-brand d-block d-lg-none">
                            <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <Link to="/home" className="nav-item nav-link active">Home</Link>
                                <Link to="/about" className="nav-item nav-link">About</Link>
                                <Link to="/service" className="nav-item nav-link">Services</Link>
                                <Link to="/room" className="nav-item nav-link">Rooms</Link>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <Link to="/booking" className="dropdown-item">Booking</Link>
                                        <a href="/team.html" className="dropdown-item">Our Team</a>
                                        <Link to="/testimonal" className="dropdown-item">Testimonial</Link>
                                    </div>
                                </div>
                                <Link to="/contact" className="nav-item nav-link">Contact</Link>
                                <div className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Account</a>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <Link to="/registration" className="dropdown-item">Signup</Link>
                                        <Link to="/login" className="dropdown-item">Login</Link>
                                    </div>
                                </div>



                            </div>
                            <a href="https://htmlcodex.com/hotel-html-template-pro" className="border-0 btn btn-primary rounded-0 py-4 px-md-5 d-none d-lg-block">
                                Services<i className="fa fa-arrow-right ms-3"></i>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
