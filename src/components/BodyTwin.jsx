import React from "react";

const zonePositions = {
  heart: { cx: 110, cy: 170, r: 18 },
  brain: { cx: 110, cy: 60, rx: 18, ry: 15 },
  lungs: { cx: 110, cy: 120, rx: 28, ry: 18 },
  gut: { cx: 110, cy: 270, rx: 22, ry: 15 },
  joints: { cx: 110, cy: 380, rx: 23, ry: 12 }
};

const zoneColor = (value) => {
  if (value < 0.33) return "var(--primary-green)";
  if (value < 0.66) return "var(--primary-yellow)";
  return "var(--primary-red)";
};

export default function BodyTwin({ metrics, onZoneClick }) {
  return (
    <svg viewBox="0 0 220 480" width="100%" height="auto" role="img">
      <ellipse cx="110" cy="240" rx="60" ry="180" fill="#ececec" />
      <ellipse cx="110" cy="60" rx="35" ry="35" fill="#e3e3e3" />

      {Object.entries(metrics).map(([key, { value, zone, label }]) => {
        // skip if no position for zone
        if (!zonePositions[zone]) return null;

        const pos = zonePositions[zone];
        const fill = zoneColor(value);

        const commonProps = {
          key,
          fill,
          onClick: () => onZoneClick(label),
          style: { cursor: "pointer" },
          "aria-label": `${label}: ${value}`,
          tabIndex: 0,
        };

        if (pos.r) {
          return <circle cx={pos.cx} cy={pos.cy} r={pos.r} {...commonProps} />;
        }
        return <ellipse cx={pos.cx} cy={pos.cy} rx={pos.rx} ry={pos.ry} {...commonProps} />;
      })}
    </svg>
  );
}
