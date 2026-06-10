const authors = [
  {
    name: "Ankur Warikoo",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "James Clear",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Robin Sharma",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Paulo Coelho",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Simon Sinek",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
  {
    name: "Morgan Housel",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598",
  },
];

const AuthorsSection = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Discover Great Authors</h1>

        {/* <p className="fs-5 text-secondary">
          From timeless classics to modern favourites.
        </p> */}
      </div>

      <div className="row g-4 justify-content-center">
        {authors.map((author, index) => (
          <div
            key={index}
            className="col-6 col-sm-4 col-md-3 col-lg-2 text-center"
          >
            <img
              src={author.image}
              alt={author.name}
              className="rounded-circle img-fluid shadow-sm"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
              }}
            />

            <h6 className="mt-3 fw-semibold">{author.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsSection;