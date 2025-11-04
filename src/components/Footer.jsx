import { Link } from "react-router-dom";

function Footer() {

  // 📊 Google Analytics tracking helper
  const trackClick = (name, category = "Footer") => {
    if (window.gtag) {
      window.gtag("event", "footer_link_click", {
        event_category: category,
        event_label: name,
      });
    }
  };

  // 📩 Track newsletter subscription
  const handleSubscribe = () => {
    const emailInput = document.querySelector("#footer-email");
    const email = emailInput?.value.trim();

    if (email) {
      if (window.gtag) {
        window.gtag("event", "newsletter_subscribe", {
          event_category: "Newsletter",
          event_label: email,
        });
      }
      alert("Thank you for subscribing!");
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Exclusive</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for electronics, fashion, and lifestyle.  
            Shop with confidence and style.
          </p>
        </div>

        {/* Quick Links */}
         <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" onClick={() => trackClick("Home")} className="hover:text-red-500 transition">Home</Link></li>
            <li><Link to="/about" onClick={() => trackClick("About Us")} className="hover:text-red-500 transition">About Us</Link></li>
            <li><Link to="/contact" onClick={() => trackClick("Contact")} className="hover:text-red-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Support</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" onClick={() => trackClick("FAQ")} className="hover:text-red-500 transition">FAQ</Link></li>
            <li><Link to="/privacy-policy" onClick={() => trackClick("Privacy Policy")} className="hover:text-red-500 transition">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" onClick={() => trackClick("Terms & Conditions")} className="hover:text-red-500 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Subscribe</h3>
          <p className="text-sm mb-3">Get the latest deals and offers.</p>
          <div className="flex">
            <input
              id="footer-email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#DB4444] px-4 py-2 rounded-r hover:bg-red-600 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 py-4 text-sm">
        © 2025 <span className="text-white font-semibold">Exclusive</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
