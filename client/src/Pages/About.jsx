import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <h2 className="mb-4">Discover Our Story</h2>
          <p>
            Welcome to <strong>MarketX</strong> - your go-to destination for a
            unique and delightful shopping experience. We believe in bringing
            people together through an array of carefully curated products,
            designed to enhance your lifestyle and bring joy to your everyday
            moments.
          </p>
          <p>
            At MarketX, we strive to create a platform that not only offers
            exceptional products but also fosters a sense of community. Explore
            our diverse range of categories, from fashion to electronics, and
            discover the perfect items that reflect your style and personality.
          </p>
          <p>
            Our commitment to quality, innovation, and customer satisfaction
            sets us apart. Join us on this journey, and let MarketX be your
            trusted companion in making every purchase a delightful experience.
          </p>
          <Link to="/categories" className="btn btn-outline-primary mt-3">
            Explore Categories
          </Link>
        </div>
        <div className="col-lg-4">
          <img
            src="https://via.placeholder.com/300"
            alt="About Us"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
