import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { openCart } from "../../redux/cart/cartSlice";
import { openWishList } from "../../redux/wishlist/wishListSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";
import { logoutUser } from "../../redux/auth/authThunk";
import api from "../../api/axios";
const Navbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    dispatch(logout());
    navigate("/");
  };
  const handleSearch = (e) => {
    e.preventDefault();

    navigate(search.trim() ? `/books?search=${search}` : "/books");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top shadow-sm">
        {" "}
        <div className="container-fluid">
          <Link to={"/home"} className="navbar-brand" href="#">
            Bookloom
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between ms-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-list navbar-nav gap-3 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link active" href="">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/books"} className="nav-link" href="#">
                  Books
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/about"} className="nav-link" href="#">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/contact"} className="nav-link" href="#">
                  Contact
                </Link>
              </li>
            </ul>

            <form className="search-container" onSubmit={handleSearch}>
              <input
                className="form-control border-0 shadow-none search-input"
                type="search"
                placeholder="Search For Books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="search-icon-btn border-0 bg-transparent"
                type="submit"
              >
                <img src="search.svg" alt="search" style={{ width: "24px" }} />
              </button>
            </form>

            <ul className="navbar-nav gap-3 mb-2 mb-lg-0 align-items-center d-none d-lg-flex">
              {" "}
              <li className="nav-item position-relative d-inline-block">
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent "
                  onClick={() => {
                    console.log("wishlist clicked");
                    dispatch(openWishList());
                  }}
                  aria-label="Open cart"
                >
                  <img
                    src="heart.svg"
                    alt=""
                    className=""
                    style={{ width: "35px" }}
                  />
                </button>
                {wishlistItems.length > 0 && (
                  <span class="badge badge-light bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                    {wishlistItems.length}
                  </span>
                )}
              </li>
              <li className="nav-item position-relative d-inline-block">
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() => dispatch(openCart())}
                  aria-label="Open cart"
                >
                  <img
                    src="cartplus.svg"
                    alt=""
                    className=""
                    style={{ width: "35px" }}
                  />
                </button>
                {cartItems.length > 0 && (
                  <span class="badge badge-light bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                    {cartItems.length}
                  </span>
                )}
              </li>
              <li className="nav-item position-relative">
                {" "}
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="Open profile menu"
                >
                  <img
                    src="userIcon.svg"
                    alt=""
                    className=""
                    style={{ width: "35px" }}
                  />
                </button>
                {dropdownOpen && (
                  <div
                    className="position-absolute end-0 mt-2 shadow rounded p-2 border d-flex flex-column"
                    style={{
                      backgroundColor: "var(--surface-color)",
                      borderColor: "var(--border-color)",
                      minWidth: "220px",
                      zIndex: 1050,
                    }}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {/* Header Section */}
                    <div className="px-4 py-2 border-bottom border-light mb-2">
                      <p className="m-0  fw-bold text-uppercase fs-7 tracking-wider">
                        Account Settings
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="d-flex align-items-center text-black px-4 py-3 fs-6 text-decoration-none custom-dropdown-link fw-medium"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="d-flex align-items-center text-black px-4 py-3 fs-6 text-decoration-none custom-dropdown-link fw-medium"
                    >
                      My Orders
                    </Link>

                    {/* Divider */}
                    <hr className="my-2 text-black-50" />

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-100 text-start px-4 py-3 fs-6  custom-dropdown-logout fw-bold text-uppercase border-0 bg-transparent"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
              <li>
                <div className="relative"></div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mobile-bottom-nav d-flex d-lg-none justify-content-around align-items-center">
        <button
          type="button"
          className="btn p-0 border-0 bg-transparent position-relative "
          onClick={() => {
            console.log("wishlist clicked");
            dispatch(openWishList());
          }}
          aria-label="Open cart"
        >
          <img src="heart.svg" alt="" style={{ width: "30px" }} />
          {wishlistItems.length > 0 && (
            <span class="badge badge-light bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
              {wishlistItems.length}
            </span>
          )}
        </button>
        <button
          type="button"
          className="btn p-0 border-0 bg-transparent position-relative"
          onClick={() => dispatch(openCart())}
          aria-label="Open cart"
        >
          <img src="cartplus.svg" alt="" style={{ width: "30px" }} />
          {cartItems.length > 0 && (
            <span class="badge badge-light bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
              {cartItems.length}
            </span>
          )}
        </button>

        <Link to="/adminprofile" aria-label="Open profile page">
          <img src="userIcon.svg" alt="" style={{ width: "30px" }} />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
