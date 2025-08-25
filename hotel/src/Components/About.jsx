import { useEffect, useState } from 'react';
import about1 from '../assets/images/about-1.jpg'
import about2 from '../assets/images/about-2.jpg'
import about3 from '../assets/images/about-3.jpg'
import about4 from '../assets/images/about-4.jpg'
import axios from 'axios';

export default function About() {
  const [roomCount, setRoomCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Rooms Count
    axios.get("http://localhost:4001/mywork/count", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setRoomCount(res.data.totalRooms))
      .catch(err => console.error("Error fetching room count:", err));

    // ✅ Staff Count
    axios.get("http://localhost:4001/mywork/staffcount", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setStaffCount(res.data.totalStaff))
      .catch(err => console.error("Error fetching staff count:", err));

    // ✅ User Count
    axios.get("http://localhost:4001/mywork/usercount", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUserCount(res.data.totalUsers))
      .catch(err => console.error("Error fetching user count:", err));

  }, []);

  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h6 className="section-title text-start text-primary text-uppercase">About Us</h6>
              <h1 className="mb-4">Welcome to <span className="text-primary text-uppercase">LuxuryStay</span></h1>
              <p className="mb-4">
                Welcome to our Hotel Management System – a modern and user-friendly platform designed to make hotel booking and management easier than ever. From seamless reservations to smooth check-in and check-out, we provide guests with a stress-free experience.
              </p>
              <div className="row g-3 pb-4">
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        {roomCount}
                      </h2>
                      <p className="mb-0">Rooms</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.3s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-users-cog fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        {staffCount}
                      </h2>
                      <p className="mb-0">Staffs</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.5s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-users fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        {userCount}
                      </h2>
                      <p className="mb-0">Clients</p>
                    </div>
                  </div>
                </div>
              </div>
              <a className="btn border-0 btn-primary py-3 px-5 mt-2 btn border-0 btn-primary py-md-3 px-md-5 me-3 animated slideInLeft relative z-[2] text-white overflow-hidden font-bold tracking-wide uppercase transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-[#1351d8] to-[#9c00ff] after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-purple-800 after:-z-1 after:transition-all hover:text-white hover:after:w-full hover:after:left-0 px-3 after:duration-350 after:delay-150" href="">
                Explore More
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.1s" src={about1} style={{ marginTop: '25%' }} />
                </div>
                <div className="col-6 text-start">
                  <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.3s" src={about2} />
                </div>
                <div className="col-6 text-end">
                  <img className="img-fluid rounded w-50 wow zoomIn" data-wow-delay="0.5s" src={about3} />
                </div>
                <div className="col-6 text-start">
                  <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.7s" src={about4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}
