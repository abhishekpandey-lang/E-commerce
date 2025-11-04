import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { store } from "./redux/store";

import "./index.css";
import { initGA } from "./analytics/ga4";
import App from "./App.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

// ✅ Directly using your GA Measurement ID (no need of .env for now)
const GA_MEASUREMENT_ID = "G-59ZM1REN41";

// Google Analytics initialize
initGA(GA_MEASUREMENT_ID);

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
