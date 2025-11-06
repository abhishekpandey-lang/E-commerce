import { useState } from "react";
import { trackClarityEvent } from "../analytics/clarity"; // ✅ Clarity import

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Woman’s Fashion",
    "Men’s Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby’s & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  const handleCategoryClick = (category, index) => {
    // GA4 Event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "category_click", {
        event_category: "Sidebar",
        event_label: category,
        value: index + 1,
        items: [{ name: category, index }],
      });
    } else {
      console.log(`GA4 → category_click: ${category}, index: ${index + 1}`);
    }

    // Clarity Event
    trackClarityEvent("CategoryClick", {
      categoryName: category,
      categoryIndex: index + 1,
    });

    setIsOpen(false); // close sidebar after click on mobile
  };

  return (
    <>
      {/* Toggle Button (Mobile Only) */}
      <button
        aria-label="Toggle sidebar"
        className="md:hidden p-3 text-2xl bg-gray-200 rounded-lg m-2 hover:bg-gray-300 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:block w-64 border-r border-gray-200 p-4 bg-white"
        aria-label="Sidebar navigation"
      >
        <ul className="space-y-3">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="hover:text-red-500 cursor-pointer transition-colors duration-200"
              onClick={() => handleCategoryClick(cat, i)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          ></div>

          {/* Sidebar panel */}
          <aside
            className="relative w-64 bg-white h-full p-4 shadow-2xl transform transition-transform duration-300 translate-x-0"
            aria-label="Mobile sidebar"
          >
            <button
              aria-label="Close sidebar"
              className="mb-4 text-xl hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <ul className="space-y-3">
              {categories.map((cat, i) => (
                <li
                  key={i}
                  className="hover:text-red-500 cursor-pointer transition-colors duration-200"
                  onClick={() => handleCategoryClick(cat, i)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
