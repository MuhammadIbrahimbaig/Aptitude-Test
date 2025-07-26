import { StrictMode, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// Template CSS IMPORT
import './assets/css/style.css';
import './assets/css/bootstrap.min.css';
import './assets/js/main.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components'
import Layout from './Components/layout'
import About from './Components/About'


function App() {

  return (
    <div>
      <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>

      </StrictMode>
    </div>
  )
}

export default App
