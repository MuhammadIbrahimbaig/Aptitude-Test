import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className=" bg-dark px-0">
            <div className="row gx-0">
                <div className="col-lg-3 bg-footer d-none d-lg-block">
                    <a href="index.html" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                        <h1 className="m-0 text-light text-uppercase">LuxuryStay</h1>
                    </a>
                </div>
                <div className="col-lg-9">
                    <div className="row gx-0 bg-footer text-white d-none d-lg-flex">
                        <div className="col-lg-7 px-5 text-start">
                            <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                <i className="fa fa-envelope text-white me-2"></i>
                                <p className="mb-0">info@example.com</p>
                            </div>
                            <div className="h-100 d-inline-flex align-items-center py-2">
                                <i className="fa fa-phone-alt text-white me-2"></i>
                                <p className="mb-0">+012 345 6789</p>
                            </div>
                        </div>
                        <div className="col-lg-5 px-5 text-end">
                            <div className="d-inline-flex align-items-center py-2 text-white">
                                <Link to="/create" className="me-3"><i className="text-white fab fa-facebook-f"></i></Link>
                                <a className="me-3" href="#"><i className="text-white fab fa-twitter"></i></a>
                                <a className="me-3" href="#"><i className="text-white fab fa-linkedin-in"></i></a>
                                <a className="me-3" href="#"><i className="text-white fab fa-instagram"></i></a>
                                <a href="#"><i className="text-white fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                 <nav className="bg-white text-white ps-4">
  <div className="flex items-center justify-between ">
    {/* Left Nav Items */}
    <div className="flex items-center gap-8 py-0">
      <Link to="/home" className="text-black hover:text-blue-800 text-[18px]"
  style={{ textDecoration: "none" }}>Home</Link>
      <Link to="/about" className="text-black hover:text-blue-800 text-[18px]"
  style={{ textDecoration: "none" }}>About</Link>
      <Link to="/service" className="text-black hover:text-blue-800 text-[18px]"
  style={{ textDecoration: "none" }}>Services</Link>
      <Link to="/room" className="text-black hover:text-blue-800 text-[18px]"
  style={{ textDecoration: "none" }}>Rooms</Link>
      <Link to="/testimonal" className="text-black hover:text-blue-800 text-[18px]"
  style={{ textDecoration: "none" }}>Testimonial</Link>
<Link 
  to="/contact" 
  className="text-black hover:text-blue-800 text-[18px]"
  style={{ textDecoration: "none" }}
>
  Contact
</Link>


      {/* Dropdown */}
{/* Dropdown */}
<div className="nav-item dropdown">
  <a
    href="#"
    className="nav-link text-black dropdown-toggle"
    id="accountDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Account
  </a>

  <ul className="dropdown-menu" aria-labelledby="accountDropdown">
    {!isLoggedIn ? (
      <>
        <li>
          <Link to="/registration" className="dropdown-item">
            Signup
          </Link>
        </li>
        <li>
          <Link to="/login" className="dropdown-item">
            Login
          </Link>
        </li>
      </>
    ) : (
      <li>
        <button className="dropdown-item" onClick={handleLogout}>
          Logout
        </button>
      </li>
    )}
  </ul>
</div>

    </div>

    {/* Right Services Button */}
    <a
      href="https://htmlcodex.com/hotel-html-template-pro"
      className="bg-blue-600 text-white py-4 text-[18px] px-8 bg-footer  transition no-underline"
      style={{ textDecoration: "none" }}
    >
      Services <i className="fa fa-arrow-right ml-3"></i>
    </a>
  </div>
</nav>

                </div>
            </div>
        </div>
    );
}
