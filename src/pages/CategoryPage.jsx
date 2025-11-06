// src/pages/CategoryPage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  // 🔹 Dummy products for demo
  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: "Gaming Laptop", price: 1200, image: "/Asus Pro Gaming Laptop.webp" },
      { id: 2, name: "Wireless Headphones", price: 150, image: "/True Wireless.webp" },
      { id: 3, name: "Smartphone Pro", price: 900, image: "/-original-imaghx9qmgqsk9s4-removebg-preview.png" },
      { id: 4, name: "Smartv X", price: 200, image: "/4K Ultra HD Smart TV.webp" },
      { id: 5, name: "DSLR Camera", price: 800, image: "/Camera.webp" },
    ];
    setProducts(dummyProducts);
  }, [slug]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 border-l-4 border-red-500 pl-2">
          Category: {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 cursor-pointer group"
            >
              <div className="relative w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 sm:h-40 md:h-48 object-contain bg-gray-100 p-2 sm:p-4 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                  New
                </div>
              </div>
              <div className="p-2 sm:p-4">
                <h2 className="text-sm sm:text-base font-semibold mb-1 hover:text-red-500 transition">
                  {product.name}
                </h2>
                <p className="text-red-500 font-bold text-sm sm:text-base">${product.price}</p>
                <button className="mt-2 w-full bg-red-500 text-white py-1 sm:py-2 rounded hover:bg-red-600 transition text-xs sm:text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CategoryPage;
