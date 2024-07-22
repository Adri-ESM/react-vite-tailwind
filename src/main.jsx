import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Pages/App";
import "./index.css";
import { ApiDataProvider } from "./Contexts/ContextApi/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiDataProvider>
      <App />
    </ApiDataProvider>
  </React.StrictMode>
);
