import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiLogOut, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";

// 🔹 GA4 + Microsoft Clarity Tracker
const trackEvent = (action, category, label) => {
  // GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }

  // Microsoft Clarity
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", action, { category, label });
  }

  // Dev log fallback
  if (typeof window === "undefined" || (!window.gtag && !window.clarity)) {
    console.log("Tracking:", action, category, label);
  }
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  // Logout with tracking
  const handleLogout = () => {
    trackEvent("logout_click", "Navbar", "User clicked Logout");
    logout();
    navigate("/login");
  };

  // Badge Component
  const BadgeIcon = ({ to, count, icon: Icon, label }) => (
    <div className="relative flex items-center justify-center">
      <Link
        to={to}
        onClick={() => trackEvent(`${label}_click`, "Navbar", `Clicked ${label}`)}
        className="text-2xl text-white hover:text-red-500 transition"
      >
        <Icon />
      </Link>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center py-4 border-b border-gray-700">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <Link
              to="/"
              onClick={() => trackEvent("logo_click", "Navbar", "User clicked logo")}
            >
              Exclusive
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="hover:text-red-500 transition"
                onClick={() => trackEvent(`${item.label.toLowerCase()}_click`, "Navbar", `Clicked ${item.label}`)}
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <Link
                to="/signup"
                className="hover:text-red-500 transition"
                onClick={() => trackEvent("signup_click", "Navbar", "Clicked Sign Up link")}
              >
                Sign Up
              </Link>
            )}
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center bg-white rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 text-black outline-none w-40 lg:w-64"
              />
              <button
                className="bg-[#DB4444] text-white px-3 py-2 hover:bg-red-600 transition"
                onClick={() => trackEvent("search_click", "Navbar", "Clicked Search button")}
              >
                🔍
              </button>
            </div>

            <BadgeIcon to="/cart" count={cart.length} icon={FiShoppingCart} label="cart" />
            <BadgeIcon to="/wishlist" count={wishlist.length} icon={FiHeart} label="wishlist" />
            <Link
              to="/profile"
              onClick={() => trackEvent("profile_click", "Navbar", "Clicked Profile icon")}
              className="text-2xl hover:text-red-500"
            >
              <FiUser />
            </Link>
            {user && (
              <button onClick={handleLogout} className="text-2xl hover:text-red-500" title="Logout">
                <FiLogOut />
              </button>
            )}
          </div>

          {/* Hamburger Mobile Menu */}
          <button
            className="md:hidden text-2xl"
            onClick={() => {
              setIsOpen(!isOpen);
              trackEvent("mobile_menu_toggle", "Navbar", "Toggled mobile menu");
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 flex flex-col items-center gap-4 py-4 z-50">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              onClick={() => {
                trackEvent(`${item.label.toLowerCase()}_click`, "Navbar", `Clicked ${item.label} (mobile)`);
                setIsOpen(false);
              }}
              className="hover:text-red-500 transition"
            >
              {item.label}
            </Link>
          ))}
          {!user && (
            <Link
              to="/signup"
              onClick={() => {
                trackEvent("signup_click", "Navbar", "Clicked Sign Up (mobile)");
                setIsOpen(false);
              }}
              className="hover:text-red-500 transition"
            >
              Sign Up
            </Link>
          )}
          <div className="flex items-center justify-center gap-5 mt-3">
            <BadgeIcon to="/cart" count={cart.length} icon={FiShoppingCart} label="cart_mobile" />
            <BadgeIcon to="/wishlist" count={wishlist.length} icon={FiHeart} label="wishlist_mobile" />
            <Link
              to="/profile"
              onClick={() => {
                trackEvent("profile_click", "Navbar", "Clicked Profile (mobile)");
                setIsOpen(false);
              }}
            >
              <FiUser className="text-2xl hover:text-red-500" />
            </Link>
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-2xl hover:text-red-500"
              >
                <FiLogOut />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
