import React from "react";

const Dashboard = () => {
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
              <h2 className="fw-bold">120</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Orders</h6>
              <h2 className="fw-bold">80</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Users</h6>
              <h2 className="fw-bold">340</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Revenue</h6>
              <h2 className="fw-bold">₹45,000</h2>
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
              <tr>
                <td>#1001</td>
                <td>John</td>
                <td>Atomic Habits</td>
                <td>₹499</td>
                <td>
                  <span className="badge bg-success">
                    Delivered
                  </span>
                </td>
              </tr>

              <tr>
                <td>#1002</td>
                <td>Rahul</td>
                <td>Clean Code</td>
                <td>₹699</td>
                <td>
                  <span className="badge bg-warning">
                    Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td>#1003</td>
                <td>Anu</td>
                <td>Dune</td>
                <td>₹799</td>
                <td>
                  <span className="badge bg-primary">
                    Shipped
                  </span>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;