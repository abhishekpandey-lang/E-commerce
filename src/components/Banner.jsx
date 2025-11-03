import React from "react";
import ReactGA from "react-ga4";

function Banner() {

  // जब user "Shop Now" बटन दबाएगा
  const handleShopNowClick = () => {
    // Google Analytics को event भेजो
    ReactGA.event({
      category: "Banner",
      action: "Click",
      label: "Shop Now Button"
    });

    // यहाँ तुम चाहो तो redirect या कुछ aur logic भी लिख सकते हो
    console.log("Shop Now button clicked!");
  };

  return (
    <section className="bg-black text-white p-6 mx-6 md:mx-12 flex flex-col md:flex-row justify-between items-center rounded-2xl w-auto overflow-hidden mt-10">

      {/* Text Section */}
      <div className="text-center md:text-left max-w-lg">
        <h2 className="text-base sm:text-lg">iPhone 14 Series</h2>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug break-words">
          Up to 10% off Voucher
        </h1>
        <button
          className="mt-4 text-black px-4 py-2 bg-[#DB4444] rounded-lg hover:bg-red-600 transition"
          onClick={handleShopNowClick}
        >
          Shop Now
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-6 md:mt-0 flex justify-center">
        <img
          src="-original-imaghx9qmgqsk9s4-removebg-preview.png"
          alt="iPhone"
          className="max-w-full h-auto w-40 sm:w-52 md:w-60 lg:w-72 object-contain"
        />
      </div>
    </section>
  );
}

export default Banner;
