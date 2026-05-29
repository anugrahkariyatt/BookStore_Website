const AuthorsSection = () => {
  return (
    <div className="container-fluid py-5 bg-light">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-2">Discover Great Authors</h1>

        <p className="fs-4 text-secondary">
          From timeless classics to modern favourites.
        </p>
      </div>

      <div className="row justify-content-center g-4">
        <div className="col-6 col-md-4 col-lg-2 text-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="author name"
              className="rounded-circle img-fluid border-1"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <h4 className="mt-3 fw-medium">Ankur Warikoo</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorsSection;
