import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { trackClarityEvent } from "../analytics/clarity";
import { useCart } from "../context/CartContext";
import Notification from "../components/Notification";

function ProductDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(
    state?.product || {
      name: "Sample Product",
      description: "High quality product with best features.",
      price: 100,
      oldPrice: 150,
      rating: 4,
      reviews: 20,
      img: "/fallback-image.webp",
      category: "Uncategorized",
      _id: id || "sample-id",
    }
  );
  const [notification, setNotification] = useState(null);

  // 🔹 Page View Tracking
  useEffect(() => {
    window.scrollTo(0, 0);

    const trackView = (data) => {
      // GA4 Event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "view_item", {
          event_category: "Product Detail",
          event_label: data.name,
          value: data.price ?? 0,
          items: [
            {
              id: data._id || id,
              name: data.name,
              category: data.category ?? "Uncategorized",
              price: data.price ?? 0,
            },
          ],
        });
      }

      // Microsoft Clarity Event
      trackClarityEvent("Product_View", {
        productId: data._id || id,
        productName: data.name,
        category: data.category ?? "Uncategorized",
        price: data.price ?? 0,
      });
    };

    trackView(product);
  }, [id, product]);

  // 🔹 Buy Now button
  const handleBuyNow = () => {
    if (!product) return;

    // GA4 event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "begin_checkout", {
        event_category: "Checkout",
        event_label: product.name,
        value: product.price ?? 0,
        items: [
          {
            id: product._id || id,
            name: product.name,
            category: product.category ?? "Uncategorized",
            price: product.price ?? 0,
            quantity: 1,
          },
        ],
      });
    }

    // Clarity event
    trackClarityEvent("BuyNow_Click", {
      productId: product._id || id,
      productName: product.name,
      category: product.category ?? "Uncategorized",
      price: product.price ?? 0,
      quantity: 1,
    });

    navigate("/checkout", { state: { product: { ...product, quantity: 1 } } });
  };

  // 🔹 Add to Cart button
  const handleAddToCart = () => {
    addToCart(product);
    setNotification(`${product.name} added to cart 🛒`);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "add_to_cart", {
        event_category: "Cart",
        event_label: product.name,
        value: product.price ?? 0,
      });
    }

    trackClarityEvent("Add_To_Cart", {
      productId: product._id || id,
      productName: product.name,
      category: product.category ?? "Uncategorized",
      price: product.price ?? 0,
    });

    setTimeout(() => setNotification(null), 2000);
  };

  const price = product.price ?? 0;
  const oldPrice = product.oldPrice ?? price + 50;
  const rating = Math.min(product.rating ?? 0, 5);
  const reviews = product.reviews ?? 0;
  const img = product.img ?? "/fallback-image.webp";

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-12 min-h-screen bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="flex flex-col items-center">
            <img
              src={img}
              alt={product.name}
              className="w-80 object-contain rounded-lg shadow-md bg-white"
              onError={(e) => (e.target.src = "/fallback-image.webp")}
            />
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="mt-4 flex gap-4 items-center">
              <span className="text-red-500 text-2xl font-bold">${price}</span>
              <span className="line-through text-gray-500">${oldPrice}</span>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-yellow-400 text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < rating ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-sm text-gray-600">({reviews} Reviews)</span>
              <span className="ml-4 text-green-600 font-medium">In Stock</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={handleBuyNow}
                className="px-6 py-2 bg-[#DB4444] text-white rounded-lg hover:bg-red-600 transition"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Delivery info */}
            <div className="mt-6 border p-4 rounded-lg bg-white shadow-sm">
              <p>🚚 Free Delivery on all orders</p>
              <p className="mt-2">↩️ 30 Days Easy Return Policy</p>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <Notification
          key={notification}
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <Footer />
    </>
  );
}

export default ProductDetail;
