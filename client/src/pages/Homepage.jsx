// import Cards from "../components/ui/Cards";
import HeroBanner from "../components/home/HeroBanner";
import BookSlider from "../components/home/BookSlider";
import AuthorsSection from "../components/home/AuthorsSection ";
import CategorySlider from "../components/home/CategorySlider";
// import { useState, useEffect } from "react";
// import api from "../api/axios";

const Homepage = () => {
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       console.log("Fetching is working");

  //       const res = await api.get("/books/all");
  //       console.log("Books", res.data);
  //       setBooks(res.data);
  //     } catch (err) {
  //       console.log("error", err.message);
  //     }
  //   };
  //   fetchBooks()
  // }, []);
  return (
    <>
      <div className="min-vh-100 d-flex flex-column gap-4 p-3">
        <HeroBanner />
        <div className="w-100 ">
          <BookSlider />
        </div>
        <CategorySlider />
        <BookSlider />

        <AuthorsSection />
      </div>
    </>
  );
};

export default Homepage;
