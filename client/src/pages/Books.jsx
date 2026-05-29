import { useEffect, useState } from "react";
import api from "../api/axios";
import Cards from "../components/ui/Cards";

const Books = () => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get(`/books/all`);
      setBook(res.data.books);
    };

    fetchBook();
  }, []);

  if (!book) return <div>Loading...</div>;

  return (
    //div container
    <div className="px-5 py-4 bg-light">
      {/* category container */}
      <div className="rounded-4 py-5 px-4 bg-warning">
        <h1 className="text-center fw-bold display-3 mb-5">
          Crime Mystery Thriller
        </h1>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button className="btn btn-outline-dark rounded-pill px-4">
            Crime Mystery Thriller
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            Young Adult Gen Fiction
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            Young Adult Crime Mystery Thriller
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            Young Adult Fantasy
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            Young Adult Romance
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            General And Literary Fiction
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            True Crime
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            Sci-Fi And Fantasy
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            Comics
          </button>

          <button className="btn btn-outline-dark rounded-pill px-4">
            General & Encyclopedia
          </button>
        </div>
      </div>

      {/* left side filter */}
      <div className="d-flex  gap-4 mt-4 align-items-start p-2">
        {" "}
        <div className="d-none d-lg-flex flex-lg-column">
          <h3 className="fw-bold mb-4">Filter</h3>
          <hr />
          {/* filter */}
          <div className=" filter-container  flex-shrink-0">
            {" "}
            <h4 className="fw-bold mb-3">Category</h4>
            <div className="d-flex flex-column gap-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="fiction"
                />
                <label className="form-check-label" htmlFor="fiction">
                  Fiction
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mystery"
                />
                <label className="form-check-label" htmlFor="mystery">
                  Mystery
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="thriller"
                />
                <label className="form-check-label" htmlFor="thriller">
                  Thriller
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="fantasy"
                />
                <label className="form-check-label" htmlFor="fantasy">
                  Fantasy
                </label>
              </div>
            </div>
          </div>
          <hr />
          {/* Author */}
          <div className="mb-4">
            <h4 className="fw-bold mb-3">Author</h4>

            <div className="d-flex flex-column gap-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="author1"
                />
                <label className="form-check-label" htmlFor="author1">
                  Agatha Christie
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="author2"
                />
                <label className="form-check-label" htmlFor="author2">
                  Stephen King
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="author3"
                />
                <label className="form-check-label" htmlFor="author3">
                  Dan Brown
                </label>
              </div>
            </div>
          </div>
          <hr />
          {/* Price */}
          <div className="mb-4">
            <h4 className="fw-bold mb-3">Price</h4>

            <div className="d-flex flex-column gap-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="price1"
                />
                <label className="form-check-label" htmlFor="price1">
                  Under ₹200
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="price2"
                />
                <label className="form-check-label" htmlFor="price2">
                  ₹200 - ₹500
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="price3"
                />
                <label className="form-check-label" htmlFor="price3">
                  Above ₹500
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* books container */}
        <div className="d-flex gap-4  flex-flex-grow-1   align-items-start ">
          {/* Books Content */}
          <div className="flex-grow-1">
            {/* Fixed Header */}
            <div className="d-none d-lg-flex justify-content-between align-items-center mb-4">
              <button className="btn btn-light px-4 py-2">Books</button>

              <select className="form-select" style={{ width: "250px" }}>
                <option>Relevance</option>
                <option>Price Low To High</option>
                <option>Price High To Low</option>
              </select>
            </div>

            {/* Scrollable Cards */}
            <div
              style={{
                height: "calc(100vh - 120px)",
                overflowY: "auto",
              }}
            >
              <div className="d-flex flex-wrap gap-4">
                <Cards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
