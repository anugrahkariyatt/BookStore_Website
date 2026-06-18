import { useState, useRef } from "react";
import Cards from "../ui/Cards";
import { useEffect } from "react";
import api from "../../api/axios";

const CategorySlider = () => {
  const [selectedBooks, setselectedBooks] = useState([]);

  const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState(null);
  const itemRefs = useRef([]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data.Categories);

      if (res.data.Categories.length > 0) {
        const firstCategory = res.data.Categories[0];

        setActiveCategory(firstCategory._id);

        const booksRes = await api.get(
          `/books/book-by-category/${firstCategory._id}`,
        );

        setselectedBooks(booksRes.data.books);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleCategoryClick = async (category, index) => {
    setActiveCategory(category._id);

    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    const res = await api.get(`/books/book-by-category/${category._id}`);
    
    setselectedBooks(res.data.books);
  };

  return (
    <div className="category-container-div row rounded-4 overflow-hidden">
      <div className="category-left-div col-12 col-lg-5 p-4">
        <ul className="Catagory-slider-text list-unstyled d-flex flex-row flex-lg-column gap-3 overflow-auto no-scrollbar">
          {categories.map((category, index) => (
            <li
              key={category._id}
              ref={(element) => (itemRefs.current[index] = element)}
              onClick={() => handleCategoryClick(category, index)}
              className={`category-item ${
                activeCategory === category._id ? "active-category" : ""
              }`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="category-right-div col-12 col-lg-7 p-4">
        <div className="category-books-slider no-scrollbar d-flex gap-3 overflow-auto pb-3">
          <Cards selectedBooks={selectedBooks} />
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
