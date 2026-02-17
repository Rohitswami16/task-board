import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";
import React from "react";

function PrivateRoute({ children }) {
  const isAuth =
    localStorage.getItem("auth") === "true" ||
    sessionStorage.getItem("auth") === "true";

  return isAuth ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
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

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
