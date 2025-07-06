import React, { Component } from "react";
// import logo from "../images/logo.svg";
import carLogo from "..//images/logo-bg.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    isOpen: false,
  };

  navToggler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  closeMenu = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
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
            }}
          >
            {/* Left side: Empty div for spacing */}
            <div style={{ width: "40px" }} />

            {/* Center: Logo */}
            <div
              style={{
                position: "absolute",
                left: "13px",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }}
            >
              <Link to="/" onClick={this.closeMenu}>
                <img
                  src={carLogo}
                  alt="logo official"
                  style={{ height: "70px" }}
                />
              </Link>
            </div>

            {/* Right side: Hamburger menu */}
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
              }}
            >
              {isOpen ? (
                <FaTimes className="nav-icon" />
              ) : (
                <FaBars className="nav-icon" />
              )}
            </button>

            {/* Navigation links */}
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
          </div>
        </nav>
        {isOpen && <div className="nav-overlay" onClick={this.closeMenu} />}
      </>
    );
  }
}
