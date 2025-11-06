import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { trackClarityEvent } from "../analytics/clarity";

function ProductCard({ product, onAddToCart }) {
  const { cart, addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const productId = useMemo(
    () => product._id || product.id || Date.now().toString(),
    [product]
  );

  const inCart = cart.some((item) => item._id === productId);
  const isLiked = wishlist.some((item) => item._id === productId);

  // 🛒 Add to Cart
  const handleAddToCart = () => {
    if (!user) return navigate("/signup");

    addToCart(product);
    onAddToCart?.(product);

    // ✅ GA4 safe check
    if (window.gtag) {
      window.gtag("event", "add_to_cart", {
        event_category: "Cart",
        event_label: product.name,
        value: product.price ?? 0,
        product_id: productId,
      });
    }

    // ✅ Clarity safe check
    if (typeof trackClarityEvent === "function") {
      trackClarityEvent("AddToCart", {
        productId,
        productName: product.name,
        price: product.price ?? 0,
      });
    }
  };

  // 💖 Wishlist toggle
  const handleWishlist = () => {
    if (!user) return navigate("/signup");

    const willLike = !isLiked; // next state
    toggleWishlist(product);

    // ✅ Clarity safe check
    if (typeof trackClarityEvent === "function") {
      trackClarityEvent(
        willLike ? "AddToWishlist" : "RemoveFromWishlist",
        {
          productId,
          productName: product.name,
          price: product.price ?? 0,
        }
      );
    }

    // ✅ GA4 safe check
    if (window.gtag) {
      window.gtag("event", willLike ? "add_to_wishlist" : "remove_from_wishlist", {
        event_category: "Wishlist",
        event_label: product.name,
        product_id: productId,
      });
    }

    // ✅ Navigate only when item added to wishlist
    if (willLike) navigate("/wishlist");
  };

  // 🔍 Product Detail Navigation
  const goToDetail = () => {
    navigate(`/product/${productId}`, { state: { product } });

    if (window.gtag) {
      window.gtag("event", "product_click", {
        event_category: "Product",
        event_label: product.name,
        value: product.price ?? 0,
        product_id: productId,
      });
    }

    if (typeof trackClarityEvent === "function") {
      trackClarityEvent("ProductClick", {
        productId,
        productName: product.name,
        price: product.price ?? 0,
      });
    }
  };

  // 💲Product Info
  const price = product.price ?? 0;
  const oldPrice = product.oldPrice ?? price + 50;
  const discount = product.discount ?? 0;
  const rating = Math.min(product.rating ?? 0, 5);
  const reviews = product.reviews ?? 0;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg relative transition-all duration-300 bg-white">
      {/* ❤️ Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 text-2xl p-2 rounded-full shadow-md transition ${
          isLiked ? "text-red-500 bg-white" : "text-gray-400 bg-white hover:text-red-500"
        }`}
        title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
        aria-label={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isLiked ? <FaHeart /> : <FiHeart />}
      </button>

      {/* 🖼️ Product Image */}
      <img
        src={product.img || "/fallback-image.webp"}
        alt={product.name || "Product"}
        className="h-40 mx-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={goToDetail}
        onError={(e) => (e.target.src = "/fallback-image.webp")}
      />

      {/* 📦 Product Name */}
      <h3
        className="mt-2 font-semibold cursor-pointer hover:text-red-500 truncate"
        onClick={goToDetail}
      >
        {product.name}
      </h3>

      {/* 💰 Price */}
      <div className="flex gap-2 items-center mt-1">
        <span className="text-red-500 font-bold">${price}</span>
        <span className="line-through text-gray-500">${oldPrice}</span>
      </div>

      {/* ⭐ Rating */}
      <div className="mt-2 flex items-center gap-1">
        <div className="flex text-yellow-400 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < rating ? "★" : "☆"}</span>
          ))}
        </div>
        <span className="text-xs text-gray-600">({reviews})</span>
      </div>

      {/* 🏷️ Discount */}
      {discount > 0 && <span className="text-green-600 text-sm mt-1 block">-{discount}% Off</span>}

      {/* 🛒 Add / Go to Cart */}
      {inCart ? (
        <button
          className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/cart")}
        >
          Go to Cart
        </button>
      ) : (
        <button
          className="mt-3 w-full bg-[#DB4444] text-white py-2 rounded hover:bg-red-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
