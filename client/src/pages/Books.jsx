import { useEffect, useState } from "react";
import api from "../api/axios";
import Cards from "../components/ui/Cards";
import { useSearchParams } from "react-router-dom";
const Books = () => {
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const search = searchParams.get("search") || "";

  const [filters, setFilters] = useState({
    categories: [],
    authors: [],
    minPrice: "",
    maxPrice: "",
    sort: "",
  });
  const fetchCategoryandAuthor = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.Categories);
    const author = await api.get("/books/authors");
    setAuthors(author.data.authors);
  };

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/books/filter", {
        params: {
          categories: filters.categories.join(","),
          authors: filters.authors.join(","),
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search,
          sort: filters.sort,
        },
      });

      setBook(res.data.books);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };
  const handleAuthorChange = (author) => {
    setFilters((prev) => ({
      ...prev,
      authors: prev.authors.includes(author)
        ? prev.authors.filter((c) => c !== author)
        : [...prev.authors, author],
    }));
  };
  const handlePriceChange = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };
  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/books/all`);
        setBook(res.data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
    fetchCategoryandAuthor();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [filters.sort]);

  useEffect(() => {
    fetchBooks();
  }, [search]);

  if (!book && isLoading) {
    return (
      <div className="container py-5 text-center vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    //div container
    <div
      className="px-2 py-4  vh-100"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-primary)",
      }}
    >
      {/* left side filter */}
      {/* left side filter & mobile sort */}
      <div className="d-lg-none mb-3 d-flex gap-2">
        <button
          className="btn btn-dark w-50"
          style={{ backgroundColor: "var(--primary-color)" }}
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileFilter"
        >
          Filters
        </button>

        <select
          className="form-select w-50"
          value={filters.sort}
          style={{
            backgroundColor: "var(--surface-color)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
          onChange={(e) => {
            setFilters((prev) => ({
              ...prev,
              sort: e.target.value,
            }));
          }}
        >
          <option value="">Sort: Relevance</option>
          <option value="price_asc">Price Low To High</option>
          <option value="price_desc">Price High To Low</option>
          <option value="newest">Newest</option>
          <option value="bestselling">Best Selling</option>
        </select>
      </div>
      <div className="d-flex gap-4 flex-grow-1 align-items-start">
        {" "}
        <div
          className="d-none d-lg-flex flex-lg-column"
          style={{ width: "220px", minWidth: "220px" }}
        >
          <h3 className="fw-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Filter
          </h3>

          {/* Categories Accordion */}
          <div className="accordion-item bg-transparent border-bottom border-top-0 border-start-0 border-end-0 py-2">
            <h2 className="accordion-header" id="headingCategory">
              <button
                className="accordion-button bg-transparent fw-bold fs-5 p-0 shadow-none"
                style={{ color: "var(--text-primary)" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseCategory"
              >
                Category
              </button>
            </h2>
            <div
              id="collapseCategory"
              className="accordion-collapse collapse show"
            >
              <div
                className="accordion-body px-0 pt-3 pb-2 overflow-y-auto"
                style={{ maxHeight: "200px" }}
              >
                {categories.map((item) => (
                  <div className="form-check mb-2" key={item._id}>
                    <input
                      className="form-check-input shadow-none"
                      type="checkbox"
                      id={`category-${item._id}`}
                      onChange={() => handleCategoryChange(item._id)}
                      style={{ borderColor: "var(--border-color)" }}
                    />
                    <label
                      className="form-check-label"
                      style={{ color: "var(--text-secondary)" }}
                      htmlFor={`category-${item._id}`}
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="accordion-item bg-transparent border-bottom border-top-0 border-start-0 border-end-0 py-2">
            <h2 className="accordion-header" id="headingAuthor">
              <button
                className="accordion-button collapsed bg-transparent fw-bold fs-5 p-0 shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseAuthor"
                aria-expanded="false"
                aria-controls="collapseAuthor"
              >
                Author
              </button>
            </h2>
            <div
              id="collapseAuthor"
              className="accordion-collapse collapse"
              aria-labelledby="headingAuthor"
              data-bs-parent="#filterSidebar"
            >
              <div
                className="accordion-body px-0 pt-3 pb-2 overflow-y-auto"
                style={{ maxHeight: "200px" }}
              >
                {authors?.map((author, index) => (
                  <div className="form-check mb-2" key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`author-${index}`}
                      onChange={() => handleAuthorChange(author)}
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor={`author-${index}`}
                    >
                      {author}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="btn text-white fw-medium mb-3"
            style={{ backgroundColor: "var(--primary-color)" }}
            onClick={fetchBooks}
          >
            Apply Filters
          </button>
          {/* <div className="accordion-item bg-transparent border-0 py-2">
            <h2 className="accordion-header" id="headingPrice">
              <button
                className="accordion-button collapsed bg-transparent fw-bold fs-5  p-0 shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePrice"
                aria-expanded="false"
                aria-controls="collapsePrice"
              >
                Price
              </button>
            </h2>
            <div
              id="collapsePrice"
              className="accordion-collapse collapse"
              aria-labelledby="headingPrice"
              data-bs-parent="#filterSidebar"
            >
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agatha"
                  onChange={() => handlePriceChange(0, 599)}
                />
                <label className="form-check-label text-muted" htmlFor="agatha">
                  Below 199
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="stephen"
                />
                <label
                  className="form-check-label text-muted"
                  htmlFor="stephen"
                >
                  200 - 399
                </label>
              </div>
              <div className="form-check mb-0">
                <input className="form-check-input" type="checkbox" id="dan" />
                <label className="form-check-label text-muted" htmlFor="dan">
                  400 - 599
                </label>
              </div>
            </div>
          </div> */}
        </div>
        <div className="flex-grow-1 w-100" style={{ minWidth: 0 }}>
          <div className="d-none d-lg-flex justify-content-between align-items-center mb-4 w-100">
            <button className="btn btn-light px-4 py-2">Books</button>

            <select
              className="form-select"
              style={{ width: "250px" }}
              value={filters.sort}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value,
                }));
              }}
            >
              <option value="">Relevance</option>
              <option value="price_asc">Price Low To High</option>
              <option value="price_desc">Price High To Low</option>
              <option value="newest">Newest</option>
              <option value="bestselling">Best Selling</option>
            </select>
          </div>

          <div
            style={{
              height: "calc(100vh - 120px)",
              overflowY: "auto",
            }}
          >
            {isLoading ? (
              <div className="container py-5 text-center d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
            
              <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-md-start">
                <Cards selectedBooks={book} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileFilter"
      >
        <div className="offcanvas-header">
          <h5>Filters</h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <button
            className="btn btn-dark w-100 mb-3"
            onClick={fetchBooks}
            data-bs-dismiss="offcanvas"
          >
            Apply Filters
          </button>

          <h6>Categories</h6>

          {categories.map((item) => (
            <div className="form-check mb-2" key={item._id}>
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => handleCategoryChange(item._id)}
              />

              <label className="form-check-label">{item.name}</label>
            </div>
          ))}

          <hr />

          <h6>Authors</h6>

          {authors?.map((author, index) => (
            <div className="form-check mb-2" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => handleAuthorChange(author)}
              />

              <label className="form-check-label">{author}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
