import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { successToast, errorToast } from "../../utils/Toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      successToast("Profile updated successfully!");
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
      setTimeout(() => {
        setIsPasswordVerified(true);
        successToast("Password verified! You can now set a new one.");
        setIsVerifying(false);
      }, 1000);
    } catch (error) {
      errorToast(error.response?.data?.error || "Incorrect current password");
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
      successToast("Password changed successfully!");

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
      <div className="container py-5 text-center vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: "calc(100vh - 80px)" }}>
      <h3 className="fw-bold mb-4">My Account</h3>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">
            <div className="card-body">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=120`}
                alt="profile"
                className="rounded-circle shadow-sm mb-3"
              />
              <h4 className="fw-bold mb-1">{user.name}</h4>
              <p className="text-muted mb-3">{user.email}</p>

              

              <hr className="text-muted" />

              <div className="d-grid gap-2 mt-4">
                {user.role === "admin" ? (
                  <button
                    className="btn btn-outline-dark fw-medium"
                    onClick={() => navigate("/dashboard")}
                  >
                    Admin Dashboard
                  </button>
                ) : (
                  <button
                    className="btn btn-dark fw-medium"
                    onClick={() => navigate("/orders")}
                  >
                    View My Orders
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Profile Settings</h5>

              <form onSubmit={handleProfileSubmit}>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label text-muted small text-uppercase fw-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg bg-light border-0 shadow-none"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted small text-uppercase fw-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg bg-light border-0 shadow-none"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-dark px-4 fw-bold">
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Security Settings</h5>

              <div className="row g-4">
                <div className="col-md-5 border-end d-flex flex-column">
                  <label className="form-label text-muted small text-uppercase fw-bold">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control form-control-lg bg-light border-0 shadow-none mb-3"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                    disabled={isPasswordVerified}
                  />

                  <button
                    type="button"
                    className={`btn fw-bold mt-auto ${isPasswordVerified ? "btn-success" : "btn-outline-dark"}`}
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
                        ? "Verifying..."
                        : "Verify Password"}
                  </button>
                </div>

                <div className="col-md-7">
                  <div className="mb-3">
                    <label className="form-label text-muted small text-uppercase fw-bold">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg bg-light border-0 shadow-none"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      disabled={!isPasswordVerified}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small text-uppercase fw-bold">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control form-control-lg bg-light border-0 shadow-none"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      disabled={!isPasswordVerified}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-dark w-100 fw-bold"
                    onClick={handleUpdatePassword}
                    disabled={
                      !isPasswordVerified ||
                      !formData.password ||
                      !formData.confirmPassword
                    }
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
