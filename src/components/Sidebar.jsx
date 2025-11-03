import { useState } from "react";

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

  // 🎯 Track category click in Google Analytics
  const handleCategoryClick = (category) => {
    if (typeof gtag !== "undefined") {
      gtag("event", "category_click", {
        event_category: "Sidebar",
        event_label: category,
      });
    }

    setIsOpen(false); // close sidebar after click (mobile)
  };

  return (
    <>
      {/* Toggle Button (Mobile Only) */}
      <button
        className="md:hidden p-3 text-2xl bg-gray-200 rounded-lg m-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar for Desktop */}
      <aside className="w-64 border-gray-200 border-r p-4 hidden md:block">
        <ul className="space-y-3">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="hover:text-red-500 cursor-pointer"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Sidebar for Mobile (Slide-in) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <aside className="w-64 bg-white h-full p-4 shadow-lg">
            <button
              className="mb-4 text-xl"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <ul className="space-y-3">
              {categories.map((cat, i) => (
                <li
                  key={i}
                  className="hover:text-red-500 cursor-pointer"
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </aside>
          {/* Click on background to close */}
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
