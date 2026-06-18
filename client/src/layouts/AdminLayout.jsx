import SideBar from "../components/admin/SideBar";
import Navbar from "../components/admin/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {isSideBarOpen && (
        <div
          className="d-lg-none"
          onClick={closeSidebar}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1040,
          }}
        />
      )}

      <SideBar
        SideBarOpen={isSideBarOpen}
        closeSidebar={closeSidebar}
      />

      <div className="flex-grow-1 overflow-auto">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;