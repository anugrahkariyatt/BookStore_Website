import Cards from "../ui/Cards";

const BookSlider = ({ selectedBooks, title }) => {
  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="book-slider-header">{title}</h4>
          <p className="book-slider-text">Read What Millions Have Loved!</p>
        </div>
      </div>
      <div className="book-slider-container no-scrollbar d-flex gap-3 overflow-auto pb-3">
        <Cards selectedBooks={selectedBooks} />
      </div>
    </div>
  );
};

export default BookSlider;
