import { useEffect } from "react";

function Notification({ message, onClose }) {
  useEffect(() => {
    if (!message) return;

    const notificationId = Date.now().toString(); // 🔹 unique ID

    // 🎯 Google Analytics: Notification Shown
    if (typeof gtag !== "undefined") {
      gtag("event", "notification_shown", {
        event_category: "User Interaction",
        event_label: message,
        notification_id: notificationId,
      });
    } else {
      console.log("GA: notification_shown →", message);
    }

    // 🔹 Auto-close after 900ms
    const timer = setTimeout(() => {
      onClose();

      // 🎯 GA: Auto Closed
      if (typeof gtag !== "undefined") {
        gtag("event", "notification_closed_auto", {
          event_category: "User Interaction",
          event_label: message,
          notification_id: notificationId,
        });
      } else {
        console.log("GA: notification_closed_auto →", message);
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div
        className="backdrop-blur-md bg-black/70 text-white 
                   px-6 py-3 rounded-xl shadow-lg 
                   font-medium flex items-center gap-3 
                   animate-bounce-in"
      >
        <span>{message}</span>
        <button
          onClick={() => {
            onClose();

            // 🎯 GA: Manually Closed
            if (typeof gtag !== "undefined") {
              gtag("event", "notification_closed_manual", {
                event_category: "User Interaction",
                event_label: message,
              });
            } else {
              console.log("GA: notification_closed_manual →", message);
            }
          }}
          className="ml-2 font-bold hover:text-gray-300 text-lg"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default Notification;
