import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import carousel1 from '..//assets/images/carousel-1.jpg'
const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 w-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
