import { useEffect } from "react";

function Notification({ message, onClose }) {
  useEffect(() => {
    if (!message) return;

    // 🔹 Google Analytics event: Notification दिखा
    if (typeof gtag !== "undefined") {
      gtag("event", "notification_viewed", {
        event_category: "User Interaction",
        event_label: message,
      });
    }

    // 🔹 Auto close after 900ms
    const timer = setTimeout(() => {
      onClose();

      // 🔹 Google Analytics event: Notification बंद हुआ
      if (typeof gtag !== "undefined") {
        gtag("event", "notification_closed", {
          event_category: "User Interaction",
          event_label: message,
        });
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
            // 🔹 GA event: manually closed
            if (typeof gtag !== "undefined") {
              gtag("event", "notification_closed_manual", {
                event_category: "User Interaction",
                event_label: message,
              });
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
