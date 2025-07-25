import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
// Template CSS IMPORT

//END Template CSS IMPORT

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>  
               <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
