import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BoardProvider } from "./context/BoardContext";
import { HashRouter } from "react-router-dom"; // ✅ import HashRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BoardProvider>
      <HashRouter> {/* ✅ Wrap App with HashRouter */}
        <App />
      </HashRouter>
    </BoardProvider>
  </React.StrictMode>
);