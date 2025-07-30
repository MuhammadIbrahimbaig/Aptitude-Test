import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // ← Bootstrap CSS here
import 'bootstrap/dist/js/bootstrap.bundle.js'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/layout';
import Index from './Components/Index';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Index />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
