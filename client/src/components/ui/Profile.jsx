import { useEffect, useState } from "react";
import api from "../../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    console.log(formData);

    // update profile api here
  };

  if (!user) {
    return (
      <div className="container py-5 text-center vh-100">
        <h4>Loading Profile...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <img
                  src="https://ui-avatars.com/api/?name="
                  alt="profile"
                  className="rounded-circle border"
                  style={{
                    width: "120px",
                    height: "120px",
                  }}
                />

                <h3 className="mt-3 mb-1">{user.name}</h3>

                <p className="text-muted mb-1">{user.email}</p>

                <span className=" text-black">{user.role}</span>
              </div>

              <hr />

              <form onSubmit={handleSubmit}>
                <h5 className="mb-3">Personal Information</h5>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Email Address</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <h5 className="mb-3">Change Password</h5>

                <div className="mb-3">
                  <label className="form-label">New Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>

                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-dark">
                    Save Changes
                  </button>
                </div>
              </form>

              {user.role === "admin" && (
                <div className="mt-4">
                  <hr />

                  <h5>Admin Access</h5>

                  <button className="btn btn-outline-dark">
                    Go To Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
