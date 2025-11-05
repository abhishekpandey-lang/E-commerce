import { Link } from "react-router-dom";

// 🔹 GA4 + Clarity Event Tracker
const trackEvent = (action, category, label) => {
  // GA4 Event
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }

  // Microsoft Clarity Event
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", action, { category, label });
  }

  // Dev fallback
  if (typeof window === "undefined" || (!window.gtag && !window.clarity)) {
    console.log("Tracking Event:", action, category, label);
  }
};

function Footer() {
  const handleSubscribe = () => {
    const emailInput = document.querySelector("#footer-email");
    const email = emailInput?.value.trim();

    if (email) {
      trackEvent("newsletter_subscribe", "Newsletter", email);
      alert("Thank you for subscribing!");
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const links = [
    {
      title: "Quick Links",
      items: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Customer Support",
      items: [
        { to: "/faq", label: "FAQ" },
        { to: "/privacy-policy", label: "Privacy Policy" },
        { to: "/terms-and-conditions", label: "Terms & Conditions" },
      ],
    },
  ];

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

        {/* Links Sections */}
        {links.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    onClick={() => trackEvent("footer_link_click", "Footer", link.label)}
                    className="hover:text-red-500 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

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
