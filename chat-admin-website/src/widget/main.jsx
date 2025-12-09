import React from "react";
import ReactDOM from "react-dom/client";
import WidgetApp from "./WidgetApp.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("widget-root")).render(
  <BrowserRouter>
  <WidgetApp/>
  </BrowserRouter>
);
