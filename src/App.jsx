import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "./redux/themeSlice";

// ✅ Google Analytics imports
import GAListener from "./analytics/GAListener";
import { trackEvent } from "./analytics/ga4";

// ✅ Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import WishlistPage from "./pages/WishlistPage";
import Checkout from "./pages/Checkout";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import FAQPage from "./pages/FAQPage";
import Profile from "./pages/Profile";
import ProductDetail from "./components/ProductDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OrderPage from "./pages/OrderPage";
import CancelledOrdersPage from "./pages/CancelledOrdersPage";
import ReturnPage from "./pages/ReturnPage";
import MyPaymentPage from "./pages/MyPaymentPage";

// ✅ New CategoryPage for BrowseByCategory
import CategoryPage from "./pages/CategoryPage";

function App() {
  const theme = useSelector(selectTheme);

  // 🟣 Apply selected theme dynamically
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {/* ✅ GA Page View Listener */}
      <GAListener />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/cancelledorders" element={<CancelledOrdersPage />} />
        <Route path="/return" element={<ReturnPage />} />
        <Route path="/mypayments" element={<MyPaymentPage />} />

        {/*  New route for BrowseByCategory */}
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default App;
