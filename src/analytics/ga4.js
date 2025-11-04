// analytics/ga4.js
import ReactGA from "react-ga4";

export function initGA(measurementId) {
  if (!measurementId) {
    console.warn("GA measurement ID not provided!");
    return;
  }
  ReactGA.initialize(measurementId);
}

export function trackPage(path) {
  ReactGA.send({ hitType: "pageview", page: path });
}

export function trackEvent({ category = "User", action, label, value }) {
  ReactGA.event({ category, action, label, value });
}
