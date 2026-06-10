import React from "react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-4 py-3 d-lg-none">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn d-lg-none text-black"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <h5 className="mb-0">Admin Dashboard</h5>
      </div>
    </nav>
  );
};

export default Navbar;