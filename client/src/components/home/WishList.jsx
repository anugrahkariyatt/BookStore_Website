import { useDispatch } from "react-redux";
import { closeWishList } from "../../redux/wishlist/wishListSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  return (
    <aside
      className="wishlist-wrapper position-fixed end-0 vh-100 bg-white shadow-lg p-4"
      style={{ top: 0, width: "350px", zIndex: 1055 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">My Wishlist</h4>

        <button
          className="btn-close"
          onClick={() => dispatch(closeWishList())}
          aria-label="Close wishlist"
        ></button>
      </div>

      <div className="wishlist-content p-4">
        <div className="d-flex justify-content-end mb-3">
          <button className="btn px-4 py-3">Clear wishlist</button>
        </div>

        <hr />

      

        <div className="text-center empty-state">
          <h2 className="mb-3">Your wishlist is empty</h2>

          <button className="btn px-4 py-3">Continue Shopping</button>
        </div>
      </div>
    </aside>
  );
};

export default Wishlist;
