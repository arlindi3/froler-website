import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom"; // <-- ndryshuar këtu
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CarProvider } from "./context";

ReactDOM.render(
  <CarProvider>
    <Router>
      <App />
    </Router>
  </CarProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
