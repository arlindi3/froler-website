import React from "react";
import "./Styles.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Cars from "./Components/Cars";
import SingleCar from "./Components/SingleCar";
import ErrorPage from "./Components/ErrorPage";
import Footer from "./Components/Footer";
import { CarProvider } from "./context";
import Servisi from "./Components/Servisi";
import RrethNesh from "./Components/RrethNesh";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <CarProvider>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Makinat" component={Cars} />
        <Route exact path="/Makinat/:slug" component={SingleCar} />
        <Route exact path="/Servisi" component={Servisi} />
        <Route exact path="/Rreth Nesh" component={RrethNesh} />

        <Route component={ErrorPage} />
      </Switch>

      <Footer />
    </CarProvider>
  );
}

export default App;
