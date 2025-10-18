import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Per usare Atatus, riattivare queste righe
// import * as atatus from "atatus-spa";
// atatus.config("16fc4beee9b040f7a92d9b77cbd63e7b").install();
// atatus.notify(new Error('Test Atatus Setup'));

// Importa la registrazione del service worker
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registra il service worker per rendere la PWA installabile
serviceWorkerRegistration.register();
