import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Cart from "../components/home/Cart";
import Wishlist from "../components/home/WishList";

const MainLayout = () => {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isWishListOpen = useSelector((state) => state.wishlist.isWishListOpen);

  return (
    <>
      <Navbar />
      <div className="main-content-offset">
        <Outlet />
        <Footer />
      </div>
      {isCartOpen && <Cart />}
      {console.log(">>>>>>>>>>>>>>>", isWishListOpen)}
      {isWishListOpen && <Wishlist />}
    </>
  );
};

export default MainLayout;
