import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Section */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy & Policy</h1>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold">Exclusive</span>, we respect your
            privacy and are committed to protecting the personal information you
            share with us. This Privacy Policy explains how we collect, use, and
            safeguard your data when you use our website and services.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal details like name, email, phone number, and address.</li>
              <li>Payment and billing information for transactions.</li>
              <li>Browsing behavior, device info, and cookies to enhance experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process and deliver your orders.</li>
              <li>To provide customer support and assistance.</li>
              <li>To send promotional offers, updates, and newsletters.</li>
              <li>To improve website performance and user experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Data Protection</h2>
            <p>
              We use advanced security measures to protect your personal
              information from unauthorized access, alteration, or disclosure.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
            <p>
              We do not sell or rent your personal information. We may share your
              details only with trusted third parties like payment processors and
              shipping partners to complete your order.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
            <p>
              Our website uses cookies to personalize your experience and analyze
              site traffic. You can choose to disable cookies in your browser
              settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access and update your personal information.</li>
              <li>Request deletion of your account and personal data.</li>
              <li>Opt-out from receiving promotional communications.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with the updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              feel free to reach us at{" "}
              <span className="font-semibold">support@exclusive.com</span>.
            </p>
          </div>
        </section>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
