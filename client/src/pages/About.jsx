import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h2
            className="fw-bold mb-4"
            style={{ color: "var(--primary-color)" }}
          >
            About Us
          </h2>

          <p style={{ color: "var(--text-secondary)" }}>
            Welcome to Bookloom, your destination for discovering stories,
            knowledge, and inspiration. We offer a carefully curated collection
            of bestselling novels, academic resources, self-development books,
            children's literature, and much more.
          </p>

          <p style={{ color: "var(--text-secondary)" }}>
            Our mission is to make reading accessible to everyone by providing
            quality books at affordable prices. Whether you're a passionate
            reader, a student, or someone exploring a new hobby, we have
            something for you.
          </p>

          <Link
            to={"/books"}
            className="btn px-4 py-2"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#ffffff",
            }}
          >
            Explore Books
          </Link>
        </div>

        <div className="col-lg-6 text-center mt-4 mt-lg-0">
          <img
            src="/image1.png"
            alt="About Bookstore"
            className="img-fluid rounded-4"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
