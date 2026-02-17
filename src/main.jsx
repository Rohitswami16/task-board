import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BoardProvider } from "./context/BoardContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BoardProvider>
      <App />
    </BoardProvider>
  </React.StrictMode>
);
