import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ReactGA from "react-ga4";  // ✅ Added for Google Analytics

const BASE_URL = "http://localhost:5000";

const fallbackProducts = [
  { _id: "25", name: "Tweed Solid Coat For Women", img: "/Gucci duffle bag.webp", price: 260, oldPrice: 360, discount: 30 },
  { _id: "26", name: "Gucci duffle bag", img: "/Gucci duffle bag.webp", price: 960, oldPrice: 1160, discount: 35 },
  { _id: "27", name: "RGB liquid CPU Cooler", img: "/RGB liquid CPU Cooler.webp", price: 160, oldPrice: 170, discount: 10 },
  { _id: "28", name: "Small Bookshelf", img: "/Small Bookshelf.webp", price: 360, oldPrice: 400, discount: 15 },
  { _id: "29", name: "victus laptop i5", img: "/hp.webp", price: 360, oldPrice: 400, discount: 15 },
  { _id: "30", name: "Analog Watch", img: "/watch.webp", price: 360, oldPrice: 400, discount: 15 },
  { _id: "31", name: "Light Green T-Shirt", img: "/T-shirt.webp", price: 360, oldPrice: 400, discount: 15 },
  { _id: "32", name: "cozycrafted Luxury Marble Finish Coffee Table", img: "/coffee table.webp", price: 360, oldPrice: 400, discount: 15 },
];

function BestSelling() {
  const [products, setProducts] = useState(fallbackProducts);
  const [startIndex, setStartIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [notification, setNotification] = useState(null);

  const visibleCount = 5;
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Fetch BestSelling products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        const bestSelling = Array.isArray(data) ? data.filter(p => p.section === "BestSelling") : [];
        setProducts(bestSelling.length ? bestSelling : fallbackProducts);
      } catch (err) {
        console.error("Backend not reachable, fallback used ❌", err);
        setProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  const handleNext = () => { 
    if (startIndex + visibleCount < products.length) setStartIndex(startIndex + visibleCount); 
  };
  const handlePrev = () => { 
    if (startIndex - visibleCount >= 0) setStartIndex(startIndex - visibleCount); 
  };

  // ✅ Add to Cart Tracking
  const handleAddToCart = (product) => {
    addToCart(product);
    ReactGA.event({
      category: "Cart",
      action: "Add to Cart",
      label: product.name,
      value: product.price
    });
    setNotification(`${product.name} added to cart ✅`);
    setTimeout(() => setNotification(null), 2000);
  };

  // ✅ Wishlist Tracking
  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist.find(p => (p._id || p.id) === (product._id || product.id));
    if (isInWishlist) {
      removeFromWishlist(product._id || product.id);
      ReactGA.event({
        category: "Wishlist",
        action: "Removed from Wishlist",
        label: product.name
      });
      setNotification(`${product.name} removed from wishlist ❌`);
    } else {
      addToWishlist(product);
      ReactGA.event({
        category: "Wishlist",
        action: "Added to Wishlist",
        label: product.name
      });
      setNotification(`${product.name} added to wishlist ❤️`);
    }
    setTimeout(() => setNotification(null), 2000);
  };

  // ✅ View All Button Tracking
  const handleViewAll = () => {
    ReactGA.event({
      category: "BestSelling",
      action: "View All Clicked"
    });
    setShowAll(true);
  };

  const visibleProducts = showAll ? products : products.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="mt-12 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold border-l-4 border-red-500 pl-2">This Month</h2>
        {!showAll && products.length > visibleCount && (
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button onClick={handlePrev} disabled={startIndex===0} className="p-2 md:p-3 bg-gray-100 rounded-full shadow hover:bg-gray-200 disabled:opacity-40 transition"><FaChevronLeft/></button>
            <button onClick={handleNext} disabled={startIndex+visibleCount>=products.length} className="p-2 md:p-3 bg-gray-100 rounded-full shadow hover:bg-gray-200 disabled:opacity-40 transition"><FaChevronRight/></button>
          </div>
        )}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-6">Best Selling Products</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {visibleProducts.map(product => {
          const isInWishlist = wishlist.find(p => (p._id || p.id) === (product._id || product.id));
          const isInCart = cart.find(p => (p._id || p.id) === (product._id || product.id));

          return (
            <div key={product._id || product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 duration-300 relative overflow-hidden">
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">-{product.discount || 10}%</div>

              {/* Wishlist */}
              <button onClick={() => handleWishlistToggle(product)} className={`absolute top-2 right-2 p-1 rounded-full transition ${isInWishlist ? "text-red-500" : "text-gray-400"}`}>
                {isInWishlist ? <FaHeart/> : <FaRegHeart/>}
              </button>

              <Link to={`/product/${product._id || product.id}`} state={{ product }}>
                <img src={product.img} alt={product.name} className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-contain rounded-t-lg bg-white"/>
              </Link>

              <div className="p-2 sm:p-3 md:p-4 flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold truncate">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-red-500 font-bold text-xs sm:text-sm md:text-base">${product.price}</p>
                  <p className="text-gray-400 line-through text-[10px] sm:text-xs md:text-sm">${product.oldPrice}</p>
                </div>

                {!isInCart ? (
                  <button onClick={() => handleAddToCart(product)} className="mt-1 sm:mt-2 w-full bg-red-500 text-white text-xs sm:text-sm md:text-base py-1.5 rounded hover:bg-red-600 transition">Add to Cart</button>
                ) : (
                  <Link to="/cart" className="mt-1 sm:mt-2 w-full bg-green-500 text-white text-xs sm:text-sm md:text-base py-1.5 rounded hover:bg-green-600 transition text-center">Go to Cart</Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!showAll && products.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button onClick={handleViewAll} className="px-6 py-2 bg-[#DB4444] text-white text-sm md:text-lg font-semibold rounded-lg shadow-md hover:bg-red-600 transition">View All Products</button>
        </div>
      )}

      {notification && <Notification key={notification} message={notification} onClose={()=>setNotification(null)}/>}
    </section>
  );
}

export default BestSelling;
