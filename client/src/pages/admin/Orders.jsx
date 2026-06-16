import React from "react";
import { useEffect } from "react";
import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../utils/Toast";

const Orders = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await api.get("/admin/orders");
      setResponse(orders.data.orders);
    };
    fetchOrders();
  }, []);
  const updateStatus = async (id, statusValue) => {
    const updatedOrder = await api.patch(`/admin/orders/${id}`, {
      status: statusValue,
    });
     if (updatedOrder) {
        successToast("Successfully update the status");
      } else {
        errorToast("Unable to update the status");
      }
  };
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
                {response?.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.userId.email}</td>
                    <td>₹{item.totalPrice}</td>
                    <td>
                      <span className="badge bg-success">Paid</span>
                    </td>
                    <td>
                      <span className="badge status text-dark">
                        {item.status}
                      </span>
                      <select
                        className="form-select"
                        style={{ width: "250px" }}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                      >
                        <option value="">{item.status}</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => navigate(`/adminorders/${item._id}`)}
                      >
                        View
                      </button>
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

export default Orders;
