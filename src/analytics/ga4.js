// analytics/ga4.js
import ReactGA from "react-ga4";

// 🔹 Get GA Measurement ID from .env
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initGA() {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

export function trackPage(path) {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.send({ hitType: "pageview", page: path });
}

export function trackEvent({ category = "User", action, label, value }) {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.event({ category, action, label, value });
}
