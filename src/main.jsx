import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { store } from "./redux/store";

import "./index.css";
import { initGA } from "./analytics/ga4";
import App from "./App.jsx";
import GAListener from "./analytics/GAListener.jsx"; // Track pageviews for GA4
import { clarity } from "react-microsoft-clarity"; // ✅ Correct import

// 🔹 Get IDs from .env
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

// Initialize Google Analytics
if (GA_MEASUREMENT_ID) {
  initGA();
}

// Initialize Microsoft Clarity
if (CLARITY_PROJECT_ID && typeof window !== "undefined") {
  clarity.init(CLARITY_PROJECT_ID);
}

// Render React App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <GAListener /> {/* Automatic GA4 pageview tracking */}
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
