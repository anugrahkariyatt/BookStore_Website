import Cards from "../ui/Cards";

const CategorySlider = () => {
  return (
    <div className="category-container-div row rounded-4 overflow-hidden">
      <div className="category-left-div col-12 col-lg-5 p-4">
        <ul className="Catagory-slider-text list-unstyled d-flex flex-row flex-lg-column gap-3 overflow-auto no-scrollbar">
          <li>Crime</li>
          <li>Romance</li>
          <li>Finance</li>
          <li>Classics</li>
          <li>Biographies</li>
          <li>Fantasy</li>
          <li>History</li>
          <li>Horror</li>
        </ul>
      </div>
      <div className="category-right-div col-12 col-lg-7 p-4">
        <div className="d-none d-sm-flex gap-1 mb-4">
          <button className="border-0 rounded rounded-circle p-2">
            <img
              src="arrow-left.svg"
              alt=""
              className=""
              style={{ width: "20px" }}
            />
          </button>
          <button className="border-0 rounded rounded-circle p-2">
            <img
              src="arrow-right.svg"
              alt=""
              className=""
              style={{ width: "20px" }}
            />
          </button>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <div className="no-scrollbar d-flex gap-3 overflow-auto pb-3">
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
