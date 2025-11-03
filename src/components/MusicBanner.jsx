import { useState, useEffect } from "react";

// 👇 Google Analytics ka helper (agar gtag already index.html me setup hai)
const trackEvent = (action, category, label) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  } else {
    console.log("Tracking:", action, category, label); // fallback for dev
  }
};

function MusicBanner() {
  const [time, setTime] = useState({
    days: 1,
    hours: 5,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num) => String(num).padStart(2, "0");

  // 👇 Button click handler
  const handleBuyNowClick = () => {
    trackEvent("buy_now_click", "Music Banner", "User clicked Buy Now button");
  };

  return (
    <div className="bg-black text-white rounded-2xl flex flex-col lg:flex-row justify-between items-center px-6 sm:px-8 lg:px-12 py-10 lg:py-12 mt-10 gap-8 lg:mr-8">
      {/* Left Side Text */}
      <div className="text-center lg:text-left">
        <span className="text-green-400 font-semibold text-sm sm:text-base">
          Categories
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 leading-snug">
          Enhance Your <br className="hidden sm:block" /> Music Experience
        </h2>

        <div className="flex gap-3 mt-4 justify-center lg:justify-start">
          {[format(time.days), format(time.hours), format(time.minutes), format(time.seconds)].map((t, i) => (
            <div
              key={i}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-black rounded-full font-bold text-sm sm:text-base"
            >
              {t}
            </div>
          ))}
        </div>

        {/* 👇 Tracking event added here */}
        <button
          onClick={handleBuyNowClick}
          className="mt-6 px-5 sm:px-6 py-2 sm:py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 transition"
        >
          Buy Now!
        </button>
      </div>

      <div className="flex justify-center lg:justify-end">
        <img
          src="/JBL_BOOMBOX_2_FRONT_004 MAIN_x2.webp"
          alt="Speaker"
          className="w-56 sm:w-72 lg:w-80 object-contain lg:-ml-6"
        />
      </div>
    </div>
  );
}

export default MusicBanner;
