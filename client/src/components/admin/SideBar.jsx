import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";
import { logoutUser } from "../../redux/auth/authThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = ({ SideBarOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    dispatch(logout());
    navigate("/");
  };
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
        <SidebarContent
          closeSidebar={closeSidebar}
          handleLogout={handleLogout}
        />
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
          transform: SideBarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <SidebarContent
          closeSidebar={closeSidebar}
          handleLogout={handleLogout}
        />{" "}
      </aside>
    </>
  );
};

const SidebarContent = ({ closeSidebar, handleLogout }) => {
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
      <div className="mt-auto border-top p-3 bg-black text-light">
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
