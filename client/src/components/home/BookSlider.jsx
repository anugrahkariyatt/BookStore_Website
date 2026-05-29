import Cards from "../ui/Cards";

const BookSlider = () => {
  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="book-slider-header">Best Sellers</h4>
          <p className="book-slider-text">Read What Millions Have Loved!</p>
        </div>
        <button className="btn btn-dark">Show All</button>
      </div>
      <div className="no-scrollbar d-flex gap-3 overflow-auto pb-3">
        <Cards />
      </div>
    </div>
  );
};

export default BookSlider;
