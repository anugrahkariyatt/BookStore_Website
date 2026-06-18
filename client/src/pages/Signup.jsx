import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  object,
  string,
  minLength,
  email,
  safeParse,
  forward,
  check,
  pipe,
  trim,
  regex,
} from "valibot";
import api from "../api/axios";
import { successToast, errorToast } from "../utils/Toast";
const signupSchema = pipe(
  object({
    name: pipe(
      string(),
      trim(),
      minLength(3, "Name must be at least 3 characters"),
    ),

    email: pipe(string(), trim(), email("Invalid email address")),

    password: pipe(
      string(),
      trim(),
      minLength(8, "Password must be at least 8 characters"),
      regex(/[A-Z]/, "Must contain at least one uppercase letter"),
      regex(/[0-9]/, "Must contain at least one number"),
      regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    ),

    confirmPassword: pipe(
      string(),
      trim(),
      minLength(8, "Please confirm your password"),
    ),
  }),
  forward(
    check(
      (input) => input.password === input.confirmPassword,
      "Passwords do not match",
    ),
    ["confirmPassword"],
  ),
);

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = safeParse(signupSchema, formData);

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
    setIsLoading(true);
    try {
      await api.post("/signup", formData);
      successToast("Account created successfully! Please login.");
      navigate("/");
    } catch (err) {
      errorToast(
        err.response?.data?.error || "Signup failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">Signup</h2>

        <div className="mb-3">
          <label>Name</label>

          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label>Email</label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label>Password</label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>

          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>

          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={() => navigate("/")}
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
