import React from "react";
import "./RrethNesh.css";

const RrethNesh = () => {
  return (
    <div className="rrethnesh-container">
      <h1 className="rrethnesh-title">Rreth Nesh</h1>
      <p className="rrethnesh-lead">
        <strong>Auto Froler</strong> është një kompani shqiptare me përvojë të
        gjatë në tregun e automjeteve, e specializuar në shitjen e makinave të
        reja dhe të përdorura, si dhe ofrimin e shërbimeve të plota të servisit.
      </p>
      <div className="rrethnesh-content">
        <div className="rrethnesh-section">
          <h2>Çfarë ofrojmë?</h2>
          <ul className="rrethnesh-list">
            <li>Shitje të makinave të reja dhe të përdorura</li>
            <li>Konsulencë profesionale për zgjedhjen e automjetit</li>
            <li>Financim dhe lehtësira pagese</li>
            <li>Shërbime të plota servisi dhe mirëmbajtjeje</li>
            <li>Garanci për automjetet dhe pjesët e këmbimit</li>
            <li>Prova testuese për çdo makinë</li>
            <li>Shërbim të shpejtë dhe të besueshëm</li>
          </ul>
        </div>
        <div className="rrethnesh-section">
          <h2>Pse të zgjidhni Auto Froler?</h2>
          <ul className="rrethnesh-list">
            <li>Staf i kualifikuar dhe me përvojë</li>
            <li>Transparencë dhe korrektësi në çdo hap</li>
            <li>Çmime konkurruese dhe oferta të personalizuara</li>
            <li>Ambiente moderne dhe mikpritëse</li>
            <li>Mbështetje pas shitjes dhe këshillim i vazhdueshëm</li>
          </ul>
        </div>
      </div>
      <div className="rrethnesh-quote">
        <em>
          "Misioni ynë është të ofrojmë eksperiencën më të mirë të blerjes dhe
          servisit të makinës, duke ndërtuar besim dhe marrëdhënie afatgjata me
          klientët tanë."
        </em>
      </div>
    </div>
  );
};

export default RrethNesh;
