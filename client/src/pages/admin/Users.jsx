import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { errorToast, successToast } from "../../utils/Toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.Users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAction = async () => {
    if (!selectedUser) return;
    
    try {
      const isBlocking = !selectedUser.isBlocked;
      const endpoint = isBlocking ? `/admin/block/${selectedUser._id}` : `/admin/unblock/${selectedUser._id}`;
      
      await api.patch(endpoint);
      successToast(`Successfully ${isBlocking ? "Blocked" : "Unblocked"} the user`);
      fetchUsers(); 
      setSelectedUser(null);
    } catch (error) {
      errorToast("Action failed");
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
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="badge bg-light text-dark">{user.role}</span></td>
                  <td>
                    <span className={`badge ${user.isBlocked ? "bg-danger" : "bg-success"}`}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${user.isBlocked ? "btn-outline-dark" : "btn-dark"}`}
                      data-bs-toggle="modal"
                      data-bs-target="#userModal"
                      onClick={() => setSelectedUser(user)}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <div className="modal fade" id="userModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-body text-center py-4">
              <i className={`bi ${selectedUser?.isBlocked ? "bi-unlock" : "bi-lock"} fs-1 text-warning`}></i>
              <h5 className="mt-3">
                {selectedUser?.isBlocked ? "Unblock" : "Block"} {selectedUser?.name}?
              </h5>
              <p className="text-muted">Are you sure you want to perform this action?</p>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <button className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button className="btn btn-dark" data-bs-dismiss="modal" onClick={handleAction}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;