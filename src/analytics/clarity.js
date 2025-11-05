export function trackClarityEvent(eventName, props) {
  if (window.clarity) {
    window.clarity(eventName, props);
  }
}
