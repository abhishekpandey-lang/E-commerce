// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { trackEvent } from "../analytics/ga4";
import { trackClarityEvent } from "../analytics/clarity";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // 🔹 Load cart & wishlist from localStorage
  useEffect(() => {
    if (!user) return;
    try {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      const savedWishlist = localStorage.getItem(`wishlist_${user.email}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
    } catch (err) {
      console.error("⚠️ Failed to load cart or wishlist from localStorage:", err);
      setCart([]);
      setWishlist([]);
    }
  }, [user]);

  // 🔹 Save cart & wishlist to localStorage
  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlist));
    } catch (err) {
      console.error("⚠️ Failed to save cart or wishlist to localStorage:", err);
    }
  }, [cart, wishlist, user]);

  // 🔹 Analytics helpers
  const safeTrackEvent = (data) => {
    if (typeof trackEvent === "function") trackEvent(data.action, data.category, data.label);
  };
  const safeTrackClarity = (eventName, data) => {
    if (typeof trackClarityEvent === "function") trackClarityEvent(eventName, data);
  };

  // 🔹 Cart actions
  const addToCart = (product) => {
    if (!product) return;

    const uniqueId = product._id || product.id || Date.now().toString();
    const productWithId = { ...product, _id: uniqueId };

    setCart((prev) => {
      const existing = prev.find((item) => item._id === uniqueId);
      if (existing) {
        return prev.map((item) =>
          item._id === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...productWithId, quantity: 1 }];
    });

    safeTrackEvent({
      category: "Cart",
      action: "Add to Cart",
      label: product.name || "Unnamed Product",
      value: product.price || 0,
    });
    safeTrackClarity("AddToCart", {
      productId: uniqueId,
      productName: product.name,
      price: product.price || 0,
      quantity: 1,
    });
  };

  const removeFromCart = (productId) => {
    const removedProduct = cart.find((item) => item._id === productId);
    setCart((prev) => prev.filter((item) => item._id !== productId));

    safeTrackEvent({
      category: "Cart",
      action: "Remove from Cart",
      label: removedProduct?.name || productId,
    });
    safeTrackClarity("RemoveFromCart", {
      productId,
      productName: removedProduct?.name || "Unknown",
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((item) => (item._id === productId ? { ...item, quantity } : item))
    );
    safeTrackClarity("UpdateCartQuantity", { productId, quantity });
  };

  const clearCart = () => {
    setCart([]);
    safeTrackEvent({ category: "Cart", action: "Clear Cart", label: "All items removed" });
    safeTrackClarity("ClearCart", {});
  };

  // 🔹 Wishlist actions
  const addToWishlist = (product) => {
    if (!product) return;
    const uniqueId = product._id || product.id || Date.now().toString();

    setWishlist((prev) => {
      if (prev.find((item) => item._id === uniqueId)) return prev; // Already in wishlist
      return [...prev, { ...product, _id: uniqueId }];
    });

    safeTrackEvent({
      category: "Wishlist",
      action: "Add to Wishlist",
      label: product.name || "Unnamed Product",
    });
    safeTrackClarity("AddToWishlist", {
      productId: uniqueId,
      productName: product.name,
    });
  };

  const removeFromWishlist = (productId) => {
    const removedProduct = wishlist.find((item) => item._id === productId);
    setWishlist((prev) => prev.filter((item) => item._id !== productId));

    safeTrackEvent({
      category: "Wishlist",
      action: "Remove from Wishlist",
      label: removedProduct?.name || productId,
    });
    safeTrackClarity("RemoveFromWishlist", {
      productId,
      productName: removedProduct?.name || "Unknown",
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    safeTrackEvent({ category: "Wishlist", action: "Clear Wishlist", label: "All items removed" });
    safeTrackClarity("ClearWishlist", {});
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
