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

// 🧩 Vite में process.env नहीं चलता, इसलिए import.meta.env का use करो
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

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
