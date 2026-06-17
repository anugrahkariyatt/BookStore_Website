import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { object, string, minLength, email, safeParse, pipe } from "valibot";

import { loginUser } from "../redux/auth/authThunk";

const loginSchema = pipe(
  object({
    email: pipe(string(), email("Invalid email address")),
    password: pipe(
      string(),
      minLength(6, "Password must be at least 6 characters"),
    ),
  }),
);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === "admin" ? "/dashboard" : "/home");
    }
  }, [isAuthenticated, user, navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = safeParse(loginSchema, formData);

    if (!result.success) {
      const fieldErrors = {};

      result.issues.forEach((issue) => {
        const fieldName = issue.path?.[0]?.key;

        if (fieldName) {
          fieldErrors[fieldName] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      if (resultAction.payload.user.role === "user") {
        navigate("/home");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label>Email</label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />

          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label>Password</label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />

          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
