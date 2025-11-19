# Human Digital Twin Interface

## Overview
This project is a React-based human digital twin visualization prototype showing a body silhouette with key health indicators (heart, brain, lungs, gut, joints).

## Features
- Responsive dashboard combining body visualization and metric cards.
- Calm, minimal, accessible UI design.
- CSS animations: heartbeat pulse and breathing effects.
- Clickable body zones showing detailed tooltips.
- Dark/light mode toggle.
- Optimized for fast local loading and smooth animations.

## Design Decisions
- SVG chosen for fast, scalable rendering of body zones.
- CSS keyframes for efficient animations without JS overhead.
- Flexbox and grid used for responsive, clean layouts.
- Color blind friendly palettes and ARIA roles for accessibility.

## How to Run
1. `npm install` - Install dependencies
2. `npm start` - Start development server at `localhost:3000`
3. Open in browser and interact.

## Usage Guide
- The dashboard shows a human body with highlighted zones corresponding to health metrics.
- The right-side panel (or below on mobile) displays editable metric cards.
- Edit any metric's value in the input fields and click **Apply & Save** to reflect changes.
- Click any body zone or metric card to see detailed tooltips.
- Use the dark/light toggle button at the top right to switch themes.

## Design & UX Decisions
- **Minimalist & Calm:** Soft neutral colors with green-yellow-red coding for health states.
- **Accessibility:** ARIA labels and keyboard support for inclusive use.
- **Animations:** Subtle heartbeat and breathing keep the UI alive without distraction.
- **Responsive Layout:** Flexbox and CSS grid adapt content smoothly to different screen sizes.

## Technical Details
- **Framework:** React with functional components and hooks.
- **Rendering:** SVG for crisp scalable graphics without extra assets.
- **State Management:** Local React state for dynamically editable metrics.
- **Styling:** CSS variables enable easy dark/light mode switching.
- **Performance:** Pure CSS animations and light assets ensure sub-2-second load times locally.

## Future Improvements
- Connect metrics to live healthcare APIs or sensors.
- Store edits persistently using backend or local storage.
- Extend visualization to 3D with React Three Fiber.
- Add historical trend charts and analytics.

