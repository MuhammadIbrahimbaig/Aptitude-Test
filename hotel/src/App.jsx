import { StrictMode, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// Template CSS IMPORT
import './assets/css/style.css';
import './assets/js/main.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components'
import Layout from './Components/layout'
import About from './Components/About'
import Services from './Components/services.jsx';
import Room from './Components/room.jsx';
import Testimonial from './Components/testimonial.jsx';
import Booking from './Components/booking.jsx';
import Contact from './Components/contact.jsx';
import Registration from './Components/registration.jsx';
import Loginform from './Components/login.jsx';
import VerifyOtp from './Components/Verifyotp.jsx';
import Feedback from './Components/Feedback.jsx';



function App() {

  return (
    <div>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Registration />} />
            <Route path='/login' element={<Loginform />} />
            <Route path="/" element={<Layout />}>
              <Route path='/home' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/service' element={<Services />} />
              <Route path='/testimonal' element={<Testimonial />} />
              <Route path='/room' element={<Room />} />
              <Route path="/booking/:room_id" element={<Booking />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/verify-otp' element={<VerifyOtp />} />
              <Route path='/Feedback' element={<Feedback/>} />


            </Route>
          </Routes>
        </BrowserRouter>

      </StrictMode>
    </div>
  )
}

export default App
