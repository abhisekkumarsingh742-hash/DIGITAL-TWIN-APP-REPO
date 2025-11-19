import React from "react";

export default function MetricCard({ label, value, color }) {
  // Format values like percentages nicely
  const formattedValue =
    typeof value === "number" && value <= 1 ? (value * 100).toFixed(0) + "%" : value;

  return (
    <div
      className="metric-card"
      tabIndex="0"
      aria-label={`${label} at ${formattedValue}`}
      style={{ borderColor: color }}
    >
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={{ backgroundColor: color }}>
        {formattedValue}
      </div>
    </div>
  );
}
