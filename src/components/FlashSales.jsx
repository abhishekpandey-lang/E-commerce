import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const BASE_URL = "http://localhost:5000"; // backend server

const fallbackProducts = [
  { id: 1, name: "Best True Wireless", price: 120, oldPrice: 160, discount: 40, img: "/True Wireless.webp", section: "FlashSales" },
  { id: 2, name: "Best True Wireless 2", price: 960, oldPrice: 1160, discount: 35, img: "/True.webp", section: "FlashSales" },
  { id: 3, name: "IPS LCD Gaming Monitor", price: 370, oldPrice: 400, discount: 30, img: "/Moiniter.webp", section: "FlashSales" },
  { id: 4, name: "S-Series Comfort Chair", price: 375, oldPrice: 400, discount: 25, img: "/Office study chairs.webp", section: "FlashSales" },
  { id: 5, name: "Monitors", price: 120, oldPrice: 160, discount: 40, img: "/Moniters.webp", section: "FlashSales" },
];

function FlashSale() {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 5;

  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        const flashProducts = Array.isArray(data)
          ? data.filter((p) => p.section === "FlashSales")
          : [];
        setProducts(flashProducts.length ? flashProducts : fallbackProducts);
      } catch (err) {
        console.error("Backend not reachable, using fallback ❌", err);
        setProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  // 🧩 Wishlist Toggle
  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist.some(p => (p.id || p._id) === (product.id || product._id));

    if (isInWishlist) {
      removeFromWishlist(product.id || product._id);
      setNotification(`${product.name} removed from wishlist ❌`);

      // 📊 GA4 Event
      if (window.gtag) {
        window.gtag("event", "remove_from_wishlist", {
          currency: "USD",
          value: product.price,
          items: [{ item_name: product.name, item_id: product.id || product._id, price: product.price, discount: product.discount || 0, item_category: product.section || "FlashSales" }],
        });
      }

      // ✅ Microsoft Clarity Event
      if (window.clarity) {
        window.clarity("event", "Wishlist_Remove", { product_name: product.name });
      }

    } else {
      addToWishlist(product);
      setNotification(`${product.name} added to wishlist ❤️`);

      if (window.gtag) {
        window.gtag("event", "add_to_wishlist", {
          currency: "USD",
          value: product.price,
          items: [{ item_name: product.name, item_id: product.id || product._id, price: product.price, discount: product.discount || 0, item_category: product.section || "FlashSales" }],
        });
      }

      if (window.clarity) {
        window.clarity("event", "Wishlist_Add", { product_name: product.name });
      }
    }

    setTimeout(() => setNotification(null), 2000);
  };

  // 🧩 Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart ✅`);

    if (window.gtag) {
      window.gtag("event", "add_to_cart", {
        currency: "USD",
        value: product.price,
        items: [{ item_name: product.name, item_id: product.id || product._id, price: product.price, discount: product.discount || 0, item_category: product.section || "FlashSales" }],
      });
    }

    if (window.clarity) {
      window.clarity("event", "Add_To_Cart", { product_name: product.name });
    }

    setTimeout(() => setNotification(null), 2000);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < products.length) setStartIndex(startIndex + visibleCount);
  };
  const handlePrev = () => {
    if (startIndex - visibleCount >= 0) setStartIndex(startIndex - visibleCount);
  };

  const visibleProducts = showAll ? products : products.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <span className="text-red-500">🏷️ Today’s Flash Sale</span>
        </h2>

        {!showAll && (
          <div className="flex gap-2 md:gap-3 mt-4 md:mt-0">
            <button onClick={handlePrev} disabled={startIndex === 0} className="p-2 md:p-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40 transition">
              <FaChevronLeft />
            </button>
            <button onClick={handleNext} disabled={startIndex + visibleCount >= products.length} className="p-2 md:p-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40 transition">
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {visibleProducts.map((product) => {
          const isInWishlist = wishlist.some(p => (p.id || p._id) === (product.id || product._id));
          const isInCart = cart.some(item => (item.id || item._id) === (product.id || product._id));

          return (
            <div key={product.id || product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 duration-300 relative overflow-hidden">
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                -{product.discount || 10}%
              </div>

              <button
                onClick={() => handleWishlistToggle(product)}
                className={`absolute top-2 right-2 p-1 rounded-full transition ${isInWishlist ? "text-red-500" : "text-gray-400"}`}
              >
                {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              </button>

              <Link to={`/product/${product.id || product._id}`} state={{ product }}>
                <img src={product.img} alt={product.name} className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-contain rounded-t-lg bg-white" />
              </Link>

              <div className="p-2 sm:p-3 md:p-4 flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold truncate">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-red-500 font-bold text-xs sm:text-sm md:text-base">${product.price}</p>
                  <p className="text-gray-400 line-through text-[10px] sm:text-xs md:text-sm">${product.oldPrice || product.price + 50}</p>
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

      <div className="flex justify-center mt-6 md:mt-8">
        {products.length > visibleCount && !showAll && (
          <button
            onClick={() => {
              setShowAll(true);

              if (window.gtag) {
                window.gtag("event", "view_all_flashsale", { total_products: products.length });
              }
              if (window.clarity) {
                window.clarity("event", "ViewAll_FlashSale", { total_products: products.length });
              }
            }}
            className="bg-[#DB4444] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            View All Products
          </button>
        )}
      </div>

      {notification && <Notification key={notification} message={notification} onClose={() => setNotification(null)} />}
    </section>
  );
}

export default FlashSale;
