import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios"; 

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/admin/orders/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        console.error("Fetch order error:", err);
        setError(
          err.response?.data?.error ||
            err.response?.data?.message ||
            "Failed to fetch order details",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="mt-3 text-muted">Loading order details...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger d-inline-block mt-5">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center mt-5">
        <h4 className="text-muted">Order not found</h4>
      </div>
    );
  }

  return (
    <div className="order-details-page py-5">
      <div className="container">
        <div className="order-details-card p-4 shadow-sm rounded bg-white border-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h3 className="fw-bold">
                Order #{order._id?.slice(-6).toUpperCase()}
              </h3>
              <p className="text-muted mb-0">
                Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <span
              className={`badge px-3 py-2 fs-6 shadow-sm ${
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

          <hr className="my-4" />

          <div className="row g-4">
            <div className="col-lg-6">
              <h5 className="fw-bold mb-3">Shipping Address</h5>
              <div className="border rounded p-3 bg-light">
                {typeof order.shippingAddress === "string" ? (
                  <p className="mb-0">{order.shippingAddress}</p>
                ) : (
                  <>
                    <p className="mb-1">
                      <strong>{order.shippingAddress?.name || "N/A"}</strong>
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-telephone-fill me-2 text-muted"></i>
                      {order.shippingAddress?.phone || "N/A"}
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-geo-alt-fill me-2 text-muted"></i>
                      {order.shippingAddress?.addressLine1}
                    </p>
                    <p className="mb-1 ms-4">
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.state}
                    </p>
                    <p className="mb-0 ms-4">
                      {order.shippingAddress?.pincode}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <h5 className="fw-bold mb-3">Payment Details</h5>
              <div className="border rounded p-3 bg-light h-100">
                <p className="mb-2">
                  <span className="text-muted">Payment Method:</span>{" "}
                  <strong className="float-end">
                    {order.paymentMethod || "N/A"}
                  </strong>
                </p>
                <p className="mb-2">
                  <span className="text-muted">Status:</span>{" "}
                  <strong className="float-end">{order.status}</strong>
                </p>
                <hr />
                <p className="mb-0 fs-5">
                  <span className="text-muted">Total:</span>{" "}
                  <strong className="float-end text-primary">
                    ₹{order.totalPrice}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="fw-bold mb-4">Ordered Items</h5>

          <div className="row g-3">
            {order.items?.map((item, index) => (
              <div key={item._id || index} className="col-md-6 col-lg-4">
                <div className="d-flex gap-3 align-items-center border rounded p-3 h-100 shadow-sm transition-hover">
                  <img
                    src={
                      item.image ||
                      item.book?.image ||
                      "https://via.placeholder.com/80x110?text=No+Image"
                    }
                    alt={item.title || item.book?.title || "Book"}
                    style={{
                      width: "80px",
                      height: "110px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                    className="border"
                  />

                  <div className="flex-grow-1">
                    <h6
                      className="fw-bold text-truncate"
                      style={{ maxWidth: "200px" }}
                    >
                      {item.title || item.book?.title || "Unknown Book"}
                    </h6>
                    <p className="text-muted small mb-1">
                      Qty: {item.quantity}
                    </p>
                    <p className="fw-bold text-primary mb-0">
                      ₹{item.price || item.book?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
