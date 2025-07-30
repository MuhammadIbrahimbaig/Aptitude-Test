import { Outlet } from "react-router-dom";
import Header from "./Partials/Header";
import Footer from "./Partials/Footer";


export default function Layout() {
    
     return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1 w-100">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}