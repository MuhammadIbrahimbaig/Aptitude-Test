import Header from '../Components/partial/Header';
import Footer from '../Components/partial/Footer';
import { Outlet } from 'react-router-dom';
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
