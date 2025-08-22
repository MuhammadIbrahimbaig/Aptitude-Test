import { Link } from "react-router-dom";

export default function Navtop() {
    return (
        <div>
            {/* Nav for Md */}
            <nav class="navbar navbar-expand-lg bg-body-tertiary d-lg-none bg-custom">
                <div class="container-fluid ">
                    <a class="navbar-brand text-white" href="#">Logo</a>

                    {/* <!-- Toggle button (Hamburger) --> */}
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"><i class="fa-solid fa-bars"></i></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="text-decoration-none list-unstyled py-2 text-white">
                            {/* <!-- Nav Item - Dashboard --> */}
                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Dashboard</span></a>
                            </li>
                            {/* 
                                    <!-- Divider --> */}
                            <li className="nav-item">
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    <i class="fa-solid fa-bed"></i>&nbsp;
                                    <span>Rooms</span>
                                </a>

                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo">
                                    <div className="bg-custom text-white  collapse-inner rounded">
                                        <Link to="/createroom" className="collapse-item  custom-hover-set">Create</Link>
                                        <Link to="/allrooms" className="collapse-item custom-hover-set" >All</Link>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseBookings"
                                    aria-expanded="false"
                                    aria-controls="collapseBookings"
                                >
                                    <i className="fa-solid fa-calendar-check"></i>&nbsp;
                                    <span>Bookings</span>
                                </a>

                                <div id="collapseBookings" className="collapse" aria-labelledby="headingBookings">
                                    <div className="bg-primary text-white collapse-inner rounded">
                                        <Link to="/Bookings" className="collapse-item custom-hover-set">
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
                                    data-bs-target="#collapseThree"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    <i class="fa-solid fa-user"></i>&nbsp;
                                    <span>User</span>
                                </a>

                                <div id="collapseThree" className="collapse" aria-labelledby="headingTwo">
                                    <div className="bg-primary text-white  collapse-inner rounded">

                                        <Link to="/UserFetch" className="collapse-item custom-hover-set" >All</Link>
                                    </div>
                                </div>
                            </li>



                            <li className="nav-item">
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsefour"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    <i class="fa-solid fa-user"></i>&nbsp;
                                    <span>Staff</span>
                                </a>

                                <div id="collapsefour" className="collapse" aria-labelledby="headingTwo">
                                    <div className="bg-primary text-white  collapse-inner rounded">

                                        <Link to="/StaffCreate" className="collapse-item custom-hover-set" >Create</Link>
                                        <Link to="/StaffFetch" className="collapse-item custom-hover-set" >All</Link>
                                    </div>
                                </div>
                            </li>




                            <li className="nav-item">
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsefive"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    <i class="fa-solid fa-user"></i>&nbsp;
                                    <span>Department</span>
                                </a>

                                <div id="collapsefive" className="collapse" aria-labelledby="headingTwo">
                                    <div className="bg-primary text-white  collapse-inner rounded">


                                        <Link to="/departFetch" className="collapse-item custom-hover-set" >All</Link>
                                    </div>
                                </div>
                            </li>




                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}