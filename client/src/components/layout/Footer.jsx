import { useState } from "react";
import { Link } from "react-router-dom";
import { successToast, errorToast } from "../../utils/Toast"; 

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();  

    if (!email) {
      errorToast("Please enter a valid email address");
      return;
    }

    

    successToast("Thank you for subscribing to our newsletter!");
    setEmail(""); 
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-md-4">
            <h2 className="fw-bold">BookStore</h2>
            <p className="text-secondary mt-3">
              Discover thousands of books from your favourite authors. Read,
              learn, and grow with us.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-2">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link to="/" className="text-decoration-none text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-decoration-none text-secondary">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-secondary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Categories</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link to="/books" className="text-decoration-none text-secondary">
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-decoration-none text-secondary">
                  Romance
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-decoration-none text-secondary">
                  Fantasy
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-decoration-none text-secondary">
                  Crime
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Newsletter</h5>
            <p className="text-secondary">
              Get updates about new books and offers.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="d-flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="form-control shadow-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-warning fw-medium">
                Join
              </button>
            </form>
          </div>
        </div>

        <hr className="border-secondary mt-5" />

        {/* Bottom Footer Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-secondary mb-0">
            © {new Date().getFullYear()} BookStore. All rights reserved.
          </p>

          <div className="d-flex gap-3 mt-3 mt-md-0">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-secondary text-decoration-none"
            >
              Instagram
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-secondary text-decoration-none"
            >
              Twitter
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-secondary text-decoration-none"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;