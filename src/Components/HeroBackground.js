import React from "react";

const HeroBackground = ({ children, hero = "defaultHero" }) => {
  return <header className={hero}>{children}</header>;
};

export default HeroBackground;
