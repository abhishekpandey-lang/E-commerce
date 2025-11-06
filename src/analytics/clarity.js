// src/analytics/clarity.js

export function trackClarityEvent(eventName, props = {}) {
  try {
    if (typeof window !== "undefined" && window.clarity) {
      // ✅ सही syntax
      window.clarity("event", eventName, props);
    } else {
      console.log("⚠️ Clarity not loaded yet:", eventName, props);
    }
  } catch (err) {
    console.error("❌ Clarity tracking error:", err);
  }
}
