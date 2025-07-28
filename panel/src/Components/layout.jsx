
import { Outlet } from 'react-router-dom';
import Header from './partial/header';
import Footer from './partial/footer';
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
