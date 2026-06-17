import { useEffect, useState } from "react";
import api from "../../api/axios";
import { errorToast, successToast } from "../../utils/Toast";
import {
  object,
  string,
  minLength,
  number,
  safeParse,
  pipe,
  title,
} from "valibot";

const bookSchema = pipe(
  object({
    title: pipe(string(), minLength(1, "Title must be atlest 1 Characters")),
    author: pipe(string(), minLength(2, "Name must be at atlest 2 Characters")),
    price: pipe(number()),
    stock: pipe(number()),
    category: pipe(string(),)
  }),
);

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    category: "",
    coverImage: "null",
    description: "",
  });

  const createBook = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      formData.append("description", form.description);

      if (form.coverImage) {
        formData.append("coverImage", form.coverImage);
      }

      const res = await api.post("/books/createBook", formData);

      setBooks((prev) => [...prev, res.data.Book]);
      if (res) {
        successToast("Successfully Added Book");
      } else {
        errorToast("Failed to add book");
      }
      console.log(res.data);

      // close modal
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.Categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async (page = 1) => {
    try {
      const res = await api.get(`/books/getBooks?page=${page}&limit=6`);
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.page);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await api.delete(`/books/${id}`);

      setBooks((prev) => prev.filter((book) => book._id !== id));
      if (res) {
        successToast("Successfully Delete Book");
      } else {
        errorToast("Unable to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);

    setForm({
      title: book.title || "",
      author: book.author || "",
      price: book.price || "",
      stock: book.stock || "",
      category: book.category?._id || "",
      image: book.image || "",
      description: book.description || "",
    });
  };

  const updateBook = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      formData.append("description", form.description);

      if (form.coverImage) {
        formData.append("coverImage", form.coverImage);
      }
      const res = await api.patch(`/books/${selectedBook._id}`, formData);
      console.log("Res", res.data);

      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id ? res.data.Book : book,
        ),
      );
      if (res) {
        successToast("Successfully update the Book");
      } else {
        errorToast("Unable to update the book");
      }
      const modalElement = document.getElementById("editBookModal");

      const modal =
        window.bootstrap.Modal.getInstance(modalElement) ||
        new window.bootstrap.Modal(modalElement);

      modal.hide();

      setSelectedBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Books</h2>
          <p className="text-muted">Manage your bookstore inventory</p>
        </div>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#editBookModal"
          onClick={() => {
            setIsEditMode(false);

            setForm({
              title: "",
              author: "",
              price: "",
              stock: "",
              category: "",
              image: "",
              description: "",
            });
          }}
        >
          + Add Book
        </button>{" "}
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Books Found
                    </td>
                  </tr>
                ) : (
                  books.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.image || "https://via.placeholder.com/60"}
                          alt={item.title}
                          width="60"
                          className="rounded"
                        />
                      </td>

                      <td>{item.title}</td>
                      <td>{item.author}</td>
                      <td>{item.category?.name}</td>
                      <td>₹{item.price}</td>
                      <td>{item.stock}</td>

                      <td>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#editBookModal"
                            onClick={() => {
                              setIsEditMode(true);
                              handleEdit(item);
                            }}
                          >
                            <i className="bi bi-pencil-square"></i>{" "}
                          </button>

                          <button
                            className="btn btn-light btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            data-bs-dismiss="modal"
                            onClick={() => setSelectedBook(item)}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <nav aria-label="Book pagination">
            <ul className="pagination justify-content-center">
              {/* Previous Button */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => fetchBooks(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => fetchBooks(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              {/* Next Button */}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => fetchBooks(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/*  Modal */}
      <div
        className="modal fade"
        id="editBookModal"
        tabIndex="-1"
        aria-labelledby="editBookModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditMode ? "Edit Book" : "Add Book"}
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setSelectedBook(null)}
              />
            </div>

            <div className="modal-body">
              <div className="d-flex flex-column gap-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Author"
                  value={form.author}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      author: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  className="form-control"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      stock: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value,
                    })
                  }
                />
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      coverImage: e.target.files[0],
                    })
                  }
                />

                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                />

                <button
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={isEditMode ? updateBook : createBook}
                >
                  {isEditMode ? "Update Book" : "Add Book"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Book Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "600px" }}
        >
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center pt-0 pb-4 px-4">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <i
                  className="bi bi-trash3-fill text-danger"
                  style={{ fontSize: "2.5rem" }}
                ></i>
              </div>

              <h4 className="fw-bold mb-3">Delete Book?</h4>

              <p className="text-muted mb-4 fs-5">
                Are you sure you want to delete the book <br />
                <strong className="text-dark">"{selectedBook?.title}"</strong>?
                <br />
                This action is permanent and cannot be undone.
              </p>

              <div className="d-flex justify-content-center gap-3 mt-2 px-4">
                <button
                  type="button"
                  className="btn btn-light border py-2 fw-semibold w-50"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-danger py-2 fw-semibold w-50 shadow-sm"
                  onClick={() => deleteBook(selectedBook?._id)}
                  data-bs-dismiss="modal"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
