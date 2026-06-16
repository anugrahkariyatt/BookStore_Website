import React from "react";
import { useEffect } from "react";
import api from "../../api/axios";
import { useState } from "react";

const Dashboard = () => {
  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    const fetchDashBoardDetails = async () => {
      try {
        const res = await api.get("/admin/dashboard");

        setResponseData(res.data);
      } catch (err) {
        console.log("Error", err.message);
      }
    };
    fetchDashBoardDetails();
  }, []);
  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">Welcome back, Admin</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Books</h6>
              <h2 className="fw-bold">{responseData?.totalBooks || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Orders</h6>
              <h2 className="fw-bold">{responseData?.totalOrders || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Users</h6>
              <h2 className="fw-bold">{responseData?.totalUsers || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Revenue</h6>
              <h2 className="fw-bold">₹{responseData?.totalRevenue}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <h5 className="mb-0">Recent Orders</h5>
        </div>

        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Book</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {responseData?.recentOrder?.map((item) => (
                <tr key={item._id}>
                  <td>{item?._id}</td>
                  <td>{item?.userId.email}</td>
                  <td>{item?.items.length}</td>
                  <td>₹{item?.totalPrice}</td>
                  <td>
                    <span className="badge text-black">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
