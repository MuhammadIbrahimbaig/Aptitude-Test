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
              <i class="fas fa-users"></i>&nbsp;
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
              <i class="fa-regular fa-building"></i>&nbsp;
                <span>Department</span>
              </a>
              <div id="collapsefive" className="collapse" aria-labelledby="headingfive">
                <div className="bg-primary text-white collapse-inner rounded">
                  <Link to="/departFetch" className="collapse-item custom-hover-set">All</Link>
                </div>
              </div>
            </li>

                 <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsesix" aria-expanded="false" aria-controls="collapsesix">
          <i class="fa-solid fa-comments"></i>&nbsp;
                <span>Feedback</span>
              </a>
              <div id="collapsesix" className="collapse" aria-labelledby="headingfive">
                <div className="bg-primary text-white collapse-inner rounded">
                  <Link to="/UserFeedback" className="collapse-item custom-hover-set">All</Link>
                </div>
              </div>
            </li>
          </>
        )}

        {/* Staff-only Sidebar Items */}
       {userRole === 2 && (
  <li className="nav-item">
    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      <i className="fa-solid fa-bed"></i>&nbsp;
      <span>Rooms</span>
    </a>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo">
      <div className="bg-custom text-white collapse-inner rounded">
        <Link to="/allrooms" className="collapse-item custom-hover-set">All</Link>
      </div>
    </div>
  </li>
)}


                <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseContact"
                        aria-expanded="false"
                        aria-controls="collapseContact"
                    >
                        <i className="fa-solid fa-envelope"></i>&nbsp;
                        <span>Contact</span>
                    </a>

                    <div id="collapseContact" className="collapse" aria-labelledby="headingContact">
                        <div className="bg-primary text-white collapse-inner rounded">
                            <Link to="/Contact" className="collapse-item custom-hover-set">
                                All
                            </Link>
                        </div>
                    </div>
                </li>
 <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseService"
                        aria-expanded="false"
                        aria-controls="collapseService"
                    >
                   <i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;
                        <span>Services </span>
                    </a>

                    <div id="collapseService" className="collapse" aria-labelledby="headingContact">
                        <div className="bg-primary text-white collapse-inner rounded">
                            <Link to="/ServiceAdd" className="collapse-item custom-hover-set">
                                Create
                            </Link>
                             <Link to="/ServiceGet" className="collapse-item custom-hover-set">
                                All
                            </Link>
                        </div>
                    </div>
                </li>





            </ul>




        </div>
    )
}
