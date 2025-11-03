import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Contact() {
  return (
    <>
      {/* Header / Navbar */}
      <Navbar />

      {/* Contact Section */}
      <section className="px-4 sm:px-8 lg:px-20 py-12 bg-gray-50">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-red-500">Home</Link>/
           <span className="text-red-500 font-medium">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side (Contact Info) */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
            {/* Call */}
            <div className="flex items-start gap-4">
              <div className="bg-red-100 text-red-500 p-3 rounded-full text-xl">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Call To Us</h3>
                <p className="text-gray-600 text-sm mt-1">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-gray-800 font-medium mt-2">+8801611112222</p>
              </div>
            </div>

            <hr />

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full text-xl">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Write To Us</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-gray-800 font-medium mt-2">
                  customer@exclusive.com
                </p>
                <p className="text-gray-800 font-medium">
                  support@exclusive.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className=" border-gray-300 rounded-lg w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className=" border-gray-300 rounded-lgw-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="text"
                  placeholder="Your Phone *"
                  className=" border-gray-300 rounded-lgw-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <textarea
                rows="6"
                placeholder="Your Message"
                className=" border-gray-300 rounded-lg w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              ></textarea>
              <button
                type="submit"
                className="border-gray-300 rounded-lg bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Contact;
