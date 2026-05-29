import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="main-content-offset">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
