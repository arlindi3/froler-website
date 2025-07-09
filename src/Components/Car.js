import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Fallback in case img missing
import defaultImg from "../images/car-1.jpeg";

const Car = ({ car }) => {
  const { name, slug, images, price, km } = car;
  return (
    <article className="car">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single car" />
        <div className="price-top">
          <h6>
            €{typeof price === "number" ? price.toLocaleString("de-DE") : price}
          </h6>
          <p>{km} km</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link
            to={`/Makinat/${slug}`}
            className="btn-primary room-link"
            style={{
              width: "100%",
              maxWidth: "200px",
              textAlign: "center",
              margin: "0.5rem 0",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            }}
          >
            Shiko Makinen
          </Link>
        </div>
      </div>
      <p className="car-info">{name}</p>
    </article>
  );
};

Car.propTypes = {
  car: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
};

export default Car;
