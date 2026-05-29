import { Link } from "react-router-dom";

const Navbar = () => {
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
                <a className="nav-link" href="#">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>

            <form className="search-container">
              <input
                className="form-control border-0 shadow-none search-input"
                type="search"
                placeholder="Search For ISBN, Books..."
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
                <a className="nav-link" href="#">
                  <img
                    src="heart.svg"
                    alt=""
                    className=""
                    style={{ width: "35px" }}
                  />
                </a>
              </li>
              <li className="nav-item">
                <img
                  src="cartplus.svg"
                  alt=""
                  className=""
                  style={{ width: "35px" }}
                />
              </li>
              <li className="nav-item">
                <img
                  src="userIcon.svg"
                  alt=""
                  className=""
                  style={{ width: "35px" }}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mobile-bottom-nav d-flex d-lg-none justify-content-around align-items-center">
        <img src="heart.svg" alt="" style={{ width: "30px" }} />

        <img src="cartplus.svg" alt="" style={{ width: "30px" }} />

        <img src="userIcon.svg" alt="" style={{ width: "30px" }} />
      </div>
    </>
  );
};

export default Navbar;
