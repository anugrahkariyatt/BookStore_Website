import "../../Product.css";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import {
  addToWishList,
  removeFromWishList,
} from "../redux/wishlist/wishListSlice";
const Book = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/books/${id}`);
        setBook(res.data.Book[0]);
        setQuantity(1);
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const isWishlisted = useMemo(
    () => wishlistItems.some((item) => item._id === book?._id),
    [book?._id, wishlistItems],
  );

  const handleAddToCart = async () => {
    if (!book) return;

    try {
      await api.post(`/cart/${book._id}`, { stock: quantity });
    } catch (postError) {
      setError(postError.message || "Failed to add to cart");
    }
  };

  const handleWishlistToggle = () => {
    if (!book) return;

    if (isWishlisted) {
      dispatch(removeFromWishList(book._id));
      return;
    }

    dispatch(addToWishList(book));
  };

  const price = Number(book?.price || 0);
  const totalPrice = price * quantity;

  if (loading) {
    return (
      <div className="product-shell container py-5">
        <div className="product-loader card border-0 shadow-sm p-5 text-center">
          <div
            className="spinner-border text-dark mx-auto mb-3"
            role="status"
          />
          <h4 className="mb-2">Loading book details</h4>
          <p className="text-secondary mb-0">
            Fetching the latest details for this title.
          </p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="product-shell container py-5">
        <div className="product-loader card border-0 shadow-sm p-5 text-center">
          <h4 className="mb-2">Book not found</h4>
          <p className="text-secondary mb-0">
            {error || "We could not load this book right now."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-shell container py-4 py-lg-5">
      <div className="product-hero row g-4 align-items-stretch">
        <div className="col-12 col-lg-5">
          <div className="product-media-panel h-100">
            <div className="product-cover-frame">
              <button
                type="button"
                className={`product-wishlist-btn btn rounded-circle ${
                  isWishlisted ? "btn-danger text-white" : "btn-light"
                }`}
                onClick={handleWishlistToggle}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <i
                  className={isWishlisted ? "bi bi-heart-fill" : "bi bi-heart"}
                />
              </button>

              <img
                src={book.image || "/image.png"}
                className="product-cover-image"
                alt={`Image of ${book.title}`}
              />
            </div>

            <div className="product-quick-stats">
              <div>
                <span>Price</span>
                <strong>₹{price}</strong>
              </div>
              <div>
                <span>Stock</span>
                <strong>{book.stock}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>₹{totalPrice}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="product-details-panel h-100">
            {/* <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="product-category-chip">Featured Read</span>
              <span className="product-category-chip product-category-chip-soft">
                In Stock
              </span>
            </div> */}

            <h1 className="product-title">{book.title}</h1>
            <p className="product-author mb-2">by {book.author}</p>

            {/* <div className="product-rating-row">
              <div className="product-rating-pill">
                <i className="bi bi-star-fill" />
                <span>4.8</span>
              </div>
              <span className="text-secondary">Loved by readers</span>
            </div> */}

            <p className="product-description">{book.description}</p>

            <div className="product-highlight-grid">
              <div className="product-highlight-card">
                <span>Price</span>
                <strong>₹{price}</strong>
              </div>
              <div className="product-highlight-card">
                <span>Sub-total</span>
                <strong>₹{totalPrice}</strong>
              </div>
            </div>

            <div className="product-quantity-row">
              <label
                htmlFor="quantity-input"
                className="form-label mb-0 fw-semibold"
              >
                Quantity
              </label>

              <div className="quantity-control">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={quantity <= 1}
                >
                  -
                </button>

                <input
                  id="quantity-input"
                  type="number"
                  min="1"
                  max={book.stock || undefined}
                  value={quantity}
                  onChange={(event) => {
                    const nextQuantity = Number(event.target.value);
                    if (Number.isInteger(nextQuantity) && nextQuantity >= 1) {
                      setQuantity(
                        Math.min(nextQuantity, book.stock || nextQuantity),
                      );
                    }
                  }}
                  className="form-control text-center"
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(current + 1, book.stock || current + 1),
                    )
                  }
                  disabled={book.stock ? quantity >= book.stock : false}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-2">
              <button
                className="btn btn-dark btn-lg px-4"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-outline-dark btn-lg px-4"
                onClick={handleWishlistToggle}
              >
                {isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
