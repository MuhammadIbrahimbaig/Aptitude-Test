import { Outlet } from "react-router-dom";
import Header from "./Partials/Header";
import Navtop from "./Partials/Nav";

export default function Layout() {
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar (Header component as your sidebar) */}
      <Header />

      {/* Main content area */}
      <main className="flex-grow-1 w-100">
        <Navtop/>
        <Outlet />
      </main>
    </div>
  );
}
