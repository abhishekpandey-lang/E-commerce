import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const CartContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // ✅ Load cart (backend + local fallback)
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return setCart([]);

      try {
        const res = await axios.get(`${BASE_URL}/api/usercart/${user.uid}`);
        let backendCart = [];

        if (res.data && Array.isArray(res.data.items)) {
          backendCart = res.data.items.map(item => ({
            ...item.productId,
            quantity: item.quantity,
          }));
        }

        const savedCart = localStorage.getItem(`cart_${user.email}`);
        const localCart = savedCart ? JSON.parse(savedCart) : [];

        const mergedCart = mergeCarts(backendCart, localCart);
        setCart(mergedCart);
      } catch (err) {
        console.error("⚠️ Backend not reachable, using localStorage fallback:", err);
        const savedCart = localStorage.getItem(`cart_${user?.email}`);
        setCart(savedCart ? JSON.parse(savedCart) : []);
      }
    };

    fetchCart();
  }, [user]);

  // ✅ Merge helper
  const mergeCarts = (backendCart, localCart) => {
    const map = new Map();

    [...backendCart, ...localCart].forEach(item => {
      const id = item._id || item.id || item.name; // fallback
      if (!id) return;
      if (map.has(id)) {
        const existing = map.get(id);
        map.set(id, { ...existing, quantity: existing.quantity + item.quantity });
      } else {
        map.set(id, { ...item });
      }
    });

    return Array.from(map.values());
  };

  // ✅ Save to localStorage whenever cart updates
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  // 🛒 Add to cart
  const addToCart = async (product) => {
    // हर product को unique id दो
    const uniqueId = product._id || product.id || Date.now().toString();
    const productWithId = { ...product, _id: uniqueId };

    setCart(prev => {
      const existing = prev.find(item => item._id === uniqueId);
      if (existing) {
        return prev.map(item =>
          item._id === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...productWithId, quantity: 1 }];
    });

    // 🔹 Google Analytics event
    if (typeof gtag !== "undefined") {
      gtag("event", "add_to_cart", {
        event_category: "Cart",
        event_label: product.name,
        value: product.price,
      });
    }

    // 🔹 Backend sync
    if (user) {
      try {
        await axios.post(`${BASE_URL}/api/cart/${user.uid}`, {
          productId: uniqueId,
          quantity: 1,
        });
      } catch (err) {
        console.error("❌ Add to cart backend failed:", err);
      }
    }
  };

  // ❌ Remove from cart
  const removeFromCart = async (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));

    if (typeof gtag !== "undefined") {
      gtag("event", "remove_from_cart", {
        event_category: "Cart",
        event_label: productId,
      });
    }

    if (user) {
      try {
        await axios.delete(`${BASE_URL}/api/cart/${user.uid}/${productId}`);
      } catch (err) {
        console.error("❌ Remove from cart backend failed:", err);
      }
    }
  };

  // 🔁 Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);

    setCart(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );

    if (user) {
      try {
        await axios.put(`${BASE_URL}/api/cart/${user.uid}/${productId}`, { quantity });
      } catch (err) {
        console.error("❌ Update cart backend failed:", err);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
