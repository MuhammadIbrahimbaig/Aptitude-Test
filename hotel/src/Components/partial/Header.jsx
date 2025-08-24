{/* Edit Modal functionality added */}
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/images/logo.png";


import Swal from "sweetalert2";


export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Edit modal state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setIsLoggedIn(true);
      fetchCurrentUser(email);
    }
  }, []);

  const fetchCurrentUser = async (email) => {
    if (!email) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4001/Mywork/Userread?email=${email}`);
      const user = Array.isArray(res.data) ? res.data[0] : res.data;
      setUserData(user || null);
      // Prefill edit fields
      if (user) {
        setEditName(user.name);
        setEditEmail(user.email);
      }
    } catch (err) {
      toast.error("Failed to fetch user data", { position: "top-center", theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/login");
  };

  const handleUpdate = async () => {
    if (!userData) return;

    try {
      const res = await axios.put(`http://localhost:4001/Mywork/Userguest/${userData._id}`, {
        name: editName,
        email: editEmail,
      });

      setUserData(res.data.user); // update frontend
      // toast.success("User updated successfully", { position: "top-center", theme: "colored" });
      Swal.fire({
        icon: "success",
        title: "Credential Update Successfully",
        text: "Your Credentials been update successfully!",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        width: 400,
        padding: "2rem"
      });

    } catch (err) {
      // toast.error("Failed to update user", { position: "top-center", theme: "colored" });
      Swal.fire({
        icon: "danger",
        title: "Failed to update user",
        text: "Your Credential error Please Try Again ",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        width: 400,
        padding: "2rem"
      });
    }
  };

  return (
    <div className="bg-dark px-0">
      <ToastContainer />
      <div className="row gx-0">
        {/* Logo */}
        <div className="col-lg-3 bg-footer d-none d-lg-block">
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

        </div>

        {/* Top Bar */}
        <div className="col-lg-9">
          <div className="row gx-0 bg-white border-b-1 border-gray-300 text-dark d-none d-lg-flex align-items-center" style={{ height: "45px" }}>
            <div className="col-lg-7 px-4 text-start d-flex align-items-center">
              <i className="fab fa-facebook-f text-primary me-2"></i>
              <i className="fab fa-twitter text-primary me-2"></i>
              <i className="fab fa-instagram text-primary me-2"></i>
              <i className="fa fa-phone-alt text-primary me-2"></i>
            </div>

            <div className="col-lg-5 px-5 text-end d-flex justify-content-end align-items-center">
              {isLoggedIn && userData && (
                <div className="d-flex align-items-center cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <div
                    className="rounded-circle bg-red-600 text-white flex items-center justify-center me-2"
                    style={{ width: "35px", height: "35px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {userData.name ? userData.name.charAt(0).toUpperCase() : ""}
                  </div>
                  <span className="text-gray-400 text-italic"><i>{userData.name || ""}</i></span>
                </div>
              )}
            </div>

            {/* User Info Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content w-75">
                  <div className="modal-header border-0 text-center w-100 d-flex justify-content-center">
                    <h1 className="modal-title fs-2" id="exampleModalLabel">User Info</h1>
                    <button
                      type="button"
                      className="btn-close position-absolute end-0 me-3"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>

                  </div>


                  {/* Modal Body Center */}
                  <div className="modal-body text-center">
                    {isLoggedIn && userData && (
                      <div className="d-flex align-items-center cursor-pointer justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div
                          className="rounded-circle bg-red-600 text-white fs-2 fw-medium flex items-center justify-center me-2"
                          style={{ width: "70px", height: "70px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          {userData.name ? userData.name.charAt(0).toUpperCase() : ""}
                        </div>
                      </div>

                    )}
                    {loading ? (
                      <p>Loading...</p>
                    ) : userData ? (
                      <>
                        <ul className="list-group mb-3 d-inline-block ">
                          <li className="mt-3"><strong>Name:</strong> {userData.name}</li>
                          <li className="mt-4"><strong>Email:</strong> {userData.email}</li>
                        </ul>
                        <br />
                        <button
                          className="btn btn-primary rounded-1 w-75 mt-3"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal2"
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <p>No user info available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>


            {/* Edit Modal */}
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Data</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Navigation */}
          <nav className="bg-white text-white ps-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8 py-0">
                <Link to="/home" className="text-black font-medium hover:text-blue-800 text-[18px]" style={{ textDecoration: "none" }}>Home</Link>
                <Link to="/about" className="text-black font-medium hover:text-blue-800 text-[18px]" style={{ textDecoration: "none" }}>About</Link>
                <Link to="/service" className="text-black font-medium hover:text-blue-800 text-[18px]" style={{ textDecoration: "none" }}>Services</Link>
                <Link to="/room" className="text-black font-medium hover:text-blue-800 text-[18px]" style={{ textDecoration: "none" }}>Rooms</Link>
                <Link to="/testimonal" className="text-black font-medium hover:text-blue-800 text-[18px]" style={{ textDecoration: "none" }}>Testimonial</Link>
                <Link to="/contact" className="text-black font-medium hover:text-blue-800 text-[18px]" style={{ textDecoration: "none" }}>Contact</Link>
                 <Link to="/Feedback" className="text-black font-medium hover:text-blue-800 text-[18px]" style={{ textDecoration: "none" }}>Feedback</Link>

                <div className="nav-item dropdown font-medium">
                  <a href="#" className="nav-link font-medium text-black dropdown-toggle" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                  <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                    {!isLoggedIn ? (
                      <>
                        <li><Link to="/registration" className="dropdown-item">Signup</Link></li>
                        <li><Link to="/login" className="dropdown-item">Login</Link></li>
                      </>
                    ) : (
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    )}
                  </ul>
                </div>
              </div>

              <a href="https://htmlcodex.com/hotel-html-template-pro" className="bg-blue-600 text-white py-4 text-[18px] px-8 bg-footer transition no-underline " style={{ textDecoration: "none" }}>
                Services <i className="fa fa-arrow-right ml-3"></i>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
