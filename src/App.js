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
import Admin from "./Components/Admin";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <CarProvider>
      <Switch>
        {/* Admin panel – no Navbar/Footer */}
        <Route path="/admin" component={Admin} />

        {/* Public site */}
        <Route>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/makinat" component={Cars} />
            <Route exact path="/makinat/:slug" component={SingleCar} />
            <Route exact path="/servisi" component={Servisi} />
            <Route exact path="/rreth-nesh" component={RrethNesh} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer />
        </Route>
      </Switch>
    </CarProvider>
  );
}

export default App;
