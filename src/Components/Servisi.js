import React from "react";
import "./Servisi.css";

const Servisi = () => {
  return (
    <div className="servisi-container">
      <h1 className="servisi-title">Servisi i Automjeteve</h1>
      <p className="servisi-description">
        Mirë se vini në servisin tonë të automjeteve! Ne ofrojmë shërbime
        profesionale të riparimit dhe mirëmbajtjes së makinës suaj.
      </p>
      <ul className="servisi-list">
        <li>Diagnostikim dhe eliminim i defekteve</li>
        <li>Ndërrim i vajit dhe filtrave</li>
        <li>Shërbim i sistemit të frenave</li>
        <li>Riparim i motorit dhe transmisionit</li>
        <li>Shërbime të gomisterisë</li>
        <li>Mirëmbajtje dhe servis i rregullt</li>
      </ul>
      <p className="servisi-note">
        Ekipi ynë profesional përdor pajisje moderne dhe pjesë origjinale për të
        siguruar që automjeti juaj të jetë gjithmonë në gjendje të shkëlqyer.
      </p>
      <p className="servisi-note">
        Na kontaktoni dhe caktoni takimin tuaj sot!
      </p>
    </div>
  );
};

export default Servisi;
