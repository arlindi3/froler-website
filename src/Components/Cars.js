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
            className="btn-primary hero-cta"
            style={{
              color: "#fff",
              backgroundColor: "#0A3D5C",
              border: "2px solid #0A3D5C",
              padding: "0.85rem 2.8rem",
              fontWeight: "600",
              fontSize: "1.05rem",
              borderRadius: "50px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              boxShadow: "0 4px 20px rgba(10,61,92,0.35)",
              textShadow: "none",
              transition: "all 0.3s ease",
              position: "relative",
              zIndex: 2,
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
