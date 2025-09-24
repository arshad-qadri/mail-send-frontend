// src/App.jsx
import React from "react";
import "./index.css";
import "./App.css";
import EmailForm from "./components/EmailForm";
import LoginPage from "./components/Login";

function App() {
  const token = localStorage.getItem("token");
  if (token) return <EmailForm />;
  else return <LoginPage />;
}

export default App;
