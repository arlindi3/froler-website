import React from "react";
import HeroBackground from "./HeroBackground";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import Services from "./Services";
import FeaturedCars from "./FeaturedCars";

const Home = () => {
  return (
    <>
      <HeroBackground>
        <Banner
          title={
            <span style={{ color: "#fff", textShadow: "2px 2px 8px #000" }}>
              BLINI MAKINËN QË JU NEVOJITET
            </span>
          }
          subtitle={
            <span style={{ color: "#fff", textShadow: "1px 1px 6px #000" }}>
              gjeni makinën e ëndrrave tuaja këtu
            </span>
          }
        >
          <Link
            to="/Makinat"
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
            Makinat Tona
          </Link>
        </Banner>
      </HeroBackground>
      <Services />
      <FeaturedCars />
    </>
  );
};

export default Home;
