import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Forms/Login";
import Overview from "./pages/Overview.tsx";
import Fertilizer from "./pages/Fertilizer";

function App() {
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard/*"
        element={token === "" ? <Navigate to="/" /> : <Dashboard />}
      >
        <Route index path="overview" element={<Overview />} />
        <Route path="fertilizer" element={<Fertilizer />} />
      </Route>
    </Routes>
  );
}

export default App;
