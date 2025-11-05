import React from "react";
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";

function BrowseByCategory() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Phones", icon: "📱", slug: "phones" },
    { id: 2, name: "Computers", icon: "💻", slug: "computers" },
    { id: 3, name: "SmartWatch", icon: "⌚", slug: "smartwatch" },
    { id: 4, name: "Camera", icon: "📷", slug: "camera" },
    { id: 5, name: "HeadPhones", icon: "🎧", slug: "headphones" },
    { id: 6, name: "Gaming", icon: "🎮", slug: "gaming" },
  ];

  // 🔹 Category click handler
  const handleCategoryClick = (category) => {
    // GA4 Event
    ReactGA.event({
      category: "Category Interaction",
      action: "Category Clicked",
      label: category.name,
    });

    console.log(`📊 Category Clicked: ${category.name}`);

    // Optional: navigate to category page
    if (category.slug) {
      navigate(`/category/${category.slug}`);
    }
  };

  // Placeholder for carousel logic
  const handlePrev = () => {
    console.log("◀ Previous category clicked");
  };

  const handleNext = () => {
    console.log("▶ Next category clicked");
  };

  return (
    <section className="mt-6 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold border-l-4 border-red-500 pl-2">
          Categories
        </h2>
      </div>

      {/* Title & carousel controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold">Browse By Category</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200 transition"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200 transition"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="border-gray-300 rounded-lg flex flex-col items-center justify-center border py-6 cursor-pointer hover:bg-[#DB4444] hover:text-white transition duration-300"
          >
            <span className="text-3xl sm:text-4xl">{cat.icon}</span>
            <p className="mt-2 text-sm sm:text-base font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrowseByCategory;
