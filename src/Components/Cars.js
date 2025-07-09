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
          <Link
            to="/"
            className="btn-primary"
            style={{
              color: "#fff",
              backgroundColor: "#0a3d5c",
              border: "none",
              padding: "0.7rem 2rem",
              fontWeight: "500",
              fontSize: "1rem",
              borderRadius: "3px",
              letterSpacing: "0.5px",
              boxShadow: "none",
              textShadow: "none",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Ktheu tek Kryesoret
          </Link>
        </Banner>
      </HeroBackground>
      <CarsContainer />
    </>
  );
};

export default Cars;
