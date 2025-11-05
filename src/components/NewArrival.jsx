import { trackClarityEvent } from "../analytics/clarity"; // ✅ Clarity import

// 🔹 Google Analytics Event Tracker
const trackEvent = (action, category, label) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  } else {
    console.log(`GA Event → ${action} | ${category} | ${label}`);
  }

  // 🔹 Microsoft Clarity Event
  trackClarityEvent(action, {
    category,
    label,
  });
};

function NewArrival() {
  const items = [
    {
      title: "PlayStation 5",
      desc: "Black and White version of the PS5 coming out on sale.",
      img: "/wss.jpg",
      label: "PlayStation 5",
      layout: "main",
    },
    {
      title: "Women’s Collections",
      desc: "Featured woman collections that give you another vibe.",
      img: "/resized_image.jpg",
      label: "Women’s Collections",
      layout: "main",
    },
    {
      title: "Speakers",
      desc: "Amazon wireless speakers",
      img: "/speaker1.webp",
      label: "Speakers",
      layout: "half",
    },
    {
      title: "Perfume",
      desc: "GUCCI INTENSE OUD EDP",
      img: "/perfume.webp",
      label: "Perfume",
      layout: "half",
    },
  ];

  const handleShopNow = (label) => {
    trackEvent("shop_now_click", "New Arrival", label);
  };

  return (
    <div className="mt-16 px-4 sm:px-8">
      {/* 🏷 Section Header */}
      <div className="mb-6">
        <span className="text-red-500 text-sm font-semibold uppercase tracking-wide">
          Featured
        </span>
        <h2 className="text-2xl font-bold">New Arrival</h2>
      </div>

      {/* 🧩 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-lg relative ${
              item.layout === "main" ? "h-64 sm:h-72 md:h-80" : "h-32 sm:h-36 md:h-40"
            } overflow-hidden group`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              <h3 className={`text-lg font-bold ${item.layout === "half" ? "text-base" : ""}`}>
                {item.title}
              </h3>
              <p className={`text-sm ${item.layout === "half" ? "text-xs sm:text-sm" : ""}`}>
                {item.desc}
              </p>
              <button
                aria-label={`Shop now for ${item.title}`}
                className={`mt-3 ${item.layout === "half" ? "mt-2 px-3 py-1 text-xs" : "px-4 py-1 text-sm"} 
                            bg-white text-black font-medium rounded hover:bg-gray-200`}
                onClick={() => handleShopNow(item.label)}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrival;
