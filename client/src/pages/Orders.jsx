import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { successToast, errorToast } from "../utils/Toast"; 

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null); 

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data.orders);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async () => {
    if (!selectedOrderId) return;
    try {
      await api.patch(`/orders/${selectedOrderId}/cancel`);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === selectedOrderId ? { ...order, status: "Cancelled" } : order
        )
      );
      successToast("Order cancelled successfully");
    } catch (err) {
      errorToast(err.response?.data?.error || "Failed to cancel order");
    } finally {
      setSelectedOrderId(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered": return "status-delivered";
      case "Shipped": return "status-shipped";
      case "Pending": return "status-pending";
      case "Cancelled": return "status-cancelled";
      default: return "";
    }
  };

  if (loading) return <div className="container py-5 text-center"><h4>Loading orders...</h4></div>;
  if (error) return <div className="container py-5 text-center"><h4>{error}</h4></div>;

  return (
    <div className="orders-page py-5">
      <div className="container">
        <h2 className="orders-title mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-orders text-center">
            <h4>No Orders Found</h4>
            <p>Looks like you haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div key={order._id} className="col-12">
                <div className="order-card p-3 border rounded shadow-sm">
                  <div className="order-header d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">Order #{order._id.slice(-6).toUpperCase()}</h5>
                      <p className="text-muted mb-0">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span>
                  </div>

                  <hr />

                  <div className="order-body d-flex justify-content-between">
                    <ul className="order-items list-unstyled">
                      {order.items.map((item) => (
                        <li key={item._id}>{item.title} × {item.quantity}</li>
                      ))}
                    </ul>
                    
                    <div className="order-summary d-flex flex-column gap-2 text-end">
                      <h5>₹{order.totalPrice}</h5>
                      <button className="btn btn-outline-dark btn-sm" onClick={() => navigate(`/orders/${order._id}`)}>View Details</button>
                      
                      {order.status === "Pending" && (
                        <button
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#cancelModal"
                          onClick={() => setSelectedOrderId(order._id)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <div className="modal fade" id="cancelModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-body text-center py-4">
              <i className="bi bi-x-circle text-danger fs-1"></i>
              <h5 className="mt-3">Cancel Order?</h5>
              <p className="text-muted">Are you sure you want to cancel this order? This action cannot be undone.</p>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <button className="btn btn-light" data-bs-dismiss="modal">No, Keep It</button>
                <button className="btn btn-danger" data-bs-dismiss="modal" onClick={handleCancelOrder}>Yes, Cancel It</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;