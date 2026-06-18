import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearWishList,
  closeWishList,
  removeFromWishList,
} from "../../redux/wishlist/wishListSlice";
import api from "../../api/axios";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const addToCart = async (id) => {
    try {
      const res = await api.post(`/cart/${id}`, { stock: 1 });
      if (res) {
        dispatch(removeFromWishList(id));
      }
    } catch (err) {
      console.log("error", err.message);
    }
  };

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

      <div className="wishlist-content ">
        <div className="d-flex  justify-justify-content-end align-items-center mb-3">
          <button
            className="btn btn-outline-dark"
            onClick={() => dispatch(clearWishList())}
            disabled={wishlistItems.length === 0}
          >
            Clear wishlist
          </button>
        </div>

        <hr />

        {wishlistItems.length === 0 ? (
          <div className="text-center empty-state">
            <h2 className="mb-3">Your wishlist is empty</h2>

            <button
              className="btn btn-dark px-4 py-3"
              onClick={() => {
                dispatch(closeWishList());
                navigate("/books");
              }}
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {wishlistItems.map((item) => (
              <div key={item._id} className="border rounded p-2">
                <div className="d-flex gap-3 align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "60px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />

                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1 text-truncate">{item.title}</h6>
                    <p className="mb-0 text-secondary">${item.price}</p>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => addToCart(item._id)}
                      >
                        Add To Cart{" "}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => dispatch(removeFromWishList(item._id))}
                        aria-label={`Remove ${item.title} from wishlist`}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Wishlist;
