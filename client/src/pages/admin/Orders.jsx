import React from "react";

const Orders = () => {
  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2 className="fw-bold">Orders</h2>
        <p className="text-muted">Manage customer orders</p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table table-hover align-middle">

              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>#ORD001</td>
                  <td>Anu</td>
                  <td>₹999</td>
                  <td>
                    <span className="badge bg-success">
                      Paid
                    </span>
                  </td>
                  <td>
                    <span className="badge status text-dark">
                      Pending
                    </span>
                  </td>
                  <td>04 Jun 2026</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      View
                    </button>

                    <button className="btn btn-sm btn-success">
                      Update
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#ORD002</td>
                  <td>Rahul</td>
                  <td>₹1499</td>
                  <td>
                    <span className="badge bg-success">
                      Paid
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-info">
                      Shipped
                    </span>
                  </td>
                  <td>03 Jun 2026</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      View
                    </button>

                    <button className="btn btn-sm btn-success">
                      Update
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#ORD003</td>
                  <td>John</td>
                  <td>₹699</td>
                  <td>
                    <span className="badge bg-danger">
                      Failed
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-secondary">
                      Cancelled
                    </span>
                  </td>
                  <td>02 Jun 2026</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      View
                    </button>

                    <button className="btn btn-sm btn-success">
                      Update
                    </button>
                  </td>
                </tr>

              </tbody>

            </table>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Orders;