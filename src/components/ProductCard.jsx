import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  
import { FiHeart } from "react-icons/fi";  
import { FaHeart } from "react-icons/fa"; // ❤️ filled icon

function ProductCard({ product, onAddToCart }) {
  const { cart, addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { user } = useAuth();   
  const navigate = useNavigate();

  // ✅ Check if product is in cart or wishlist
  const inCart = cart.some((item) => item.id === product.id || item._id === product._id);
  const isLiked = wishlist.some((item) => item.id === product.id || item._id === product._id);

  // 🛒 Add to Cart
  const handleAddToCart = () => {
    if (!user) {
      navigate("/signup");
      return;
    }
    addToCart(product);
    onAddToCart?.(product);

    // 🎯 Google Analytics event
    if (typeof gtag !== "undefined") {
      gtag("event", "add_to_cart", {
        event_category: "Cart",
        event_label: product.name,
        value: product.price,
      });
    }
  };

  // ❤️ Wishlist toggle
  const handleWishlist = () => {
    if (!user) {
      navigate("/signup");
      return;
    }

    if (isLiked) {
      removeFromWishlist(product.id || product._id);
    } else {
      addToWishlist(product);
    }

    // 🎯 Google Analytics event
    if (typeof gtag !== "undefined") {
      gtag("event", isLiked ? "remove_from_wishlist" : "add_to_wishlist", {
        event_category: "Wishlist",
        event_label: product.name,
      });
    }
  };

  // 👉 Navigate to product detail page
  const goToDetail = () => {
    navigate(`/product/${product.id || product._id}`, { state: { product } });

    // 🎯 GA: Product viewed
    if (typeof gtag !== "undefined") {
      gtag("event", "view_product", {
        event_category: "Product",
        event_label: product.name,
      });
    }
  };

  // 🔹 Default values (safety)
  const price = product.price ?? 0;
  const oldPrice = product.oldPrice ?? price + 50;
  const discount = product.discount ?? 0;
  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg relative transition-all duration-300">
      {/* ❤️ Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 text-2xl p-2 rounded-full shadow-md transition ${
          isLiked ? "text-red-500 bg-white" : "text-gray-400 bg-white hover:text-red-500"
        }`}
        title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isLiked ? <FaHeart /> : <FiHeart />}
      </button>

      {/* 🖼 Product Image */}
      <img
        src={product.img}
        alt={product.name}
        className="h-40 mx-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={goToDetail}
      />

      {/* 📌 Product Name */}
      <h3
        className="mt-2 font-semibold cursor-pointer hover:text-red-500"
        onClick={goToDetail}
      >
        {product.name}
      </h3>

      {/* 💲 Price */}
      <div className="flex gap-2 items-center">
        <span className="text-red-500 font-bold">${price}</span>
        <span className="line-through text-gray-500">${oldPrice}</span>
      </div>

      {/* ⭐ Rating + Reviews */}
      <div className="mt-2 flex items-center gap-1">
        <div className="flex text-yellow-400 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < rating ? "★" : "☆"}</span>
          ))}
        </div>
        <span className="text-xs text-gray-600">({reviews})</span>
      </div>

      {/* 📉 Discount */}
      {discount > 0 && (
        <span className="text-green-600 text-sm">-{discount}% Off</span>
      )}

      {/* 🛒 Add to Cart / Go to Cart */}
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
