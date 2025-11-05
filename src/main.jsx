import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { store } from "./redux/store";

import "./index.css";
import { initGA } from "./analytics/ga4";
import App from "./App.jsx";

// 🟢 Get GA Measurement ID from .env file
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (GA_MEASUREMENT_ID) {
  console.log("✅ Google Analytics initialized with:", GA_MEASUREMENT_ID);
  initGA(GA_MEASUREMENT_ID);
} else {
  console.warn("⚠️ Google Analytics ID missing! Please set VITE_GA_MEASUREMENT_ID in .env file.");
}

// 🧩 React App Render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// 🌐 Deployment URL
// https://e-commerce-two-beta-61.vercel.app
