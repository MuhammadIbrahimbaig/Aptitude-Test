import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// Template CSS IMPORT
import './assets/css/main_styles.css';
import './assets/css/responsive.css';

//END Template CSS IMPORT
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components'
import Layout from './Components/layout'
import About from './Components/About'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
