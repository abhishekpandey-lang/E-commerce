import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(state?.product || null);
  const [loading, setLoading] = useState(!state?.product);
  const [error, setError] = useState(false);

  // 🔹 Fetch product if not available from state
  useEffect(() => {
    if (!product) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);

          // 🎯 Track product view (Google Analytics)
          if (typeof gtag !== "undefined") {
            gtag("event", "view_product", {
              event_category: "Product Detail",
              event_label: data.name,
              value: data.price,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    } else {
      // 🎯 Track view for product from state
      if (typeof gtag !== "undefined") {
        gtag("event", "view_product", {
          event_category: "Product Detail",
          event_label: product.name,
          value: product.price,
        });
      }
    }
  }, [id, product]);

  // 🛒 Handle Buy Now click
  const handleBuyNow = () => {
    // 🎯 GA event for Buy Now
    if (typeof gtag !== "undefined") {
      gtag("event", "buy_now_click", {
        event_category: "Checkout",
        event_label: product.name,
        value: product.price,
      });
    }

    navigate("/checkout", { state: { product: { ...product, quantity: 1 } } });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center min-h-screen">
          <h2 className="text-xl">Loading Product...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!product || error) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center min-h-screen">
          <h2 className="text-xl">Product not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // 🧩 Default values
  const price = product.price ?? 0;
  const oldPrice = product.oldPrice ?? price + 50;
  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;
  const img = product.img ?? "/fallback-image.webp";

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-12 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 🖼 Product Image */}
          <div className="flex flex-col items-center">
            <img
              src={img}
              alt={product.name}
              className="w-80 object-contain rounded-lg shadow-md"
            />
          </div>

          {/* 🧾 Product Info */}
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mt-2">
              {product.description ?? "High quality product with best features."}
            </p>

            {/* 💰 Price */}
            <div className="mt-4 flex gap-4 items-center">
              <span className="text-red-500 text-2xl font-bold">${price}</span>
              <span className="line-through text-gray-500">${oldPrice}</span>
            </div>

            {/* ⭐ Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < rating ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-sm text-gray-600">({reviews} Reviews)</span>
              <span className="ml-4 text-green-600 font-medium">In Stock</span>
            </div>

            {/* 🛒 Buy Now */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleBuyNow}
                className="px-6 py-2 bg-[#DB4444] text-white rounded-lg hover:bg-red-600 transition"
              >
                Buy Now
              </button>
            </div>

            {/* 🚚 Delivery info */}
            <div className="mt-6 border p-4 rounded-lg">
              <p>🚚 Free Delivery</p>
              <p className="mt-2">↩️ 30 Days Return Delivery</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
