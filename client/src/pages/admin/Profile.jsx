import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { successToast, errorToast } from "../../utils/Toast";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data.user);
        setFormData((prev) => ({
          ...prev,
          name: res.data.user.name,
          email: res.data.user.email,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile/update", {
        name: formData.name,
        email: formData.email,
      });
      successToast("Admin profile updated successfully!");
    } catch (error) {
      errorToast("Failed to update profile");
      console.log(error);
    }
  };

  const handleVerifyPassword = async () => {
    if (!formData.currentPassword)
      return errorToast("Please enter current password");

    setIsVerifying(true);
    try {
      await api.post("/profile/verify-password", {
        currentPassword: formData.currentPassword,
      });
      setIsPasswordVerified(true);
      successToast("Password verified! You can now set a new one.");
    } catch (error) {
      errorToast(error.response?.data?.error || "Incorrect current password");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (formData.password !== formData.confirmPassword) {
      return errorToast("New passwords do not match");
    }

    try {
      await api.put("/profile/update-password", {
        newPassword: formData.password,
      });
      successToast("Admin password changed successfully!");

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }));
      setIsPasswordVerified(false);
    } catch (error) {
      errorToast(error.response?.data?.error || "Failed to update password");
    }
  };

  if (!user) {
    return (
      <div className="container-fluid p-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold">Admin Profile</h2>
        <p className="text-muted">
          Manage your administrator account settings and security
        </p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=111&color=fff&size=80`}
                  alt="admin profile"
                  className="rounded-circle shadow-sm me-3"
                />
                <div>
                  <h4 className="mb-1 fw-bold">{user.name}</h4>
                  <p className="text-muted mb-1">{user.email}</p>
                  <span className="badge bg-dark text-uppercase">
                    {user.role}
                  </span>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold small text-uppercase text-muted">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control bg-light border-0"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control bg-light border-0"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-dark fw-medium">
                  Save General Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Security Settings</h5>

              <div className="mb-4 pb-4 border-bottom">
                <label className="form-label fw-bold small text-uppercase text-muted">
                  Current Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control bg-light border-0"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password to unlock changes"
                    disabled={isPasswordVerified}
                  />
                  <button
                    className={`btn ${isPasswordVerified ? "btn-success" : "btn-dark"}`}
                    type="button"
                    onClick={handleVerifyPassword}
                    disabled={
                      isPasswordVerified ||
                      isVerifying ||
                      !formData.currentPassword
                    }
                  >
                    {isPasswordVerified
                      ? "Verified ✓"
                      : isVerifying
                        ? "..."
                        : "Verify"}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase text-muted">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control bg-light border-0"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New password"
                  disabled={!isPasswordVerified}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase text-muted">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control bg-light border-0"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="confirmPassword"
                  disabled={!isPasswordVerified}
                />
              </div>

              <button
                type="button"
                className="btn btn-dark fw-medium w-100"
                onClick={handleUpdatePassword}
                disabled={
                  !isPasswordVerified ||
                  !formData.password ||
                  !formData.confirmPassword
                }
              >
                Update Admin Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
