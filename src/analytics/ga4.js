import ReactGA from "react-ga4";

export function initGA(measurementId) {
  if (!measurementId) {
    console.warn("⚠️ GA measurement ID not provided.");
    return;
  }

  ReactGA.initialize(measurementId);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  console.log("✅ Google Analytics initialized:", measurementId);
}

export function trackPage(path) {
  ReactGA.send({ hitType: "pageview", page: path });
}

export function trackEvent({ category = "UX", action, label, value }) {
  ReactGA.event({ category, action, label, value });
}
