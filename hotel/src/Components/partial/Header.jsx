import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // 🔹 Edit modal state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    setIsLoggedIn(!!token);
    if (name) setUserName(name);
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    setUserEmail("");
    setIsModalOpen(false);
    navigate("/login");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 🔹 Edit button click
  const handleEditClick = () => {
    setEditName(userName);
    setEditEmail(userEmail);
    setIsEditOpen(true);
  };

  // 🔹 Save changes
  const handleSaveChanges = () => {
    setUserName(editName);
    setUserEmail(editEmail);
    localStorage.setItem("name", editName);
    localStorage.setItem("email", editEmail);
    setIsEditOpen(false);
  };

  return (
    <div className="bg-dark px-0">
      <div className="row gx-0">
        {/* Left Logo */}
        <div className="col-lg-3 bg-footer d-none d-lg-block">
          <a
            href="index.html"
            className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
          >
            <h1 className="m-0 text-light text-uppercase">LuxuryStay</h1>
          </a>
        </div>

        {/* Top Bar */}
        <div className="col-lg-9">
          <div
            className="row gx-0 bg-white border-b-1 border-gray-300 text-dark d-none d-lg-flex align-items-center"
            style={{ height: "45px" }}
          >
            {/* Left Contact */}
            <div className="col-lg-7 px-4 text-start d-flex align-items-center">
              <i className="fab fa-facebook-f text-primary me-2"></i>
              <i className="fab fa-twitter text-primary me-2"></i>
              <i className="fab fa-instagram text-primary me-2"></i>
              <i className="fa fa-phone-alt text-primary me-2"></i>
            </div>

            {/* Right User Info */}
            <div className="col-lg-5 px-5 text-end d-flex justify-content-end align-items-center">
              {isLoggedIn && (
                <div
                  className="d-flex align-items-center cursor-pointer"
                  onClick={toggleModal}
                >
                  <div
                    className="rounded-circle bg-blue-600 text-white flex items-center justify-center me-2"
                    style={{
                      width: "35px",
                      height: "35px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-400 text-italic">
                    <i>{userName}</i>
                  </span>
                </div>
              )}
            </div>

            {/* User Info Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-[30%] relative shadow-lg">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    User Info
                  </h2>

                  {/* Avatar */}
                  {isLoggedIn && (
                    <div className="d-flex align-items-center justify-center">
                      <div
                        className="rounded-circle bg-blue-600 text-white flex items-center justify-center"
                        style={{
                          width: "65px",
                          height: "65px",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}

                  <div className="text-secondary mt-3 text-[19px] font-medium text-center italic">
                    {userEmail}
                  </div>

                  {/* Info */}
                  <div className="shadow-lg p-3 rounded-4 mt-3 text-center">
                    <div className="">
                      <p className="mt-2">Name: {userName}</p>
                      
                    </div>
                    <p className="mt-2">Email: {userEmail}</p>
                  </div>
                  <div className="d-flex justify-content-center mt-4 ">
                    <button
                        className=" w-100 btn btn-success"
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                  </div>

                  {/* Logout */}
                  <button
                    className="mt-4 px-4 py-2 btn btn-danger text-white rounded w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    onClick={toggleModal}
                  >
                    ✖
                  </button>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {isEditOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-[30%] relative shadow-lg">
                  <h2 className="text-lg font-bold mb-4 text-center">
                    Edit Info
                  </h2>

                  <div className="mb-3">
                    <label className="block text-left text-gray-700">Name</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-left text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border px-3 py-2 rounded"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </div>

                  <button
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded w-full"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>

                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    onClick={() => setIsEditOpen(false)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Bar */}
          <nav className="bg-white text-white ps-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8 py-0">
                <Link
                  to="/home"
                  className="text-black font-medium hover:text-blue-800 text-[18px]"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-black font-medium hover:text-blue-800 text-[18px]"
                  style={{ textDecoration: "none" }}
                >
                  About
                </Link>
                <Link
                  to="/service"
                  className="text-black font-medium hover:text-blue-800 text-[18px]"
                  style={{ textDecoration: "none" }}
                >
                  Services
                </Link>
                <Link
                  to="/room"
                  className="text-black font-medium hover:text-blue-800 text-[18px]"
                  style={{ textDecoration: "none" }}
                >
                  Rooms
                </Link>
                <Link
                  to="/testimonal"
                  className="text-black font-medium hover:text-blue-800 text-[18px]"
                  style={{ textDecoration: "none" }}
                >
                  Testimonial
                </Link>
                <Link
                  to="/contact"
                  className="text-black font-medium hover:text-blue-800 text-[18px]"
                  style={{ textDecoration: "none" }}
                >
                  Contact
                </Link>

                {/* Account Dropdown */}
                <div className="nav-item dropdown font-medium">
                  <a
                    href="#"
                    className="nav-link font-medium text-black dropdown-toggle"
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
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <a
                href="https://htmlcodex.com/hotel-html-template-pro"
                className="bg-blue-600 text-white py-4 text-[18px] px-8 bg-footer transition no-underline"
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
