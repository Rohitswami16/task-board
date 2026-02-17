import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BoardProvider } from "./context/BoardContext";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BoardProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </BoardProvider>
  </React.StrictMode>,
);
