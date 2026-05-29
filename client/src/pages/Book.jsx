import "/Product.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
const Book = () => {
  const { id } = useParams();
  console.log("ID>>>>>>>", id);

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get(`/books/${id}`);
      setBook(res.data.Book[0]);
      console.log("response data", res.data.Book);
    };

    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;
  return (
    <div className="product-page container-fluid py-4">
      <div className="row g-4 align-items-stretch">
        <div className="col-12 col-lg-6">
          <div className="product-image-panel h-100">
            <div className="product-book-image-wrapper">
              <img
                src="/image.png"
                className="book-image product-main-image"
                alt={`Image of ${book.title}`}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="product-details-panel h-100">
            {/* <p className="product-category">{book.cata}</p> */}
            <h1 className="product-title">{book.title}</h1>
            <p className="product-author">{book.author}</p>

            <p className="product-description">{book.description}</p>

            <div className="product-meta">
              <span>Price: ${book.price}</span>
              <span>In Stock : {book.stock} </span>
              {/* <span>Rating: 4.8/5</span> */}
            </div>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <button className="btn btn-dark btn-lg">Add to Cart</button>
              <button className="btn btn-outline-dark btn-lg">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
