import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (!coupon) return;
    const data = { success: true, discountAmount: 50 };
    if (data.success) setDiscount(data.discountAmount);
    else alert("Invalid coupon");
  };

  useEffect(() => {
    setLoading(false);
  }, [cart]);

  if (loading) return <p className="text-center p-6">Loading cart...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 md:p-12">
        <h2 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id || item.id} // ✅ correct key
                  className="flex items-center justify-between border p-4 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-16 w-16 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id || item.id, parseInt(e.target.value))
                      } // ✅ correct id
                      className="border rounded px-2 py-1"
                    >
                      {[...Array(100).keys()].map((n) => (
                        <option key={n + 1} value={n + 1}>
                          {n + 1}
                        </option>
                      ))}
                    </select>

                    <span className="font-semibold">
                      ${item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(item._id || item.id)} // ✅ correct id
                      className="text-red-500 ml-2"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-4">
                <Link
                  to="/"
                  className="border rounded-lg px-4 py-2 border-gray-300 hover:bg-gray-100"
                >
                  Return To Shop
                </Link>
              </div>

              <div className="flex gap-2 mt-6">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="border rounded px-4 py-2 flex-1"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-[#DB4444] text-white px-4 py-2 rounded"
                >
                  Apply Coupon
                </button>
              </div>
            </div>

            <div className="border rounded-lg border-gray-300 p-6 h-fit">
              <h3 className="text-xl font-semibold mb-4">Cart Total</h3>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span>Discount:</span>
                <span className="text-green-600">-${discount}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              <button
                onClick={() =>
                  navigate("/checkout", { state: { cartItems: cart, total } })
                }
                className="w-full bg-[#DB4444] text-white py-3 mt-4 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
