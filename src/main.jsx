import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import Overlay from "./Overlay.jsx";
import DeliveryForm from "./components/DeliveryForm.jsx";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DeliveryForm />
    {/* <App />
    <Overlay /> */}
  </React.StrictMode>
);
