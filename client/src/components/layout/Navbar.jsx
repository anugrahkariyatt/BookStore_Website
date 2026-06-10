import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { openCart } from "../../redux/cart/cartSlice";
import { openWishList } from "../../redux/wishlist/wishListSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border fixed-top shadow-sm">
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

            <form className="search-container">
              <input
                className="form-control border-0 shadow-none search-input"
                type="search"
                placeholder="Search For Books..."
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
              <li className="nav-item">
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
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
              </li>
              <li className="nav-item">
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
              </li>
              <li className="nav-item position-relative">
                {" "}
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="Open cart"
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
                    className="position-absolute end-0 mt-2 bg-white shadow rounded p-2 border"
                    style={{
                      minWidth: "220px",
                      zIndex: 1050,
                    }}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                        Account Settings
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-base hover:bg-purple-50 hover:text-[#5e3f9c] font-medium transition-colors"
                    >
                      Edit Profile
                    </Link>

                    <Link
                      to="/change-password"
                      className="flex items-center px-4 py-3 text-base hover:bg-purple-50 hover:text-[#5e3f9c] font-medium transition-colors"
                    >
                      Change Password
                    </Link>

                    <hr className="my-2 border-gray-100" />

                    <button
                      // onClick={Logout}
                      className="w-full text-left px-4 py-3 text-base font-bold text-red-500 hover:bg-red-50 transition-colors uppercase"
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
          className="btn p-0 border-0 bg-transparent"
          onClick={() => {
            console.log("wishlist clicked");
            dispatch(openWishList());
          }}
          aria-label="Open cart"
        >
          <img src="heart.svg" alt="" style={{ width: "30px" }} />
        </button>
        <button
          type="button"
          className="btn p-0 border-0 bg-transparent"
          onClick={() => dispatch(openCart())}
          aria-label="Open cart"
        >
          <img src="cartplus.svg" alt="" style={{ width: "30px" }} />
        </button>

        <img src="userIcon.svg" alt="" style={{ width: "30px" }} />
      </div>
    </>
  );
};

export default Navbar;
