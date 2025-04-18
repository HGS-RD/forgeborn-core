import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./src/index.css"; // or "./src/theme.css" if you're using that

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
