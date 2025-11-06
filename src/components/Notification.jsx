import { useEffect } from "react";
import { trackClarityEvent } from "../analytics/clarity"; // ✅ Clarity import

function Notification({ message, onClose, duration = 900 }) {
  useEffect(() => {
    if (!message) return;

    const notificationId = Date.now().toString(); // 🔹 unique ID

    // 🎯 GA4: Notification Shown
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "notification_shown", {
        event_category: "User Interaction",
        event_label: message,
        notification_id: notificationId,
      });
    } else {
      console.log("GA: notification_shown →", message);
    }

    // 🔹 Microsoft Clarity: Notification Shown
    trackClarityEvent("NotificationShown", { message, notificationId });

    // 🔹 Auto-close after duration
    const timer = setTimeout(() => {
      onClose?.();

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "notification_closed_auto", {
          event_category: "User Interaction",
          event_label: message,
          notification_id: notificationId,
        });
      } else {
        console.log("GA: notification_closed_auto →", message);
      }

      trackClarityEvent("NotificationClosedAuto", { message, notificationId });
    }, duration);

    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div
        className="backdrop-blur-md bg-black/70 text-white px-6 py-3 
                   rounded-xl shadow-lg font-medium flex items-center gap-3
                   animate-bounce-in max-w-xs sm:max-w-sm"
      >
        <span className="truncate">{message}</span>
        <button
          onClick={() => {
            onClose?.();

            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "notification_closed_manual", {
                event_category: "User Interaction",
                event_label: message,
              });
            } else {
              console.log("GA: notification_closed_manual →", message);
            }

            trackClarityEvent("NotificationClosedManual", { message });
          }}
          className="ml-2 font-bold hover:text-gray-300 text-lg"
          aria-label="Close notification"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default Notification;
