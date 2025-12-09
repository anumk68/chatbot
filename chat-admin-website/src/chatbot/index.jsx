import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import '../index.css'; // import your Tailwind CSS

function mountWidget() {
  // Prevent multiple mounts
  if (document.getElementById("digichat-widget-root")) return;

  const root = document.createElement("div");
  root.id = "digichat-widget-root";

  document.body.appendChild(root);
  ReactDOM.createRoot(root).render(<App />);
}

window.DigiChatWidgetMount = mountWidget;

// auto mount after load
window.addEventListener("DOMContentLoaded", mountWidget);
setTimeout(mountWidget, 300);
