import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books/all");
        console.log("res data", res.data);

        setBooks(res.data.books);
      } catch (err) {
        console.log("error", err.message);
      }
    };

    fetchBooks();
  }, []);

  return books.map((book) => (
    <div
      key={book._id}
      className="card flex-shrink-0 h-100 justify-content-center"
      style={{
        width: "clamp(180px, 22vw, 250px)",
      }}
      onClick={() => navigate(`/product/${book._id}`)}
    >
      <div className="book-image-wrapper">
        <img src="image.png" className="book-image" alt="book" />
      </div>
      <div className="card-body">
        <h5 className="card-title text-truncate">{book.title}</h5>
        <p className="card-text mb-1">{book.author}</p>
        <p className="card-text fw-bold">${book.price}</p>
        <button className="btn btn-dark mt-auto w-100">Add to Cart</button>{" "}
      </div>
    </div>
  ));
};

export default Cards;
