import React from "react";
import * as ReactDOM from "react-dom";
import App from "Components/App";
import "bootstrap/dist/css/bootstrap.css";
import "Styles/main.css";
import "polyfills";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then((registration) => {
      console.log("SW registered: ", registration);
    }).catch((registrationError) => {
      console.log("SW registration failed: ", registrationError);
    });
  });
}

if (!window.Intl) {
  require.ensure([], () => {
    require("intl");

    ReactDOM.render(<App />, document.getElementById("root"));
  });
} else {
  ReactDOM.render(<App />, document.getElementById("root"));
}
