import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../../redux/cart/cartSlice";
import { openWishList } from "../../redux/wishlist/wishListSlice";
import { useState } from "react";
import { logout } from "../../redux/auth/authSlice";
import { logoutUser } from "../../redux/auth/authThunk";
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
    closeMobileMenu(); // Also close menu on search
  };

  // Helper function to auto-close the mobile menu smoothly
  const closeMobileMenu = () => {
    const collapseMenu = document.getElementById("navbarSupportedContent");
    if (collapseMenu && collapseMenu.classList.contains("show")) {
      const toggler = document.querySelector(".navbar-toggler");
      if (toggler) toggler.click();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top shadow-sm">
        {" "}
        <div className="container-fluid">
          <Link to={"/home"} className="navbar-brand" onClick={closeMobileMenu}>
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* 1. Navigation Links (Left) - Changed from fs-6 to fs-5 to make text bigger */}
            {/* 1. Navigation Links (Left) */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-3 fw-medium fs-5">
              <li className="nav-item">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* 2. Search Bar (Center) */}
            <form
              className="mx-lg-auto my-2 my-lg-0 w-100"
              style={{ maxWidth: "400px" }}
              onSubmit={handleSearch}
            >
              <div className="position-relative w-100">
                <input
                  className="form-control border-0 bg-light rounded-pill shadow-none search-input py-2 ps-4 pe-5 w-100"
                  type="search"
                  placeholder="Search for books..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn border-0 bg-transparent p-0 position-absolute top-50 end-0 translate-middle-y me-3 d-flex align-items-center"
                  type="submit"
                >
                  {/* Search icon scaled down slightly */}
                  <img
                    src="search.svg"
                    alt="search"
                    style={{ width: "25px" }}
                  />
                </button>
              </div>
            </form>

            {/* 3. Action Icons (Right) */}
            <ul className="navbar-nav ms-auto gap-3 d-none d-lg-flex align-items-center">
              {/* Wishlist */}
              <li className="nav-item position-relative d-flex align-items-center">
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() => dispatch(openWishList())}
                >
                  {/* Desktop icons changed from 26px to 24px */}
                  <img
                    src="heart.svg"
                    alt="wishlist"
                    style={{ width: "32px" }}
                  />
                </button>
                {wishlistItems.length > 0 && (
                  <span className="badge badge-light bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                    {wishlistItems.length}
                  </span>
                )}
              </li>

              {/* Cart */}
              <li className="nav-item position-relative d-flex align-items-center">
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() => dispatch(openCart())}
                >
                  <img
                    src="cartplus.svg"
                    alt="cart"
                    style={{ width: "32px" }}
                  />
                </button>
                {cartItems.length > 0 && (
                  <span className="badge badge-light bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                    {cartItems.length}
                  </span>
                )}
              </li>

              {/* Profile Dropdown */}
              <li className="nav-item position-relative d-flex align-items-center">
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src="userIcon.svg"
                    alt="user"
                    style={{ width: "32px" }}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="position-absolute end-0 mt-4 shadow-lg rounded p-2 border d-flex flex-column"
                    style={{
                      backgroundColor: "var(--surface-color, #ffffff)",
                      borderColor: "var(--border-color, #e9ecef)",
                      minWidth: "220px",
                      zIndex: 1050,
                      top: "100%",
                    }}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-bottom mb-2">
                      <p
                        className="m-0 fw-bold text-uppercase fs-7"
                        style={{ letterSpacing: "1px" }}
                      >
                        Account Settings
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="d-flex align-items-center text-dark px-4 py-2 text-decoration-none fw-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="d-flex align-items-center text-dark px-4 py-2 text-decoration-none fw-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Orders
                    </Link>

                    <hr className="my-2" />

                    <button
                      onClick={handleLogout}
                      className="w-100 text-start px-4 py-2 text-danger fw-bold border-0 bg-transparent"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="mobile-bottom-nav d-flex d-lg-none justify-content-around align-items-center">
        <button
          type="button"
          className="btn p-0 border-0 bg-transparent position-relative "
          onClick={() => dispatch(openWishList())}
          aria-label="Open wishlist"
        >
          <img src="heart.svg" alt="" style={{ width: "26px" }} />
          {wishlistItems.length > 0 && (
            <span className="badge badge-light bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
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
          <img src="cartplus.svg" alt="" style={{ width: "26px" }} />
          {cartItems.length > 0 && (
            <span className="badge badge-light bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
              {cartItems.length}
            </span>
          )}
        </button>

        <div className="position-relative">
          <button
            type="button"
            className="btn p-0 border-0 bg-transparent"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Open profile menu"
          >
            <img src="userIcon.svg" alt="" style={{ width: "26px" }} />
          </button>

          {dropdownOpen && (
            <div
              className="position-absolute bottom-100 end-0 mb-3 shadow rounded p-2 border d-flex flex-column"
              style={{
                backgroundColor: "var(--surface-color, #ffffff)",
                borderColor: "var(--border-color)",
                minWidth: "200px",
                zIndex: 1050,
              }}
            >
              <div className="px-3 py-2 border-bottom border-light mb-2">
                <p className="m-0 fw-bold text-uppercase fs-7 tracking-wider">
                  Account
                </p>
              </div>

              <Link
                to="/profile"
                className="d-flex align-items-center text-black px-3 py-2 fs-6 text-decoration-none custom-dropdown-link fw-medium"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/orders"
                className="d-flex align-items-center text-black px-3 py-2 fs-6 text-decoration-none custom-dropdown-link fw-medium"
                onClick={() => setDropdownOpen(false)}
              >
                My Orders
              </Link>

              <hr className="my-2 text-black-50" />

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleLogout();
                }}
                className="w-100 text-start px-3 py-2 fs-6 custom-dropdown-logout fw-bold text-uppercase border-0 bg-transparent"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
