import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CarProvider } from "./context";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <CarProvider>
    <Router>
      <App />
    </Router>
  </CarProvider>,
);

serviceWorker.unregister();
