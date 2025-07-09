import React, { Component } from "react";
import defaultBcg from "../images/car-2.jpg";
// import Hero from './HeroBackground'
import Banner from "./Banner";
import { Link } from "react-router-dom";
import { CarContext } from "../context"; // Changed from "../Context" to "../context"
import StyledHeroBackground from "./StyledHeroBackground";

export default class SingleCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
    };
  }

  static contextType = CarContext;

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

    return (
      <>
        <StyledHeroBackground img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name}`}>
            <Link to="/Makinat" className="btn-primary">
              Kthehu tek makinat
            </Link>
          </Banner>
        </StyledHeroBackground>

        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })}
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
      </>
    );
  }
}
