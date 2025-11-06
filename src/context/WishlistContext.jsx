// ✅ src/context/WishlistContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { trackEvent } from "../analytics/ga4"; // GA4
import { trackClarityEvent } from "../analytics/clarity"; // Clarity

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // 🔹 Load wishlist safely from localStorage
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }
    try {
      const saved = localStorage.getItem(`wishlist_${user.uid || user.email}`);
      setWishlist(saved ? JSON.parse(saved) : []);
    } catch {
      setWishlist([]);
    }
  }, [user]);

  // 🔹 Save wishlist with debounce
  useEffect(() => {
    if (!user) return;
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(
          `wishlist_${user.uid || user.email}`,
          JSON.stringify(wishlist)
        );
      } catch {}
    }, 300);
    return () => clearTimeout(timeout);
  }, [wishlist, user]);

  // 🧠 Safe Google Analytics Event
  const safeGA4Event = (action, params = {}) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", action, {
        event_category: params.category || "Wishlist",
        event_label: params.label || "Unknown Product",
        value: params.value || 0,
      });
    }
  };

  // 🧠 Safe Microsoft Clarity Event
  const safeClarityEvent = (eventName, data = {}) => {
    if (typeof window !== "undefined" && typeof window.clarity === "function") {
      try {
        window.clarity("event", eventName, data);
      } catch {}
    }
  };

  // ❤️ Add to wishlist
  const addToWishlist = (product) => {
    if (!product) return;
    const uniqueId =
      product._id || product.id || product.name || Date.now().toString();
    const productWithId = { ...product, _id: uniqueId };

    setWishlist((prev) => {
      if (prev.some((item) => item._id === uniqueId)) return prev;

      safeGA4Event("add_to_wishlist", {
        category: "Wishlist",
        label: product.name,
        value: product.price,
      });

      safeClarityEvent("Wishlist_Add", {
        productId: uniqueId,
        productName: product.name,
        price: product.price,
      });

      return [...prev, productWithId];
    });
  };

  // 💔 Remove from wishlist
  const removeFromWishlist = (productId) => {
    if (!productId) return;

    setWishlist((prev) => {
      const removed = prev.find((item) => item._id === productId);
      const updated = prev.filter((item) => item._id !== productId);

      safeGA4Event("remove_from_wishlist", {
        category: "Wishlist",
        label: removed?.name || "Unknown",
      });

      safeClarityEvent("Wishlist_Remove", {
        productId,
        productName: removed?.name || "Unknown",
      });

      return updated;
    });
  };

  // 🔁 Toggle wishlist
  const toggleWishlist = (product) => {
    const uniqueId =
      product._id || product.id || product.name || Date.now().toString();
    const exists = wishlist.some((item) => item._id === uniqueId);
    if (exists) {
      removeFromWishlist(uniqueId);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
