import { Link } from "react-router-dom";


import { FaStore, FaDollarSign, FaUsers, FaChartLine } from "react-icons/fa";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { FaTruck, FaHeadset, FaUndoAlt } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      {/* About Section */}
      <section className="px-4 sm:px-8 lg:px-20 py-12 bg-white">
        <div className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-red-500">Home</Link>
        / <span className="text-red-500 font-medium">About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Launched in 2025, Exclusive is India’s premier online shopping
              marketplace with a strong presence in fashion, electronics, and
              lifestyle.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Exclusive has over 20 million customers and more than 3 million
              products across categories.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="/shopping 2.jpg"
              alt="Our Story"
              className="rounded-lg shadow-lg w-full max-w-md lg:max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="px-4 sm:px-8 lg:px-20 py-12 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center transition-all duration-300 cursor-pointer hover:bg-red-500 hover:text-white">
            <FaStore className="text-4xl text-gray-800 mx-auto mb-4" />
            <div className="text-3xl font-bold">10.5k</div>
            <p className="mt-2">Sellers active on our site</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center transition-all duration-300 cursor-pointer hover:bg-red-500 hover:text-white">
            <FaDollarSign className="text-4xl text-gray-800 mx-auto mb-4" />
            <div className="text-3xl font-bold">33k</div>
            <p className="mt-2">Monthly Product Sale</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center transition-all duration-300 cursor-pointer hover:bg-red-500 hover:text-white">
            <FaUsers className="text-4xl text-gray-800 mx-auto mb-4" />
            <div className="text-3xl font-bold">45.5k</div>
            <p className="mt-2">Customers active on our site</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center transition-all duration-300 cursor-pointer hover:bg-red-500 hover:text-white">
            <FaChartLine className="text-4xl text-gray-800 mx-auto mb-4" />
            <div className="text-3xl font-bold">25k</div>
            <p className="mt-2">Annual gross sale on our site</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-8 lg:px-20 py-12 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Meet Our Team
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
        >
          {/* Member 1 */}
          <SwiperSlide>
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden text-center border border-gray-200">
              <img src="/professional 1.jpg" alt="Tom Cruise" className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Tom Cruise</h3>
                <p className="text-gray-500 text-sm">Founder & Chairman</p>
                <div className="flex justify-center space-x-6 mt-4 text-gray-600">
                  <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                  <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Member 2 */}
          <SwiperSlide>
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden text-center border border-gray-200">
              <img src="/professional 3.jpg" alt="Emma Watson" className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Emma Watson</h3>
                <p className="text-gray-500 text-sm">Managing Director</p>
                <div className="flex justify-center space-x-6 mt-4 text-gray-600">
                  <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                  <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Member 3 */}
          <SwiperSlide>
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden text-center border border-gray-200">
              <img src="/professional 2.jpg" alt="Will Smith" className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Will Smith</h3>
                <p className="text-gray-500 text-sm">Product Designer</p>
                <div className="flex justify-center space-x-6 mt-4 text-gray-600">
                  <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                  <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </SwiperSlide>
           {/* Member 4 */}
          <SwiperSlide>
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden text-center border border-gray-200">
              <img src="/professional 4.jpg" alt="Will Smith" className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Scarlett Johansson</h3>
                <p className="text-gray-500 text-sm">Chief Marketing Officer</p>
                <div className="flex justify-center space-x-6 mt-4 text-gray-600">
                  <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                  <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </SwiperSlide>
           {/* Member 5 */}
          <SwiperSlide>
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden text-center border border-gray-200">
              <img src="/professional 5.jpg" alt="Will Smith" className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Jennifer Lawrence</h3>
                <p className="text-gray-500 text-sm">HR Manager</p>
                <div className="flex justify-center space-x-6 mt-4 text-gray-600">
                  <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                  <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </SwiperSlide>
           {/* Member 6 */}
          <SwiperSlide>
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden text-center border border-gray-200">
              <img src="/professional  6.jpg" alt="Will Smith" className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Chris Evans</h3>
                <p className="text-gray-500 text-sm">Lead Developer</p>
                <div className="flex justify-center space-x-6 mt-4 text-gray-600">
                  <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                  <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      
<div className="px-6 sm:px-12 lg:px-20 py-12 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {/* Service 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-black text-white rounded-full p-6 mb-4">
              <FaTruck className="text-3xl" />
            </div>
            <h3 className="font-bold text-lg">FREE AND FAST DELIVERY</h3>
            <p className="text-gray-500 text-sm mt-2">
              Free delivery for all orders over $140
            </p>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-black text-white rounded-full p-6 mb-4">
              <FaHeadset className="text-3xl" />
            </div>
            <h3 className="font-bold text-lg">24/7 CUSTOMER SERVICE</h3>
            <p className="text-gray-500 text-sm mt-2">
              Friendly 24/7 customer support
            </p>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-black text-white rounded-full p-6 mb-4">
              <FaUndoAlt className="text-3xl" />
            </div>
            <h3 className="font-bold text-lg">MONEY BACK GUARANTEE</h3>
            <p className="text-gray-500 text-sm mt-2">
              We return money within 30 days
            </p>
          </div>
        </div>
      </div>
    
      <Footer />
    </>
  );
}

export default About;
