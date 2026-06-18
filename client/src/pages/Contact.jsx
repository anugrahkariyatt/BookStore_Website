
const Contact = () => {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: 'var(--primary-color)' }}>Contact Us</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="p-4 bg-light rounded-4 h-100">
            <h4 className="fw-bold mb-4" style={{ color: 'var(--primary-color)' }}>Get In Touch</h4>

            <p>
              <strong>Email:</strong> support@bookloom.com
            </p>

            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>

            <p>
              <strong>Address:</strong> Calicut, Kerala, India
            </p>

            <p style={{ color: 'var(--text-secondary)' }}>
              Our support team is available Monday to Saturday from 9:00 AM to
              6:00 PM.
            </p>
          </div>
        </div>

        <div className="col-lg-7">
          <form className="p-4 bg-light rounded-4">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn px-4"
              style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff' }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;