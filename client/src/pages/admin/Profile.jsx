import React from "react";

const Profile = () => {
  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2 className="fw-bold">Profile</h2>
        <p className="text-muted">
          Manage your account settings
        </p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="text-center mb-4">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="rounded-circle border"
            />

            <h4 className="mt-3">Admin User</h4>

            <p className="text-muted">
              admin@bookstore.com
            </p>
          </div>

          <form>

            <div className="mb-3">
              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                defaultValue="Admin User"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                defaultValue="admin@bookstore.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                New Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>

          </form>

        </div>
      </div>

    </div>
  );
};

export default Profile;