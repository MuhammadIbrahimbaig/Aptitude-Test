import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">

            {/* Sidebar Start */}
            <div className="sidebar pe-4 pb-3">
                <nav className="navbar bg-light navbar-light">
                    <a href="/" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-center text-warning">Hotel <br /> Management</h3>
                    </a>
                    <div className="navbar-nav w-100">
                        <Link to="/" className="nav-item nav-link active">
                            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                        </Link>

                        <div className="nav-item dropdown">
                            <Link href="/room" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <i class="fa-solid fa-bed"></i>Rooms
                            </Link>
                            <div className="dropdown-menu bg-transparent border-0">
                                <a href="#" className="dropdown-item px-5 py-1">Create</a>
                                <a href="#" className="dropdown-item px-5 py-1">All Rooms</a>
                            </div>

                        </div>

                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <i className="far fa-file-alt me-2"></i>Pages
                            </a>
                            <div className="dropdown-menu bg-transparent border-0">
                                <a href="/login" className="dropdown-item">Login</a>
                                <a href="/signup" className="dropdown-item">Sign Up</a>
                                <a href="/profile" className="dropdown-item">Profile</a>
                                <a href="#" className="dropdown-item">Blank Page</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Sidebar End */}

            {/* Content Start */}
            <div className="content">
                <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                    <a href="/" className="navbar-brand d-flex d-lg-none me-4">
                        <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                    </a>
                    <a href="#" className="sidebar-toggler flex-shrink-0">
                        <i className="fa fa-bars"></i>
                    </a>
                    <form className="d-none d-md-flex ms-4">
                        <input className="form-control border-0" type="search" placeholder="Search" />
                    </form>

                    <div className="navbar-nav align-items-center ms-auto">

                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <i className="fa fa-envelope me-lg-2"></i>
                                <span className="d-none d-lg-inline-flex">Message</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                                <a href="#" className="dropdown-item text-center">No new messages</a>
                            </div>
                        </div>

                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <i className="fa fa-bell me-lg-2"></i>
                                <span className="d-none d-lg-inline-flex">Notifications</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                                <a href="#" className="dropdown-item">Profile updated</a>
                                <a href="#" className="dropdown-item">New user added</a>
                                <a href="#" className="dropdown-item">Password changed</a>
                                <a href="#" className="dropdown-item text-center">See all notifications</a>
                            </div>
                        </div>

                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <span className="d-none d-lg-inline-flex"><i className="fa fa-user" aria-hidden="true"></i> John Doe</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end bg-light">
                                <a href="/profile" className="dropdown-item">Edit Profile</a>
                                <a href="#" className="dropdown-item">Settings</a>
                                <a href="/logout" className="dropdown-item">Log Out</a>
                            </div>
                        </div>

                    </div>
                </nav>
            </div>
            {/* Content End */}

        </div>
    );
}
