// import Cards from "../components/ui/Cards";
import HeroBanner from "../components/home/HeroBanner";
import BookSlider from "../components/home/BookSlider";
import AuthorsSection from "../components/home/AuthorsSection ";
import CategorySlider from "../components/home/CategorySlider";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";

const Homepage = () => {
  const [topSellingBooks, setTopSellingBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("User>>>------>>>>>>>>", user, "Autheticated", isAuthenticated);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("Fetching is working");

        const sortBySoldBook = await api.get("/books/book-by-sold");
        const sortByNewBook = await api.get("/books/book-by-new");
        // console.log("Books sold", sortBySoldBook.data.books);
        setNewBooks(sortByNewBook.data.books);
        setTopSellingBooks(sortBySoldBook.data.books);
        console.log("SE", topSellingBooks);
      } catch (err) {
        console.log("error", err.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className="min-vh-100 d-flex flex-column gap-4 p-3">
        <HeroBanner />
        <div className="w-100 ">
          <BookSlider title={"Top Selling"} selectedBooks={topSellingBooks} />
        </div>
        <CategorySlider />
        <BookSlider title={"Recent Released Books"} selectedBooks={newBooks} />

        <AuthorsSection />
      </div>
    </>
  );
};

export default Homepage;
