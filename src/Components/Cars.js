import React from "react";
import HeroBackground from "./HeroBackground";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import CarsContainer from "./CarsContainer";

const Cars = () => {
  return (
    <>
      <HeroBackground hero="carsHero">
        <Banner
          title={
            <span
              style={{
                color: "#fff",
                textShadow: "2px 2px 8px #000",
                letterSpacing: "2px",
              }}
            >
              Makinat Tona
            </span>
          }
        >
          <Link to="/" className="btn-primary">
            Ktheu tek Kryesoret
          </Link>
        </Banner>
      </HeroBackground>
      <CarsContainer />
    </>
  );
};

export default Cars;
