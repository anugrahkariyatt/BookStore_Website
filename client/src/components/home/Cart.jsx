import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { closeCart, setCartItems } from "../../redux/cart/cartSlice.js";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "../../redux/cart/cartThunk";
import { placeOrder } from "../../redux/orders/ordersThunk";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error, isCartOpen, totalCount, totalPrice } =
    useSelector((state) => state.cart);
  const { loading: orderLoading } = useSelector((state) => state.orders);

  const handleQuantityChange = (cartItemId, nextQuantity) => {
    const parsedQuantity = Number(nextQuantity);

    if (Number.isInteger(parsedQuantity) && parsedQuantity >= 1) {
      dispatch(
        updateCartQuantity({
          cartItemId,
          quantity: parsedQuantity,
        }),
      );
    }
  };

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate("/checkout");
  };

  useEffect(() => {
    if (isCartOpen) {
      dispatch(fetchCart());
    }
  }, [dispatch, isCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <aside
      className="sidebar-theme shadow-lg p-4 position-fixed top-0 end-0 vh-100 bg-white"
      style={{
        width: "350px",
        zIndex: 1050,
        overflowY: "auto",
        overscrollBehavior: "contain",
      }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h4 className="fw-bold mb-0">My Cart</h4>

        <button
          className="btn-close"
          onClick={() => dispatch(closeCart())}
          aria-label="Close cart"
        ></button>
      </div>

      {loading && <p className="mb-0">Loading cart...</p>}

      {error && <p className="text-danger mb-0">{error}</p>}

      <div className="d-flex flex-column gap-2">
        {!loading && items.length === 0 ? (
          <p className="mb-0">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="border rounded p-4 border-bottom py-3"
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={item.bookId.image}
                  alt={item.bookId.title}
                  style={{
                    width: "70px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />

                <div className="flex-grow-1">
                  <h6 className="fw-bold mb-2">{item.bookId.title}</h6>

                  <p className="fw-bold  mb-2">
                    ₹{item.bookId.price * item.quantity}
                  </p>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      className="form-control text-center form-control-sm"
                      style={{ width: "70px" }}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, e.target.value)
                      }
                      aria-label="Quantity"
                    />

                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      className="btn  "
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="border-top pt-3 mt-3 d-flex justify-content-between fw-bold">
          <span>
            {totalCount} item{totalCount === 1 ? "" : "s"}
          </span>
          <span>₹{totalPrice}</span>
        </div>
      )}

      {items.length > 0 && (
        <button
          className="btn btn-dark w-100 mt-3"
          onClick={handleCheckout}
          disabled={orderLoading}
        >
          Proceed to Checkout
        </button>
      )}
    </aside>
  );
};

export default Cart;
