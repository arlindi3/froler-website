import React, { Component } from "react";
import Title from "./Title";
import { FaCar, FaChartLine, FaBusinessTime, FaRoad } from "react-icons/fa";
import "./Services.css";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCar color="#05284d" size={40} />,
        title: "Testoni makinën tonë!",
        info: "Përpara se të vendosni, provoni makinën tuaj të ardhshme! Me një test praktik, ju siguroheni për komoditetin dhe performancën që kërkoni.",
      },
      {
        icon: <FaChartLine color="#05284d" size={40} />,
        title: "Përmirësime të performancës",
        info: "Rrisni fuqinë dhe efikasitetin e makinës tuaj me shërbimet tona të avancuara për përmirësime mekanike dhe elektronike.",
      },
      {
        icon: <FaBusinessTime color="#05284d" size={40} />,
        title: "Servis",
        info: "Ofrojmë kontrolle të plota, ndërrim vaji, diagnozë kompjuterike dhe çdo riparim që makina juaj ka nevojë – shpejt, saktë dhe me garanci.",
      },
      {
        icon: <FaRoad color="#05284d" size={40} />,
        title: " Bli makinë",
        info: "Zgjidh makinën që të përshtatet! Modele të përzgjedhura, të certifikuara dhe me çmime konkurruese – gati për të nisur rrugën me ty.",
      },
    ],
  };

  render() {
    let { services } = this.state;

    const servicesList = services.map((service, index) => {
      let { icon, title, info } = service;

      return (
        <article key={index} className="service-card enhanced-card">
          <div className="service-icon enhanced-icon">{icon}</div>
          <h6 className="service-title enhanced-title">{title}</h6>
          <p className="service-info enhanced-info">{info}</p>
        </article>
      );
    });

    return (
      <section className="services enhanced-services-bg">
        <Title title="Shërbimet tona" />
        <div className="services-center enhanced-services-center">
          {servicesList}
        </div>
      </section>
    );
  }
}
