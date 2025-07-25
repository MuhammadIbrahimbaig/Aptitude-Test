export default function Header() {
    return (
        <div>
            <header className="header bg-light shadow-sm">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-between py-3">

                        <a href="#" className="navbar-brand fw-bold">The River</a>

                        <nav className="nav">
                            <ul className="nav nav-pills d-flex gap-3 mb-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Rooms</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                            </ul>
                        </nav>

                        <div className="d-flex align-items-center gap-3">
                            <a href="#" className="btn btn-primary">Book Online</a>

                            <div className="d-flex align-items-center">
                                <img src="images/phone.png" alt="phone" className="me-2" style={{ height: '20px' }} />
                                <span>0183-12345678</span>
                            </div>

                            <button className="btn btn-outline-secondary d-lg-none">
                                <i className="fa fa-bars" aria-hidden="true"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </header>

        </div>
    )
}