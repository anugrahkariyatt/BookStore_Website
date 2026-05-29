const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h2 className="fw-bold">BookStore</h2>

            <p className="text-secondary mt-3">
              Discover thousands of books from your favourite authors. Read,
              learn, and grow with us.
            </p>
          </div>

          <div className="col-md-2">
            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <a href="#" className="text-decoration-none text-secondary">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="text-decoration-none text-secondary">
                  Books
                </a>
              </li>

              <li>
                <a href="#" className="text-decoration-none text-secondary">
                  Authors
                </a>
              </li>

              <li>
                <a href="#" className="text-decoration-none text-secondary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Categories</h5>

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li className="text-secondary">Fiction</li>

              <li className="text-secondary">Biography</li>

              <li className="text-secondary">Self-Help</li>

              <li className="text-secondary">Finance</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Newsletter</h5>

            <p className="text-secondary">
              Get updates about new books and offers.
            </p>

            <div className="d-flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
              />

              <button className="btn btn-warning">Join</button>
            </div>
          </div>
        </div>

        <hr className="border-secondary mt-5" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-secondary mb-0">
            © 2026 BookStore. All rights reserved.
          </p>

          <div className="d-flex gap-3 mt-3 mt-md-0">
            <a href="#" className="text-secondary text-decoration-none">
              Instagram
            </a>

            <a href="#" className="text-secondary text-decoration-none">
              Twitter
            </a>

            <a href="#" className="text-secondary text-decoration-none">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
