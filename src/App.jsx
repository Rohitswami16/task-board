import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";

// PrivateRoute component
function PrivateRoute({ children }) {
  const isAuth =
    localStorage.getItem("auth") === "true" ||
    sessionStorage.getItem("auth") === "true";

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 transition-all duration-500">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/board"
          element={
            <PrivateRoute>
              <div className="animate-fadeIn">
                <Board />
              </div>
            </PrivateRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
