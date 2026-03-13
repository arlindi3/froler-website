import React, { Component } from "react";
import Title from "./Title";
import { FaCar, FaChartLine, FaBusinessTime, FaRoad } from "react-icons/fa";
import "./Services.css";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCar color="#0A3D5C" size={36} />,
        title: "Test Drive",
        info: "Provoni makinën para blerjes. Sigurohuni për komoditetin dhe performancën.",
      },
      {
        icon: <FaBusinessTime color="#0A3D5C" size={36} />,
        title: "Servis Profesional",
        info: "Kontrolle, ndërrim vaji, diagnozë dhe riparime të shpejta me garanci.",
      },
      {
        icon: <FaRoad color="#0A3D5C" size={36} />,
        title: "Blerje e Sigurtë",
        info: "Modele të certifikuara, çmime konkurruese, gati për rrugë.",
      },
    ],
  };

  render() {
    let { services } = this.state;

    const servicesList = services.map((service, index) => {
      let { icon, title, info } = service;
      return (
        <article key={index} className="service-card simple-card">
          <div className="service-icon simple-icon">{icon}</div>
          <div className="service-content">
            <h6 className="service-title simple-title">{title}</h6>
            <p className="service-info simple-info">{info}</p>
          </div>
        </article>
      );
    });
    return (
      <section className="services simple-services-bg">
        <Title title="Shërbimet tona" />
        <div className="services-center simple-services-center">
          {servicesList}
        </div>
      </section>
    );
  }
}
