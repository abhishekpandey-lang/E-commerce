import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔝 Navbar */}
      <Navbar />

      {/* 📄 Main Content */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-gray-700 mb-6">
          Welcome to our website. By accessing and using our platform, you agree
          to be bound by the following Terms & Conditions. Please read them
          carefully before proceeding.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By registering, accessing, or using our services, you acknowledge
            that you have read, understood, and agree to be bound by these
            Terms & Conditions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Use of Services</h2>
          <p className="text-gray-700">
            You agree to use the services only for lawful purposes and in
            accordance with all applicable local, national, and international
            laws and regulations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Accounts</h2>
          <p className="text-gray-700">
            You are responsible for maintaining the confidentiality of your
            account information and for all activities under your account. We
            reserve the right to suspend or terminate accounts at our
            discretion.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Orders & Payments</h2>
          <p className="text-gray-700">
            All orders placed through our website are subject to availability
            and acceptance. Prices and availability may change without prior
            notice.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p className="text-gray-700">
            We are not responsible for any damages arising from the use of our
            services, including but not limited to direct, indirect, incidental,
            or consequential damages.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to update or modify these Terms & Conditions at
            any time. Continued use of our services constitutes acceptance of
            any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms & Conditions, feel free
            to contact us at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 underline"
            >
              support@example.com
            </a>
            .
          </p>
        </section>
      </main>

      {/* 🔻 Footer */}
      <Footer />
    </div>
  );
}

export default TermsAndConditionsPage;
