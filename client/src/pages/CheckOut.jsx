import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../redux/orders/ordersThunk";
import { successToast, errorToast } from "../utils/Toast";
import api from "../api/axios";

const Checkout = () => {
  const { items, totalPrice, totalCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const shippingFee = 40;
  const total = totalPrice + shippingFee;

  const handlePlaceOrder = async () => {
    try {
      const res = await api.get("/cart");
      const cartId = res.data.Cart._id;

      await dispatch(
        placeOrder({
          cartId,
          shippingAddress: formData,
          paymentMethod: "COD",
        }),
      ).unwrap();

      successToast("Order placed successfully");
      setShowModal(false);
      navigate("/orders");
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Failed to place order";
      errorToast(errorMessage);
      setShowModal(false);
    }
  };
  // Trigger modal only after validation
  const initiateCheckout = () => {
    const { name, phone, addressLine1, city, state, pincode } = formData;

    if (!name || !phone || !addressLine1 || !city || !state || !pincode) {
      errorToast("Please fill all the required fields");
      return;
    }
    setShowModal(true);
  };

  if (items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h3>Your cart is empty</h3>
      </Container>
    );
  }

  return (
    <Container className="checkout-page py-3">
      <h2 className="mb-4">Checkout</h2>
      <Row className="g-4">
        <Col lg={8}>
          <Card className="checkout-card">
            <Card.Body>
              <h4 className="mb-4">Shipping Address</h4>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <h4 className="mt-4 mb-3">Payment Method</h4>
                <Form.Check
                  type="radio"
                  label="Cash On Delivery"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="UPI (Coming Soon)"
                  disabled
                  className="mt-2"
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="order-summary-card">
            <Card.Body>
              <h4 className="mb-2">Order Summary</h4>
              <p className="text-muted mb-4">
                {totalCount} item{totalCount !== 1 ? "s" : ""}
              </p>
              {items.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between mb-3"
                >
                  <div>
                    <p className="mb-0 fw-semibold">{item.bookId.title}</p>
                    <small className="text-muted">
                      ₹{item.bookId.price} × {item.quantity}
                    </small>
                  </div>
                  <span>₹{item.bookId.price * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>₹{shippingFee}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Button
                className="w-100 place-order-btn"
                onClick={initiateCheckout}
              >
                Place Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="admin-modal"
      >
        <Modal.Body className="text-center py-5 px-4">
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "#e7f3ff",
            }}
          >
            <i className="bi bi-cart-check fs-2 text-primary"></i>
          </div>

          <h4 className="fw-bold mb-2">Ready to place order?</h4>
          <p className="text-muted px-3">
            Are you sure you want to finalize this order? This action will
            process your request immediately.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button
              variant="light"
              className="admin-modal-btn px-4"
              onClick={() => setShowModal(false)}
            >
              Dismiss
            </Button>
            <Button
              variant="primary"
              className="admin-modal-btn px-4"
              onClick={handlePlaceOrder}
            >
              Confirm & Place
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Checkout;
