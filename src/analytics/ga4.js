// Simple wrapper for react-ga4 usage (you still need to install react-ga4)
import ReactGA from "react-ga4";

export function initGA(measurementId) {
  if (!measurementId) {
    console.warn("GA measurement ID not provided. Set REACT_APP_GA_MEASUREMENT_ID or replace the placeholder.");
    return;
  }
  ReactGA.initialize(measurementId);
}

export function trackPage(path) {
  if (!ReactGA.ga) return;
  ReactGA.send({ hitType: "pageview", page: path });
}

export function trackEvent({ category = "UX", action, label, value }) {
  if (!ReactGA.ga) return;
  ReactGA.event({ category, action, label, value });
}
