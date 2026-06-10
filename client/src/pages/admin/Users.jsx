import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.Users);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const blockUser = async (id) => {
    try {
      
      await api.patch(`/admin/block/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unblockUser = async (id) => {
    try {
      await api.patch(`/admin/unblock/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold">Users</h2>
        <p className="text-muted">Manage registered users</p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>1</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="">{user.role}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.isBlocked ? "bg-danger" : "bg-success"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                    <td>
                      {user.isBlocked ? (
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => unblockUser(user._id)}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-dark"
                          onClick={() => blockUser(user._id)}
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
