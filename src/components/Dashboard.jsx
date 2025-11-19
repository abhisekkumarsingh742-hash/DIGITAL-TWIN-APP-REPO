import React, { useState, useEffect, useRef } from "react";
import BodyTwin from "./BodyTwin";
import MetricCard from "./MetricCard";
import initialMetrics from "../data/mockMetrics.json";

const zonePositionsTooltip = {
  heart: { x: 110, y: 170 },
  brain: { x: 110, y: 60 },
  lungs: { x: 110, y: 120 },
  gut: { x: 110, y: 270 },
  joints: { x: 110, y: 380 }
};

const zoneColor = (value) => {
  if (value < 0.33) return "var(--primary-green)";
  if (value < 0.66) return "var(--primary-yellow)";
  return "var(--primary-red)";
};

export default function Dashboard() {
  // Convert initial metrics object to local state
  const [metrics, setMetrics] = useState(initialMetrics);
  const [editMetrics, setEditMetrics] = useState(initialMetrics);
  const [selectedZone, setSelectedZone] = useState(null);
  const tooltipRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  // Update tooltip position when zone clicked
  useEffect(() => {
    if (!selectedZone) return;
    const metricEntry = Object.entries(metrics).find(
      ([, { label }]) => label === selectedZone
    );
    if (!metricEntry) return;
    const [, { zone }] = metricEntry;

    const svg = document.querySelector("svg");
    if (svg && tooltipRef.current && zonePositionsTooltip[zone]) {
      const pt = svg.createSVGPoint();
      pt.x = zonePositionsTooltip[zone].x;
      pt.y = zonePositionsTooltip[zone].y;
      const screenCTM = svg.getScreenCTM();
      if (screenCTM) {
        const screenPoint = pt.matrixTransform(screenCTM);
        setTooltipPos({ top: screenPoint.y - 40, left: screenPoint.x + 15 });
      }
    }
  }, [selectedZone, metrics]);

  // Handle zone click from the SVG
  const handleZoneClick = (zoneLabel) => {
    setSelectedZone(selectedZone === zoneLabel ? null : zoneLabel);
  };

  // Handle input changes in the form
  const handleInputChange = (key, field, newValue) => {
    setEditMetrics((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]:
          field === "value"
            ? // coerce value to number for numeric inputs
              isNaN(Number(newValue))
              ? newValue
              : Number(newValue)
            : newValue,
      },
    }));
  };

  // Apply edited data to live metrics state
  const handleSave = () => {
    setMetrics(editMetrics);
    setSelectedZone(null);
  };

  // Cancel edits and reset form inputs
  const handleCancel = () => {
    setEditMetrics(metrics);
    setSelectedZone(null);
  };

  return (
    <div className="dashboard">
      <div className="twin-panel" style={{ position: "relative" }}>
        <BodyTwin metrics={metrics} onZoneClick={handleZoneClick} />

        {selectedZone && (
          <div
            className="zone-tooltip"
            ref={tooltipRef}
            style={{ top: tooltipPos.top, left: tooltipPos.left, position: "fixed" }}
            role="tooltip"
          >
            <strong>{selectedZone}</strong>:
            {" "}
            {
              Object.entries(metrics).find(
                ([, { label }]) => label === selectedZone
              )?.[1].value
            }
          </div>
        )}
      </div>

      <div className="metrics-panel">
        {/* Editable form for each metric */}
        {Object.entries(editMetrics).map(([key, { label, value }]) => (
          <div key={key} className="metric-card" style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            <label htmlFor={key} style={{ fontWeight: "600" }}>{label}</label>
            <input
              type="text"
              id={key}
              value={value}
              onChange={(e) => handleInputChange(key, "value", e.target.value)}
              style={{ padding: "0.4rem 0.6rem", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem" }}
              aria-label={`Edit value for ${label}`}
            />
          </div>
        ))}

        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "0.6rem 1.2rem",
              backgroundColor: "var(--primary-green)",
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            aria-label="Apply and save new data"
          >
            Apply & Save
          </button>
          <button
            onClick={handleCancel}
            style={{
              padding: "0.6rem 1.2rem",
              backgroundColor: "#aaa",
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            aria-label="Cancel edits and reset form"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

