const HeroBanner = () => {
  return (
    <div className="hero-banner w-100 d-flex align-items-center justify-content-center">
      <picture>
        {/* Mobile */}
        <source media="(max-width: 576px)" srcSet="mobileimage.png" />

        {/* Tablet */}
        {/* <source media="(max-width: 720px)" srcSet="mobileimage.png" /> */}

        {/* Desktop */}
        <img
          src="image1.png"
          alt="Banner"
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
        />
      </picture>
    </div>
  );
};

export default HeroBanner;
