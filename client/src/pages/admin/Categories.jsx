import { useEffect, useState } from "react";
import api from "../../api/axios";
import { errorToast, successToast } from "../../utils/Toast";
import { object, string, minLength, pipe, safeParse, trim } from "valibot";

const categorySchema = object({
  name: pipe(
    string(),
    trim(),
    minLength(3, "Category name must be at least 3 characters")
  ),
});

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCat, setSelectedCate] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const result = safeParse(categorySchema, form);
    if (!result.success) {
      const fieldErrors = {};
      result.issues.forEach((issue) => {
        const fieldName = issue.path?.[0]?.key;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const createCategory = async () => {
    if (!validateForm()) return;

    try {
      const res = await api.post("/categories/createcategory", form);

      setCategories((prev) => [
        ...prev,
        res.data.category || res.data.Category,
      ]);
      
      document.querySelector("#categoryModal .btn-close")?.click();
      successToast("Successfully created the Category");
      setForm({ name: "" });
      
    } catch (error) {
      console.error("Error creating category:", error);
      errorToast(error.response?.data?.error || "Unable to create the Category");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    setErrors({});
    setForm({
      name: category.name,
    });
  };

  const updateCategory = async () => {
    if (!validateForm()) return;

    if (!selectedCategory) {
      errorToast("No category selected");
      return;
    }

    try {
      const res = await api.patch(`/categories/${selectedCategory._id}`, {
        categoryNewName: form.name,
      });

      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === selectedCategory._id ? { ...cat, name: form.name } : cat
        )
      );

      document.querySelector("#categoryModal .btn-close")?.click();
      successToast("Successfully updated the Category");
      setSelectedCategory(null);
      
    } catch (error) {
      console.error(error);
      errorToast(error.response?.data?.error || "Unable to update the Category");
    }
  };

  const deleteCategory = async (id, name) => {
    try {
      await api.delete("/categories", {
        data: { name: name },
      });

      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      successToast("Successfully deleted the Category");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDeleteError(error.response.data.error);
        document.getElementById("triggerErrorModal").click();
      } else {
        errorToast("Unable to delete the Category");
        console.error("Error deleting category:", error);
      }
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
            setErrors({}); 
            setForm({ name: "" });
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
                      <td>{item.bookCount || 0}</td>

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

      {/* Add/Edit Category Modal */}
      <div className="modal fade" id="categoryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditMode ? "Edit Category" : "Add Category"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body">
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Category Name"
                name="name"
                value={form.name}
                onChange={(e) => {
                  setForm({ name: e.target.value });
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: null }));
                  }
                }}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={isEditMode ? updateCategory : createCategory}
              >
                {isEditMode ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "600px" }}>
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center pt-0 pb-4 px-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mb-3" style={{ width: "80px", height: "80px" }}>
                <i className="bi bi-trash3-fill text-danger" style={{ fontSize: "2.5rem" }}></i>
              </div>
              <h4 className="fw-bold mb-3">Delete Category?</h4>
              <p className="text-muted mb-4 fs-5">
                You are about to delete the category <strong className="text-dark">"{selectedCat?.name}"</strong>.
                <br />
                This action is permanent and cannot be undone.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-2 px-4">
                <button type="button" className="btn btn-light border py-2 fw-semibold w-50" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger py-2 fw-semibold w-50 shadow-sm"
                  onClick={() => deleteCategory(selectedCat?._id, selectedCat?.name)}
                  data-bs-dismiss="modal"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button id="triggerErrorModal" data-bs-toggle="modal" data-bs-target="#cannotDeleteModal" className="d-none"></button>

      {/* Cannot Delete Error Modal */}
      <div className="modal fade" id="cannotDeleteModal" tabIndex="-1" aria-labelledby="cannotDeleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-danger">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="cannotDeleteModalLabel">Action Denied</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center py-4">
              <i className="bi bi-exclamation-octagon-fill text-danger" style={{ fontSize: "3rem" }}></i>
              <h5 className="mt-3">Cannot Delete Category</h5>
              <p className="text-muted mt-2">
                {deleteError || "You must delete all books in this category before deleting the category itself."}
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;