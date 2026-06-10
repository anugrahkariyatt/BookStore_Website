import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ SideBarOpen, closeSidebar }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="bg-dark text-white d-none d-lg-flex flex-column"
        style={{
          width: "250px",
          minHeight: "100vh",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className="bg-dark text-white d-lg-none"
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1050,
          transform: SideBarOpen
            ? "translateX(0)"
            : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <SidebarContent closeSidebar={closeSidebar} />
      </aside>
    </>
  );
};

const SidebarContent = ({ closeSidebar }) => {
  return (
    <div className="d-flex flex-column h-100">

      {/* Logo */}
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-0">BookStore</h4>
          <small>Admin Panel</small>
        </div>

        <button
          className="btn btn-sm btn-outline-light d-lg-none"
          onClick={closeSidebar}
        >
          ✕
        </button>
      </div>

      {/* Menu */}
      <ul className="list-unstyled mt-3">

        <li>
          <Link
            className="text-decoration-none text-white d-block p-3"
            to="/dashboard"
            onClick={closeSidebar}
          >
          Dashboard
          </Link>
        </li>

        <li>
          <Link
            className="text-decoration-none text-white d-block p-3"
            to="/adminbook"
            onClick={closeSidebar}
          >
            Books
          </Link>
        </li>

        <li>
          <Link
            className="text-decoration-none text-white d-block p-3"
            to="/admincategories"
            onClick={closeSidebar}
          >
            Categories
          </Link>
        </li>

        <li>
          <Link
            className="text-decoration-none text-white d-block p-3"
            to="/adminorders"
            onClick={closeSidebar}
          >
            Orders
          </Link>
        </li>

        <li>
          <Link
            className="text-decoration-none text-white d-block p-3"
            to="/users"
            onClick={closeSidebar}
          >
            Users
          </Link>
        </li>

        <li>
          <Link
            className="text-decoration-none text-white d-block p-3"
            to="/adminprofile"
            onClick={closeSidebar}
          >
             Profile
          </Link>
        </li>

      </ul>

      {/* Logout */}
      <div className="mt-auto border-top p-3">
         Logout
      </div>

    </div>
  );
};

export default SideBar;