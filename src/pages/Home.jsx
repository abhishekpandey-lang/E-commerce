import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, selectTheme } from "../redux/themeSlice";
import { FiSun, FiMoon } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

import FlashSale from "../components/FlashSales";
import BrowseByCategory from "../components/BrowseByCategory";
import BestSelling from "../components/BestSelling";
import MusicBanner from "../components/MusicBanner";
import ExploreProducts from "../components/ExploreProducts";
import NewArrival from "../components/NewArrival";

function Home() {
  const [flashSaleItems, setFlashSaleItems] = useState([]);
  const [bestSellingItems, setBestSellingItems] = useState([]);
  const [newArrivalItems, setNewArrivalItems] = useState([]);
  const [exploreItems, setExploreItems] = useState([]);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  // 🔹 Fetch data for each section
  useEffect(() => {
    // Example: fetch from localStorage / Firebase / API
    const fetchFlashSale = JSON.parse(localStorage.getItem("flashSale")) || [];
    const fetchBestSelling = JSON.parse(localStorage.getItem("bestSelling")) || [];
    const fetchNewArrival = JSON.parse(localStorage.getItem("newArrival")) || [];
    const fetchExplore = JSON.parse(localStorage.getItem("exploreProducts")) || [];

    setFlashSaleItems(fetchFlashSale);
    setBestSellingItems(fetchBestSelling);
    setNewArrivalItems(fetchNewArrival);
    setExploreItems(fetchExplore);
  }, []);

  return (
    <div className="bg-white">
      <Navbar />

      {/* Theme toggle (visible on Home page) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 mt-4">
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="theme-switch"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>

      {/* Wrapper to keep content centered */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Row 1: Sidebar + Banner */}
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <div className="hidden lg:block lg:w-1/5">
            <Sidebar />
          </div>
          <div className="w-full lg:w-4/5">
            <Banner />
          </div>
        </div>

        {/* Row 2: Flash Sale */}
        <div className="mt-8">
          <FlashSale items={flashSaleItems} />
        </div>

        {/* Row 3: Browse By Category */}
        <div className="mt-8">
          <BrowseByCategory />
        </div>

        {/* Row 4: Best Selling */}
        <div className="mt-8">
          <BestSelling items={bestSellingItems} />
        </div>

        {/* Row 5: Music Banner */}
        <div className="my-10">
          <MusicBanner />
        </div>

        {/* Row 6: Explore Our Products */}
        <div className="my-10">
          <ExploreProducts items={exploreItems} />
        </div>

        {/* Row 7: New Arrival */}
        <div className="my-10">
          <NewArrival items={newArrivalItems} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
