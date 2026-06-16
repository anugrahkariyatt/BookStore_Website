import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Cart from "../components/home/Cart";
import Wishlist from "../components/home/WishList";
import { fetchCart } from "../redux/cart/cartThunk";

const MainLayout = () => {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isWishListOpen = useSelector((state) => state.wishlist.isWishListOpen);
  const dispatch = useDispatch();
  dispatch(fetchCart());

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
