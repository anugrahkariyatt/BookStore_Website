import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../redux/cart/cartThunk";
import {
  addToWishList,
  removeFromWishList,
} from "../../redux/wishlist/wishListSlice";

const Cards = ({ selectedBooks }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const addToCart = async (id) => {
    try {
      const res = await api.post(`/cart/${id}`, { stock: 1 });
      console.log("Res", res);
      dispatch(fetchCart());
    } catch (err) {
      console.log("error", err.message);
    }
  };

  return selectedBooks?.map((book) => {
    const isWishlisted = wishlistItems.some((item) => item._id === book._id);

    return (
      <div
        key={book._id}
        className="card book-card flex-shrink-0 justify-content-center position-relative"
        style={{
          width: "clamp(180px, 22vw, 250px)",
        }}
        onClick={() => navigate(`/product/${book._id}`)}
      >
        <button
          type="button"
          className={`btn rounded-circle position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center ${
            isWishlisted ? "btn-danger text-white" : "btn-light"
          }`}
          style={{ width: "36px", height: "36px", zIndex: 2 }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();

            if (isWishlisted) {
              dispatch(removeFromWishList(book._id));
              return;
            }

            dispatch(addToWishList(book));
          }}
        >
          <i className={isWishlisted ? "bi bi-heart-fill" : "bi bi-heart"}></i>
        </button>
        <div className="book-image-wrapper">
          <img src={book.image} className="book-image" alt="book" />
        </div>
        <div className="card-body">
          <h5 className="card-title text-truncate">{book.title}</h5>
          <p className="card-text mb-1">{book.author}</p>
          <p className="card-text fw-bold">${book.price}</p>
          <button
            className="btn w-100 addToCartbtn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(book._id);
            }}
          >
            Add to Cart
          </button>{" "}
        </div>
      </div>
    );
  });
};

export default Cards;
