import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      await api.patch(`/orders/${orderId}/cancel`);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order,
        ),
      );
    } catch (err) {
      alert(err.response?.data?.error || "Failed to cancel order");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-delivered";
      case "Shipped":
        return "status-shipped";
      case "Pending":
        return "status-pending";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading orders...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h4>{error}</h4>
      </div>
    );
  }

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
                <div className="order-card">
                  <div className="order-header">
                    <div>
                      <h5 className="mb-1">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h5>

                      <p className="text-muted mb-0">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`status-badge ${getStatusClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <hr />

                  <div className="order-body">
                    <div>
                      <h6>Items</h6>

                      <ul className="order-items">
                        {order.items.map((item) => (
                          <li key={item._id}>
                            {item.title} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="order-summary d-flex flex-column gap-2">
                      <h5>₹{order.totalPrice}</h5>

                      <button
                        className="btn btn-outline-dark"
                        onClick={() => navigate(`/orders/${order._id}`)}
                      >
                        View Details
                      </button>

                      {order.status === "Pending" && (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancelOrder(order._id)}
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
    </div>
  );
};

export default Orders;
