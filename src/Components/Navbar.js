import React, { Component } from "react";
// import logo from "../images/logo.svg";
import carLogo from "..//images/logo-bg.png";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    isOpen: false,
    isMobile: window.innerWidth <= 768,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      isMobile: window.innerWidth <= 768,
      isOpen: window.innerWidth > 768 ? false : this.state.isOpen,
    });
  };

  navToggler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  closeMenu = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, isMobile } = this.state;
    return (
      <>
        <nav
          className="navbar"
          style={{
            backgroundColor: "#0a3d5c",
          }}
        >
          <div
            className="nav-center"
            style={{
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1rem",
            }}
          >
            {/* Left side: Hamburger menu (mobile only) */}
            <button
              onClick={this.navToggler}
              type="button"
              className="nav-btn"
              style={{
                height: "40px",
                width: "40px",
                background: "none",
                border: "none",
                color: "white",
                zIndex: 2,
                marginLeft: "8px",
                display: isMobile ? "block" : "none",
              }}
              id="nav-hamburger"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <FaTimes className="nav-icon" style={{ fontSize: "1.5rem" }} />
              ) : (
                <FaBars className="nav-icon" style={{ fontSize: "1.5rem" }} />
              )}
            </button>

            {/* Center: Logo */}
            <div
              className="navbar-logo"
              style={{
                display: "flex",
                alignItems: "center",
                zIndex: 1,
                position: isMobile ? "absolute" : "static",
                left: isMobile ? "50%" : "auto",
                transform: isMobile ? "translateX(-50%)" : "none",
              }}
            >
              <Link to="/" onClick={this.closeMenu}>
                <img
                  src={carLogo}
                  alt="logo official"
                  style={{
                    height: window.innerWidth <= 480 ? "60px" : "70px",
                    transition: "height 0.3s ease",
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <li>
                  <Link
                    to="/"
                    onClick={this.closeMenu}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1rem",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#af9a7d")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                  >
                    Kryesore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Makinat"
                    onClick={this.closeMenu}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1rem",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#af9a7d")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                  >
                    Makinat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Servisi"
                    onClick={this.closeMenu}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1rem",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#af9a7d")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                  >
                    Servisi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Rreth Nesh"
                    onClick={this.closeMenu}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1rem",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#af9a7d")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                  >
                    Rreth Nesh
                  </Link>
                </li>
              </ul>
            )}

            {/* Right side: WhatsApp link */}
            <div
              className="whatsapp-link"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "8px",
                zIndex: 2,
              }}
            >
              <a
                href="https://wa.me/+355696096666"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp: +355 69 609 6666"
                style={{
                  color: "#25D366",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: isMobile ? "1.2rem" : "1rem",
                  gap: "6px",
                  padding: 0,
                  border: "none",
                  background: "none",
                  borderRadius: 0,
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#128C7E";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#25D366";
                }}
              >
                <FaWhatsapp
                  style={{ fontSize: isMobile ? "1.2rem" : "1.1rem" }}
                />
                {!isMobile && (
                  <span
                    className="whatsapp-number"
                    style={{
                      whiteSpace: "nowrap",
                      fontFamily: "monospace",
                    }}
                  >
                    +355 69 609 6666
                  </span>
                )}
              </a>
            </div>

            {/* Mobile Navigation Links */}
            {isMobile && (
              <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
                <li>
                  <Link to="/" onClick={this.closeMenu}>
                    Kryesore
                  </Link>
                </li>
                <li>
                  <Link to="/Makinat" onClick={this.closeMenu}>
                    Makinat
                  </Link>
                </li>
                <li>
                  <Link to="/Servisi" onClick={this.closeMenu}>
                    Servisi
                  </Link>
                </li>
                <li>
                  <Link to="/Rreth Nesh" onClick={this.closeMenu}>
                    Rreth Nesh
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
        {isOpen && <div className="nav-overlay" onClick={this.closeMenu} />}

        {/* Responsive Styles */}
        <style>{`
        .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 247, 247, 0.95) 100%);
        backdrop-filter: blur(20px);
        flex-direction: column;
        align-items: flex-start;
        height: 0;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        border-radius: 0 0 20px 20px;
        list-style: none;
        margin: 0;
        padding: 0;
        }
        
        .nav-links.show-nav {
        height: 240px;
        animation: slideDown 0.4s ease-out;
        }
        
        @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
        }
        
        .nav-links li {
        margin: 0;
        width: 100%;
        opacity: 0;
        transform: translateX(-20px);
        }
        
        .nav-links.show-nav li {
        opacity: 1;
        transform: translateX(0);
        animation: slideIn 0.3s ease-out forwards;
        }
        
        .nav-links.show-nav li:nth-child(1) { animation-delay: 0.1s; }
        .nav-links.show-nav li:nth-child(2) { animation-delay: 0.2s; }
        .nav-links.show-nav li:nth-child(3) { animation-delay: 0.3s; }
        .nav-links.show-nav li:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes slideIn {
        to {
          opacity: 1;
          transform: translateX(0);
        }
        }
        
        .nav-links a {
        display: block;
        width: 100%;
        padding: 1.2rem 2rem;
        border-bottom: 1px solid rgba(175, 154, 125, 0.2);
        text-align: left;
        color: #333 !important;
        font-weight: 600;
        text-decoration: none;
        position: relative;
        transition: all 0.3s ease;
        border-radius: 0;
        }
        
        .nav-links a:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(135deg, #af9a7d, #e9bc7d);
        transform: scaleY(0);
        transition: transform 0.3s ease;
        }
        
        .nav-links a:hover {
        background: linear-gradient(135deg, rgba(175, 154, 125, 0.1), rgba(233, 188, 125, 0.1));
        padding-left: 2.5rem;
        color: #af9a7d !important;
        transform: translateX(5px);
        }
        
        .nav-links a:hover:before {
        transform: scaleY(1);
        }
        
        .nav-links li:last-child a {
        border-bottom: none;
        border-radius: 0 0 20px 20px;
        }
        
        .nav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
        }
        
        /* Global body adjustment for fixed navbar */
        /* body {
        padding-top: 80px;
        } */
        
        /* Ensure smooth transitions on resize */
        * {
        box-sizing: border-box;
        }
        
        /* Responsive adjustments */
        @media screen and (max-width: 480px) {
        .nav-center {
          padding: 0 0.5rem !important;
        }
        
        .whatsapp-link a {
          padding: 0 !important;
          font-size: 1rem !important;
        }
        }
      `}</style>
      </>
    );
  }
}
