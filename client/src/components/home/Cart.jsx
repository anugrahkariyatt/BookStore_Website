import { useDispatch } from "react-redux";

import { closeCart } from "../../redux/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  return (
    <aside
      className="sidebar-theme shadow-lg p-4 position-fixed top-0 end-0 vh-100 bg-white"
      style={{ width: "350px", zIndex: 1050 }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h4>My Cart</h4>

        <button
          className="btn-close"
          onClick={() => dispatch(closeCart())}
          aria-label="Close cart"
        ></button>
      </div>

      <div className="d-flex flex-column gap-2">
        <div className="cart-item border-bottom py-3">
          <div className="d-flex  gap-2 align-items-center">
            <div className="col-auto">
              <img src="image.png" alt="Book" className="cart-img" />
            </div>

            <div className="col">
              <h5 className="fw-bold mb-3">The Silent Patient</h5>

              <div className="quantity-control">
                <button className="btn btn-light">-</button>
                <span className="quantity">2</span>
                <button className="btn btn-light">+</button>
              </div>
            </div>

            <div className="col-auto">
              <h4 className="fw-bold mb-0">₹576</h4>
            </div>
          </div>
        </div>
        <div className="cart-item border-bottom py-3">
          <div className="d-flex  gap-2 align-items-center">
            <div className="col-auto">
              <img src="image.png" alt="Book" className="cart-img" />
            </div>

            <div className="col">
              <h5 className="fw-bold mb-3">The Silent Patient</h5>

              <div className="quantity-control">
                <button className="btn btn-light">-</button>
                <span className="quantity">2</span>
                <button className="btn btn-light">+</button>
              </div>
            </div>

            <div className="col-auto">
              <h4 className="fw-bold mb-0">₹576</h4>
            </div>
          </div>
        </div>
        <div className="cart-item border-bottom py-3">
          <div className="d-flex  gap-2 align-items-center">
            <div className="col-auto">
              <img src="image.png" alt="Book" className="cart-img" />
            </div>

            <div className="col">
              <h5 className="fw-bold mb-3">The Silent Patient</h5>

              <div className="quantity-control">
                <button className="btn btn-light">-</button>
                <span className="quantity">2</span>
                <button className="btn btn-light">+</button>
              </div>
            </div>

            <div className="col-auto">
              <h4 className="fw-bold mb-0">₹576</h4>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Cart;
