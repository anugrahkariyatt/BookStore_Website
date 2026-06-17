import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const OrderDetails = () => {
  const { id } = useParams();
  console.log("IDDDDDDD", id);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/admin/orders/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading order details...</h4>
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

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h4>Order not found</h4>
      </div>
    );
  }

  return (
    <div className="order-details-page py-5">
      <div className="container">
        <div className="order-details-card p-4 shadow-sm rounded bg-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>

              <p className="text-muted mb-0">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`badge fs-6 ${
                order.status === "Delivered"
                  ? "bg-success"
                  : order.status === "Cancelled"
                    ? "bg-danger"
                    : "bg-warning text-dark"
              }`}
            >
              {order.status}
            </span>
          </div>

          <hr />

          <div className="row g-4">
            <div className="col-lg-6">
              <h5>Shipping Address</h5>

              <div className="border rounded p-3">
                <p>
                  <strong>{order.shippingAddress?.name}</strong>
                </p>

                <p>{order.shippingAddress?.phone}</p>

                <p>{order.shippingAddress?.addressLine1}</p>

                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}
                </p>

                <p>{order.shippingAddress?.pincode}</p>
              </div>
            </div>

            <div className="col-lg-6">
              <h5>Payment Details</h5>

              <div className="border rounded p-3">
                <p>
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>

                <p>
                  <strong>Status:</strong> {order.status}
                </p>

                <p>
                  <strong>Total:</strong> ₹{order.totalPrice}
                </p>
              </div>
            </div>
          </div>

          <hr />

          <h5 className="mb-4">Ordered Items</h5>

          {order.items.map((item) => (
            <div
              key={item._id}
              className="d-flex gap-3 align-items-center border rounded p-3 mb-3"
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "110px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              <div className="flex-grow-1">
                <h6>{item.title}</h6>

                <p className="mb-1">Quantity: {item.quantity}</p>

                <p className="fw-bold mb-0">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
