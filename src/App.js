import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  // Dark mode toggle state
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          padding: "6px 12px",
          borderRadius: "8px",
          backgroundColor: darkMode ? "#38b000" : "#555",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          zIndex: 999,
        }}
        aria-label="Toggle dark/light mode"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <Dashboard />
    </>
  );
}
