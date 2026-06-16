import { useEffect, useState } from "react";
import api from "../../api/axios";
import { errorToast, successToast } from "../../utils/Toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCat, setSelectedCate] = useState(null);

  const [form, setForm] = useState({
    name: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.Categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async () => {
    try {
      const res = await api.post("/categories/createcategory", form);

      setCategories((prev) => [
        ...prev,
        res.data.category || res.data.Category,
      ]);
      if (res) {
        successToast("Successfully create the Category");
      } else {
        errorToast("Unable to create the Category");
      }

      setForm({ name: "" });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditMode(true);

    setForm({
      name: category.name,
    });
  };

  const updateCategory = async () => {
    try {
      const res = await api.patch("/categories", {
        categoryOldName: selectedCategory.name,
        categoryNewName: form.name,
      });

      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === selectedCategory._id ? res.data.Category : cat,
        ),
      );
      if (res) {
        successToast("Successfully update the Category");
      } else {
        errorToast("Unable to update the Category");
      }

      setSelectedCategory(null);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteCategory = async (id, name) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await api.delete("/categories", {
        data: {
          name: name,
        },
      });
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      if (res) {
        successToast("Successfully delete the Category");
      } else {
        errorToast("Unable to delete the Category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Categories</h2>
          <p className="text-muted">Manage book categories</p>
        </div>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#categoryModal"
          onClick={() => {
            setIsEditMode(false);
            setSelectedCategory(null);
            setForm({
              name: "",
            });
          }}
        >
          + Add Category
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Total Books</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Categories Found
                    </td>
                  </tr>
                ) : (
                  categories.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.bookCount}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-light me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#categoryModal"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="bi bi-pencil-square"></i>{" "}
                        </button>

                        <button
                          className="btn btn-sm btn-light"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          onClick={() => setSelectedCate(item)}
                        >
                          <i className="bi bi-trash3-fill"></i>{" "}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="categoryModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditMode ? "Edit Category" : "Add Category"}
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Category Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={isEditMode ? updateCategory : createCategory}
              >
                {isEditMode ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              Are you sure you want to delete this book?
              <br />
              <strong>{selectedCat?.name}</strong>
              <br />
              This action cannot be undone.
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  deleteCategory(selectedCat?._id, selectedCat?.name)
                }
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
