import React from "react";
import HeroBackground from "./HeroBackground";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import Services from "./Services";
import FeaturedCars from "./FeaturedCars";
import { FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";

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
      <FeaturedCars />
      <Services />

      {/* Location Map Section */}
      <section className="map-section">
        <div className="map-section-header">
          <h2 className="map-title">Na Gjeni Këtu</h2>
          <p className="map-subtitle">
            Vizitoni sallonin tonë në Autostradën Tiranë–Durrës
          </p>
        </div>
        <div className="map-content">
          <div className="map-info-cards">
            <div className="map-info-card">
              <FaMapMarkerAlt className="map-info-icon" />
              <div>
                <h4>Adresa</h4>
                <p>Autostrada Tiranë–Durrës, Km 33</p>
              </div>
            </div>
            <div className="map-info-card">
              <FaPhone className="map-info-icon" />
              <div>
                <h4>Telefoni</h4>
                <p>+355 69 609 6666</p>
              </div>
            </div>
            <div className="map-info-card">
              <FaClock className="map-info-icon" />
              <div>
                <h4>Orari</h4>
                <p>E Hënë – E Shtunë: 08:00 – 19:00</p>
              </div>
            </div>
          </div>
          <div className="map-embed">
            <iframe
              title="Auto Froler Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2944.073624833601!2d19.4878644!3d41.3390041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134fd7586877ebc1%3A0xfd59dc0a7a4ee5a9!2sFROLER-AUTO%2C%20Vrrin%20Autostrada%20Tirane%20-Durres%20Kilometri%2033%2C%20Durr%C3%ABs%202021%2C%20Albania!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
