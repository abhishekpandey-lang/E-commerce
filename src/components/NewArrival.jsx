// 🔹 Google Analytics Event Tracker
const trackEvent = (action, category, label) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  } else {
    console.log("Tracking:", action, category, label); // fallback for dev mode
  }
};

function NewArrival() {
  return (
    <div className="mt-16 px-4 sm:px-8">
      {/* Heading with Featured */}
      <div className="mb-6">
        <span className="text-red-500 text-sm font-semibold">Featured</span>
        <h2 className="text-2xl font-bold">New Arrival</h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PlayStation 5 */}
        <div className="border-gray-200 rounded-lg relative h-64 sm:h-72 md:h-80 overflow-hidden group border">
          <img
            src="/wss.jpg"
            alt="PlayStation 5"
            className="border-gray-200 rounded-lg w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
            <h3 className="text-lg font-bold">PlayStation 5</h3>
            <p className="text-sm">
              Black and White version of the PS5 coming out on sale.
            </p>
            <button
              className="mt-3 bg-white text-black px-4 py-1 text-sm font-medium"
              onClick={() =>
                trackEvent("shop_now_click", "New Arrival", "PlayStation 5")
              }
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Women’s Collections */}
        <div className="border-gray-200 rounded-lg relative h-64 sm:h-72 md:h-80 overflow-hidden group border">
          <img
            src="/resized_image.jpg"
            alt="Women"
            className="border-gray-200 rounded-lg w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
            <h3 className="text-lg font-bold">Women’s Collections</h3>
            <p className="text-sm">
              Featured woman collections that give you another vibe.
            </p>
            <button
              className="mt-3 bg-white text-black px-4 py-1 text-sm font-medium"
              onClick={() =>
                trackEvent("shop_now_click", "New Arrival", "Women’s Collections")
              }
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Speakers + Perfume */}
        <div className="grid grid-rows-2 gap-6">
          {/* Speakers */}
          <div className="border-gray-200 rounded-lg relative h-32 sm:h-36 md:h-40 overflow-hidden group border">
            <img
              src="/speaker1.webp"
              alt="Speaker"
              className="border-gray-200 rounded-lg w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              <h3 className="text-base font-bold">Speakers</h3>
              <p className="text-xs sm:text-sm">Amazon wireless speakers</p>
              <button
                className="mt-2 bg-white text-black px-3 py-1 text-xs font-medium"
                onClick={() =>
                  trackEvent("shop_now_click", "New Arrival", "Speakers")
                }
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Perfume */}
          <div className="border-gray-200 rounded-lg relative h-32 sm:h-36 md:h-40 overflow-hidden group border">
            <img
              src="/perfume.webp"
              alt="Perfume"
              className="border-gray-200 rounded-lg w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              <h3 className="text-base font-bold">Perfume</h3>
              <p className="text-xs sm:text-sm">GUCCI INTENSE OUD EDP</p>
              <button
                className="mt-2 bg-white text-black px-3 py-1 text-xs font-medium"
                onClick={() =>
                  trackEvent("shop_now_click", "New Arrival", "Perfume")
                }
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArrival;
