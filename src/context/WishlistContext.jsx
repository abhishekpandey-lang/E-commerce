import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const WishlistContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ safe env base URL

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // 🔄 Load wishlist from backend or localStorage fallback
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return setWishlist([]);

      try {
        const res = await axios.get(`${BASE_URL}/api/wishlist/${user.uid || user.email}`);
        if (Array.isArray(res.data)) {
          setWishlist(res.data);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        console.warn("⚠️ Backend wishlist unavailable, using local fallback:", err);
        const saved = localStorage.getItem(`wishlist_${user.uid || user.email}`);
        setWishlist(saved ? JSON.parse(saved) : []);
      }
    };
    fetchWishlist();
  }, [user]);

  // 🧠 Auto-save wishlist to backend + localStorage (debounced)
  useEffect(() => {
    if (!user) return;

    localStorage.setItem(`wishlist_${user.uid || user.email}`, JSON.stringify(wishlist));

    const timeout = setTimeout(async () => {
      try {
        await axios.post(`${BASE_URL}/api/wishlist/${user.uid || user.email}`, { wishlist });
      } catch (err) {
        console.error("❌ Wishlist sync failed:", err);
      }
    }, 1000); // debounce 1 second

    return () => clearTimeout(timeout);
  }, [wishlist, user]);

  // ❤️ Add product to wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const alreadyExists = prev.find(
        (item) => (item.id || item._id) === (product.id || product._id)
      );
      if (alreadyExists) return prev;

      // 🎯 Google Analytics event
      if (window.gtag) {
        window.gtag("event", "add_to_wishlist", {
          event_category: "Wishlist",
          event_label: product.name,
          value: product.price || 0,
          items: [
            {
              id: product.id || product._id,
              name: product.name,
              price: product.price || 0,
            },
          ],
        });
      }

      return [...prev, product];
    });
  };

  // ❌ Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const updated = prev.filter(
        (item) => (item.id || item._id) !== productId
      );

      // 🎯 Google Analytics event
      if (window.gtag) {
        window.gtag("event", "remove_from_wishlist", {
          event_category: "Wishlist",
          event_label: productId,
          items: [{ id: productId }],
        });
      }

      return updated;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
