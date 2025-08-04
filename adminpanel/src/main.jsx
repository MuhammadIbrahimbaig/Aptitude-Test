import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/assets/css/sb-admin-2.css';
import '../src/assets/js/sb-admin-2.js'
import '../src/assets/js/sb-admin-2.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css';






import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './Components/Index';
import Layout from './Components/Layout';
import LoginForm from './Components/LoginForm.jsx';
import { CreateRoom } from './Components/createroom.jsx';
import RoomRead from './Components/showrooms.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/" element={<Layout />} >
          <Route path='/home' element={<Index />} />
          <Route path='/createroom' element={<CreateRoom/>} />
          <Route path='/allrooms' element={<RoomRead/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
