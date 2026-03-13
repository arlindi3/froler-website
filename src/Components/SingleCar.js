import React, { Component } from "react";
import defaultBcg from "../images/car-2.jpg";
// import Hero from './HeroBackground'
import Banner from "./Banner";
import { Link } from "react-router-dom";
import { CarContext } from "../context"; // Changed from "../Context" to "../context"
import StyledHeroBackground from "./StyledHeroBackground";

class ImageLightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: props.startIndex || 0 };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
    document.body.style.overflow = "";
  }

  handleKey = (e) => {
    if (e.key === "Escape") this.props.onClose();
    if (e.key === "ArrowRight") this.next();
    if (e.key === "ArrowLeft") this.prev();
  };

  next = () => {
    this.setState((s) => ({
      current: (s.current + 1) % this.props.images.length,
    }));
  };

  prev = () => {
    this.setState((s) => ({
      current:
        (s.current - 1 + this.props.images.length) % this.props.images.length,
    }));
  };

  render() {
    const { images, onClose } = this.props;
    const { current } = this.state;

    return (
      <div className="lightbox-overlay" onClick={onClose}>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={onClose}>
            ✕
          </button>

          {images.length > 1 && (
            <button
              className="lightbox-arrow lightbox-prev"
              onClick={this.prev}
            >
              ‹
            </button>
          )}

          <img
            src={images[current]}
            alt={`Photo ${current + 1}`}
            className="lightbox-img"
          />

          {images.length > 1 && (
            <button
              className="lightbox-arrow lightbox-next"
              onClick={this.next}
            >
              ›
            </button>
          )}

          <div className="lightbox-counter">
            {current + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <div className="lightbox-thumbs">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumb ${i + 1}`}
                  className={`lightbox-thumb ${i === current ? "lightbox-thumb-active" : ""}`}
                  onClick={() => this.setState({ current: i })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default class SingleCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
      lightboxOpen: false,
      lightboxIndex: 0,
      currentSlide: 0,
    };
  }

  static contextType = CarContext;

  openLightbox = (index) => {
    this.setState({ lightboxOpen: true, lightboxIndex: index });
  };

  closeLightbox = () => {
    this.setState({ lightboxOpen: false });
  };

  nextSlide = (total) => {
    this.setState((s) => ({ currentSlide: (s.currentSlide + 1) % total }));
  };

  prevSlide = (total) => {
    this.setState((s) => ({
      currentSlide: (s.currentSlide - 1 + total) % total,
    }));
  };

  goToSlide = (index) => {
    this.setState({ currentSlide: index });
  };

  render() {
    const { getCar } = this.context;
    const car = getCar(this.state.slug);

    if (!car) {
      return (
        <div className="error">
          <h3>Makina nuk është në dispozicion...</h3>
          <Link to="/Makinat" className="btn-primary">
            Ktheu tek makinat
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      carMake,
      size,
      price,
      extras,
      gps,
      sportPackage,
      images,
      year,
    } = car;
    const [mainImg, ...defaultImg] = images;
    const allImages =
      images && images.length > 0 ? images : [this.state.defaultBcg];

    return (
      <>
        <StyledHeroBackground img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name}`}>
            <Link to="/makinat" className="btn-primary">
              Kthehu tek makinat
            </Link>
          </Banner>
        </StyledHeroBackground>

        <section className="single-room">
          <div className="carousel-container">
            <div className="carousel-main">
              <img
                src={allImages[this.state.currentSlide]}
                alt={`${name} - ${this.state.currentSlide + 1}`}
                className="carousel-main-img"
                onClick={() => this.openLightbox(this.state.currentSlide)}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    className="carousel-arrow carousel-arrow-left"
                    onClick={() => this.prevSlide(allImages.length)}
                  >
                    ‹
                  </button>
                  <button
                    className="carousel-arrow carousel-arrow-right"
                    onClick={() => this.nextSlide(allImages.length)}
                  >
                    ›
                  </button>
                  <div className="carousel-counter">
                    {this.state.currentSlide + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="carousel-thumbs">
                {allImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${name} thumb ${i + 1}`}
                    className={`carousel-thumb ${i === this.state.currentSlide ? "carousel-thumb-active" : ""}`}
                    onClick={() => this.goToSlide(i)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>detajet</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>
                çmimi: €
                {typeof price === "number"
                  ? price.toLocaleString("de-DE")
                  : price}
              </h6>
              <h6>Kapaciteti Sabratorit: {size} L</h6>
              <h6>Prodhuesi: {carMake}</h6>
              <h6>
                Paketa Sportive:{" "}
                {sportPackage
                  ? "motor sportiv me performancë të lartë"
                  : "i padisponueshëm"}
              </h6>
              <h6>GPS: {gps ? "e përfshirë" : "i padisponueshëm"}</h6>
              <h6>Viti: {year}</h6>
            </article>
          </div>
        </section>

        <section className="car-extras">
          <h6>Veçoritë premium</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>- {item}</li>;
            })}
          </ul>
        </section>

        {this.state.lightboxOpen && (
          <ImageLightbox
            images={allImages}
            startIndex={this.state.lightboxIndex}
            onClose={this.closeLightbox}
          />
        )}
      </>
    );
  }
}
