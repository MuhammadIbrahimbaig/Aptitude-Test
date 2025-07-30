import { Outlet } from "react-router-dom";
import Header from "./Partials/Header";

export default function Layout() {
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar (Header component as your sidebar) */}
      <Header />

      {/* Main content area */}
      <main className="flex-grow-1 p-3 w-100">
        <Outlet />
      </main>
    </div>
  );
}
