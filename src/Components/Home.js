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
              backgroundColor: "#222",
              border: "1px solid #fff",
              textShadow: "1px 1px 4px #000",
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
