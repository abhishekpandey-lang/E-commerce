import React from "react";
import ReactGA from "react-ga4";

function BrowseByCategory() {
  const categories = [
    { name: "Phones", icon: "📱" },
    { name: "Computers", icon: "💻" },
    { name: "SmartWatch", icon: "⌚" },
    { name: "Camera", icon: "📷" },
    { name: "HeadPhones", icon: "🎧" },
    { name: "Gaming", icon: "🎮" },
  ];

  // 🔹 ye function event ko track karega
  const handleCategoryClick = (catName) => {
    ReactGA.event({
      category: "Category",
      action: "Clicked Category",
      label: catName,
    });
    console.log(`Tracked click on category: ${catName}`);
  };

  return (
    <section className="mt-4 px-4 sm:px-6 lg:px-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold border-l-4 border-red-500 pl-2">
          Categories
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold">Browse By Category</h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200">
            ◀
          </button>
          <button className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200">
            ▶
          </button>
        </div>
      </div>

      {/* 🔹 Click par tracking karega */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleCategoryClick(cat.name)}
            className="border-gray-300 rounded-lg flex flex-col items-center justify-center border rounded-lg py-6 cursor-pointer hover:bg-[#DB4444] hover:text-white transition"
          >
            <span className="text-2xl sm:text-3xl">{cat.icon}</span>
            <p className="mt-2 text-sm sm:text-base font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrowseByCategory;
