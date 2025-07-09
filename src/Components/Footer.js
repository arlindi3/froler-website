// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import carLogo from "..//images/logo-bg.png";
// import "./Footer.css";

// export default class Footer extends Component {
//   render() {
//     return (
//       <footer className="footer">
//         <div className="footer-content">
//           {/* Company Info Section - Logo and Social Links at the top */}
//           <div className="footer-header">
//             <div className="footer-logo">
//               <img src={carLogo} alt="Car Dealership Logo" />
//               <h3>Auto Froler</h3>
//             </div>
//             <div className="social-links">
//               <a
//                 href="https://facebook.com"
//                 className="social-link facebook"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaFacebook />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 className="social-link twitter"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaTwitter />
//               </a>
//               <a
//                 href="https://www.instagram.com/auto.froler/"
//                 className="social-link instagram"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaInstagram />
//               </a>
//               <a
//                 href="https://linkedin.com"
//                 className="social-link linkedin"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaLinkedin />
//               </a>
//             </div>
//           </div>

//           {/* Company Description below logo and social icons */}
//           <p className="company-description">
//             Froler është një kompani shqiptare që operon në fushën e shitjes së
//             makinave të reja dhe të përdorura, si dhe ofrimit të shërbimeve
//             profesionale të servisit. Me një përkushtim ndaj cilësisë dhe
//             transparencës, ne i ndihmojmë klientët tanë të gjejnë makinën e
//             duhur për nevojat e tyre, duke ofruar gjithashtu mirëmbajtje dhe
//             përmirësime të garantuara për çdo lloj automjeti. Me një ekip me
//             përvojë dhe një ambient të pajisur me teknologji moderne, Froler
//             siguron eksperiencë të plotë – nga zgjedhja e makinës, prova
//             testuese, blerja e sigurt, deri tek kujdesi pas shitjes.
//           </p>

//           {/* Main footer grid */}
//           <div className="footer-grid">
//             {/* Quick Links Section */}
//             <div className="footer-section quick-links">
//               <h4>Quick Links</h4>
//               <ul>
//                 <li>
//                   <Link to="/">Kryesore</Link>
//                 </li>
//                 <li>
//                   <Link to="/Makinat">Makinat</Link>
//                 </li>
//                 <li>
//                   <Link to="/Servisi">Servisi</Link>
//                 </li>
//                 <li>
//                   <Link to="/Rreth Nesh">Rreth Nesh</Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact Info Section */}
//             <div className="footer-section contact-info">
//               <h4>Kontakti</h4>
//               <div className="contact-item">
//                 <FaMapMarkerAlt className="contact-icon" />
//                 <span>Autostrada Tiranë Durrës Km33</span>
//               </div>
//               <div className="contact-item">
//                 <FaPhone className="contact-icon" />
//                 <span>+355 69 2311606</span>
//               </div>
//               <div className="contact-item">
//                 <FaEnvelope className="contact-icon" />
//                 <span>autofroler@gmail.com</span>
//               </div>
//             </div>

//             {/* Working Hours Section */}
//             <div className="footer-section working-hours-section">
//               <h4>Orët e punës</h4>
//               <div className="working-hours-content">
//                 <p>Hënë - Premte: 9:00 - 18:00</p>
//                 <p>Shtunë: 9:00 - 16:00</p>
//                 <p>E Diel: 9:00 - 16:00</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="footer-bottom">
//           <div className="footer-bottom-content">
//             <p>&copy; 2025 AutoFroler. All rights reserved.</p>
//             <p>Krijuar nga AuraBrand Team</p>
//           </div>
//         </div>
//       </footer>
//     );
//   }
// }
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Kryesore</Link>
              </li>
              <li>
                <Link to="/Makinat">Makinat</Link>
              </li>
              <li>
                <Link to="/Servisi">Servisi</Link>
              </li>
              <li>
                <Link to="/Rreth-Nesh">Rreth Nesh</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Kontakti</h4>
            <p>
              <FaMapMarkerAlt /> Autostrada Tiranë-Durrës Km33
            </p>
            <p>
              <FaPhone /> +355 69 609 6666
            </p>
            <p>
              <FaEnvelope /> autofroler@gmail.com
            </p>
          </div>

          <div className="footer-section">
            <h4>Orët e punës</h4>
            <p>Hënë - Premte: 09:00 - 18:00</p>
            <p>Shtunë & Diel: 09:00 - 16:00</p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com/auto.froler"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            <span
              style={{
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.5px",
                fontSize: "1.05rem",
                textShadow: "0 1px 4px rgba(0,0,0,0.25)",
                display: "inline-block",
                padding: "8px 0",
              }}
            >
              Created By{" "}
              <a
                href="https://www.instagram.com/aura.brand.studio/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  padding: "0 4px",
                  borderRadius: "4px",
                  fontFamily:
                    "'Montserrat', 'Segoe UI', 'Roboto', Arial, sans-serif",
                  letterSpacing: "1px",
                  fontStyle: "italic",
                  fontSize: "1.08rem",
                  transition: "background 0.2s, color 0.2s",
                  boxShadow: "0 2px 8px rgba(0,123,255,0.15)",
                  textDecoration: "none",
                }}
              >
                AuraBrand Studio
              </a>{" "}
              | All Rights Reserved. &copy;{new Date().getFullYear()}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
