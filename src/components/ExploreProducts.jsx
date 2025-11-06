import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ReactGA from "react-ga4";

// 🔹 Static fallback products (no backend)
const fallbackProducts = [
  { id: 13, name: "Kids Electric Car", price: 850, img: "/Kids Electric Car.webp", discount: 12, oldPrice: 970 },
  { id: 14, name: "Jr. Zoom Soccer Cleats", price: 100, img: "/Jr. Zoom Soccer Cleats.webp", discount: 8, oldPrice: 110 },
  { id: 15, name: "GTRI Shooter USB Gamepad", price: 150, img: "/GTRI Shooter USB Gamepad.webp", discount: 18, oldPrice: 180 },
  { id: 16, name: "Quilted Satin Jacket", price: 300, img: "/Quilted Satin Jacket.webp", discount: 10, oldPrice: 335 },
  { id: 17, name: "Wireless Bluetooth Headphones", price: 100, img: "/Wireless Bluetooth Headphones.webp", discount: 25, oldPrice: 135 },
  { id: 18, name: "Smart Fitness Watch", price: 1200, img: "/Smart Fitness Watch.webp", discount: 20, oldPrice: 1500 },
  { id: 19, name: "4K Ultra HD Smart TV", price: 750, img: "/4K Ultra HD Smart TV.webp", discount: 15, oldPrice: 880 },
  { id: 20, name: "Portable Coffee Maker", price: 250, img: "/Portable Coffee Maker.webp", discount: 7, oldPrice: 270 },
];

function ExploreProducts() {
  const [products] = useState(fallbackProducts);
  const [startIndex, setStartIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [notification, setNotification] = useState(null);
  const visibleCount = 5;

  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // 🔹 Safe GA4 event
  const safeGA4Event = (data) => {
    if (typeof ReactGA.event === "function") {
      ReactGA.event(data);
      console.log("GA4 Event:", data);
    }
  };

  // 🔹 Safe Microsoft Clarity event
  const safeClarityEvent = (eventName, data) => {
    if (typeof window !== "undefined" && typeof window.clarity === "function") {
      window.clarity("event", eventName, data);
      console.log("Clarity Event:", eventName, data);
    }
  };

  // Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`🛒 ${product.name} added to cart ✅`);
    safeGA4Event({ category: "Cart", action: "Add to Cart", label: product.name, value: product.price });
    safeClarityEvent("Add_to_Cart", { product_name: product.name, product_id: product.id });
    setTimeout(() => setNotification(null), 2000);
  };

  // Wishlist toggle
  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist.some(p => p.id === product.id);

    if (isInWishlist) {
      removeFromWishlist(product.id);
      setNotification(`💔 ${product.name} removed from wishlist`);
      safeGA4Event({ category: "Wishlist", action: "Removed", label: product.name });
      safeClarityEvent("Remove_from_Wishlist", { product_name: product.name });
    } else {
      addToWishlist(product);
      setNotification(`❤️ ${product.name} added to wishlist`);
      safeGA4Event({ category: "Wishlist", action: "Added", label: product.name });
      safeClarityEvent("Add_to_Wishlist", { product_name: product.name });
    }

    setTimeout(() => setNotification(null), 2000);
  };

  // Carousel
  const handleNext = () => { if (startIndex + visibleCount < products.length) setStartIndex(startIndex + visibleCount); };
  const handlePrev = () => { if (startIndex - visibleCount >= 0) setStartIndex(startIndex - visibleCount); };

  const handleViewAll = () => {
    safeGA4Event({ category: "ExploreProducts", action: "View All Clicked", label: `Total Products: ${products.length}` });
    safeClarityEvent("View_All_ExploreProducts", { total_products: products.length });
    setShowAll(true);
  };

  const visibleProducts = showAll ? products : products.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="mt-16 px-4 sm:px-6 md:px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Explore Our Products</h2>
        {!showAll && products.length > visibleCount && (
          <div className="hidden sm:flex gap-3">
            <button onClick={handlePrev} disabled={startIndex === 0} className="p-2 md:p-3 bg-gray-100 rounded-full shadow hover:bg-gray-200 disabled:opacity-40 transition">
              <FaChevronLeft />
            </button>
            <button onClick={handleNext} disabled={startIndex + visibleCount >= products.length} className="p-2 md:p-3 bg-gray-100 rounded-full shadow hover:bg-gray-200 disabled:opacity-40 transition">
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {visibleProducts.map(product => {
          const isInWishlist = wishlist.some(p => p.id === product.id);
          const isInCart = cart.some(p => p.id === product.id);

          return (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 duration-300 relative overflow-hidden">
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                -{product.discount}%
              </div>

              {/* Wishlist */}
              <button onClick={() => handleWishlistToggle(product)} className={`absolute top-2 right-2 p-1 rounded-full transition ${isInWishlist ? "text-red-500" : "text-gray-400"}`}>
                {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              </button>

              <Link to={`/product/${product.id}`} state={{ product }}>
                <img src={product.img} alt={product.name} className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-contain rounded-t-lg bg-white" />
              </Link>

              <div className="p-2 sm:p-3 md:p-4 flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold truncate">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-red-500 font-bold text-xs sm:text-sm md:text-base">${product.price}</p>
                  <p className="text-gray-400 line-through text-[10px] sm:text-xs md:text-sm">${product.oldPrice}</p>
                </div>

                {!isInCart ? (
                  <button onClick={() => handleAddToCart(product)} className="mt-1 sm:mt-2 w-full bg-red-500 text-white text-xs sm:text-sm md:text-base py-1.5 rounded hover:bg-red-600 transition">
                    Add to Cart
                  </button>
                ) : (
                  <Link to="/cart" className="mt-1 sm:mt-2 w-full bg-green-500 text-white text-xs sm:text-sm md:text-base py-1.5 rounded hover:bg-green-600 transition text-center">
                    Go to Cart
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View All */}
      {!showAll && products.length > visibleCount && (
        <div className="text-center mt-8">
          <button onClick={handleViewAll} className="px-6 py-2 bg-[#DB4444] text-white text-sm md:text-lg font-semibold rounded-lg shadow-md hover:bg-red-600 transition">
            View All Products
          </button>
        </div>
      )}

      {notification && <Notification key={notification} message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
}

export default ExploreProducts;
