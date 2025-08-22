import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Retrieve the user role from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserRole(userData.role);  // admin has role: 1, staff has role: 2
    }
  }, []);

  return (
    <div>
      {/* <!-- Sidebar For Lg--> */}
      <ul className="navbar-nav bg-custom sidebar sidebar-dark accordion d-none d-md-block" id="accordionSidebar">

        {/* <!-- Sidebar - Brand --> */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon ">
            <i className="fa-solid fa-hotel"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            Dashboard
          </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider bg-white" />
        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <Link to="/home" className="collapse-item custom-hover-set">
              <span>Dashboard</span>
            </Link>
          </a>
        </li>

        {/* Admin & Staff Common Sidebar Items */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBookings" aria-expanded="false" aria-controls="collapseBookings">
            <i className="fa-solid fa-calendar-check"></i>&nbsp;
            <span>Bookings</span>
          </a>
          <div id="collapseBookings" className="collapse" aria-labelledby="headingBookings">
            <div className="bg-primary text-white collapse-inner rounded">
              <Link to="/Bookings" className="collapse-item custom-hover-set">All</Link>
            </div>
          </div>
        </li>

        {/* Admin-only Sidebar Items */}
        {userRole === 1 && (
          <>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <i className="fa-solid fa-bed"></i>&nbsp;
                <span>Rooms</span>
              </a>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo">
                <div className="bg-custom text-white collapse-inner rounded">
                  <Link to="/createroom" className="collapse-item custom-hover-set">Create</Link>
                  <Link to="/allrooms" className="collapse-item custom-hover-set">All</Link>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <i className="fa-solid fa-user"></i>&nbsp;
                <span>User</span>
              </a>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree">
                <div className="bg-primary text-white collapse-inner rounded">
                  <Link to="/UserFetch" className="collapse-item custom-hover-set">All</Link>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                <i className="fa-solid fa-user"></i>&nbsp;
                <span>Staff</span>
              </a>
              <div id="collapsefour" className="collapse" aria-labelledby="headingfour">
                <div className="bg-primary text-white collapse-inner rounded">
                  <Link to="/StaffCreate" className="collapse-item custom-hover-set">Create</Link>
                  <Link to="/StaffFetch" className="collapse-item custom-hover-set">All</Link>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                <i className="fa-solid fa-user"></i>&nbsp;
                <span>Department</span>
              </a>
              <div id="collapsefive" className="collapse" aria-labelledby="headingfive">
                <div className="bg-primary text-white collapse-inner rounded">
                  <Link to="/departFetch" className="collapse-item custom-hover-set">All</Link>
                </div>
              </div>
            </li>
          </>
        )}

        {/* Staff-only Sidebar Items */}
        {userRole === 2 && (
          <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseStaff" aria-expanded="false" aria-controls="collapseStaff">
              <i className="fa-solid fa-user"></i>&nbsp;
              <span>Staff</span>
            </a>
            <div id="collapseStaff" className="collapse" aria-labelledby="headingStaff">
              <div className="bg-primary text-white collapse-inner rounded">
                <Link to="/StaffCreate" className="collapse-item custom-hover-set">Create</Link>
              </div>
            </div>
          </li>
        )}

      </ul>
    </div>
  );
}
