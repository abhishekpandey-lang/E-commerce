import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function WishlistPage({ products }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Move to Cart button
  const handleMoveToCart = (product) => {
    addToCart(product);
    setSelectedProduct(product);
    navigate("/cart");
  };

  const relatedProducts = selectedProduct
    ? products.filter(
        (p) =>
          p.category === selectedProduct.category &&
          (p.id || p._id) !== (selectedProduct.id || selectedProduct._id)
      )
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">My Wishlist ❤️</h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlist.map((product) => {
              const uniqueId = product._id || product.id;
              return (
                <div
                  key={uniqueId}
                  className="border border-gray-200 rounded-lg p-4 shadow-md"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-40 w-full object-contain mb-3"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-red-500 font-bold">${product.price}</p>

                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full bg-[#DB4444] text-white py-2 rounded hover:bg-red-600 transition"
                    >
                      Move to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(uniqueId)} // ✅ FIXED: correct ID
                      className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Related Products */}
        {selectedProduct && relatedProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">
              Related Products to {selectedProduct.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p._id || p.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-md"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-28 w-full object-contain mb-2"
                  />
                  <h4 className="text-sm font-semibold">{p.name}</h4>
                  <p className="text-red-500 font-bold">${p.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default WishlistPage;
