import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { object, string, minLength, email, safeParse, pipe } from "valibot";
import api from "../api/axios";

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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    console.log("VALID DATA:", formData);
    try {
      const res = await api.post("/login", formData);
      console.log("res dara", res.data);

      navigate("/home");
    } catch (err) {
      console.log("Login failed", err.message);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

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
          <button type="submit" className="btn btn-primary w-100">
            Login
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
