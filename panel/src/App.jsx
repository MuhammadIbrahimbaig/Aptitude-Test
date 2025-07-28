import { StrictMode, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// Template CSS IMPORT
import './assets/css/style.css';
import './assets/js/main.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from './Components/layout.jsx';
import Home from './Components/index.jsx';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/' element={<Home />} />
              {/* <Route path='/about' element={<About />} /> */}
           



            </Route>
          </Routes>
        </BrowserRouter>

      </StrictMode>
    </div>
  )
}

export default App
