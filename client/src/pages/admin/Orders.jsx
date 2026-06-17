import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { errorToast, successToast } from "../../utils/Toast";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  
  // New state variables to hold the pending update until confirmed
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [pendingStatus, setPendingStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders");
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // 1. This function catches the dropdown change and opens the modal
  const handleStatusChangeClick = (id, newStatus) => {
    setSelectedOrderId(id);
    setPendingStatus(newStatus);
    
    // Trigger the hidden button to open the Bootstrap modal
    document.getElementById("triggerStatusModal").click();
  };

  // 2. This function actually runs the API call when "Yes" is clicked
  const confirmUpdateStatus = async () => {
    try {
      const updatedOrder = await api.patch(`/admin/orders/${selectedOrderId}`, {
        status: pendingStatus,
      });
      
      if (updatedOrder) {
        // Update the UI
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrderId ? { ...order, status: pendingStatus } : order
          )
        );
        successToast(`Order status updated to ${pendingStatus}`);
      } else {
        errorToast("Unable to update the status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      errorToast("Something went wrong while updating status");
    } finally {
      // Clear the temporary state
      setSelectedOrderId(null);
      setPendingStatus("");
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
                {orders?.map((item) => (
                  <tr key={item._id}>
                    <td className="text-muted small">{item._id.slice(-6)}</td>
                    <td className="fw-semibold">{item.userId?.email}</td>
                    <td>₹{item.totalPrice}</td>
                    <td>
                      <span className="text-success fw-bold small">
                        <i className="bi bi-check-circle-fill me-1"></i> Paid
                      </span>
                    </td>
                    <td>
                      {/* Changed onChange to trigger our interceptor function */}
                      <select
                        className="form-select form-select-sm shadow-none"
                        style={{ width: "130px", cursor: "pointer" }}
                        value={item.status}
                        onChange={(e) => handleStatusChangeClick(item._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="text-muted small">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-light border"
                        onClick={() => navigate(`/adminorders/${item._id}`)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hidden button to trigger Status Modal */}
      <button 
        id="triggerStatusModal" 
        data-bs-toggle="modal" 
        data-bs-target="#statusModal" 
        className="d-none"
      ></button>

      {/* Modern Status Confirmation Modal */}
      <div
        className="modal fade"
        id="statusModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "600px" }}>
          <div className="modal-content border-0 shadow-lg">
            
            <div className="modal-header border-0 pb-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setSelectedOrderId(null);
                  setPendingStatus("");
                }}
              ></button>
            </div>
            
            <div className="modal-body text-center pt-0 pb-4 px-4">
              
              {/* Blue Info Icon for Update Actions */}
              <div 
                className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <i 
                  className="bi bi-arrow-repeat text-primary" 
                  style={{ fontSize: "2.5rem" }}
                ></i>
              </div>
              
              <h4 className="fw-bold mb-3">Update Order Status?</h4>
              
              <p className="text-muted mb-4 fs-5">
                You are about to change the status of Order <strong className="text-dark">#{selectedOrderId?.slice(-6)}</strong> to:
                <br />
                <span className="badge bg-primary fs-6 mt-2 px-3 py-2">{pendingStatus}</span>
              </p>
              
              <div className="d-flex justify-content-center gap-3 mt-2 px-4">
                <button
                  type="button"
                  className="btn btn-light border py-2 fw-semibold w-50"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setSelectedOrderId(null);
                    setPendingStatus("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary py-2 fw-semibold w-50 shadow-sm"
                  onClick={confirmUpdateStatus}
                  data-bs-dismiss="modal"
                >
                  Yes, Update
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Orders;