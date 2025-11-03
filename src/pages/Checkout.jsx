import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();

  // 🛒 Normalize cartItems or single product
  const initialItems = state?.cartItems
    ? state.cartItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        image: item.img || item.image || "https://via.placeholder.com/80",
      }))
    : state?.product
    ? [
        {
          ...state.product,
          quantity: 1,
          image: state.product.img || state.product.image || "https://via.placeholder.com/80",
        },
      ]
    : [];

  const [items, setItems] = useState(initialItems);
  const [formData, setFormData] = useState({
    firstName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const [payment, setPayment] = useState("");

  const subtotal = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { firstName, address, city, phone, email } = formData;
    if (!firstName || !address || !city || !phone || !email) {
      alert("⚠️ Please fill all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("⚠️ Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("⚠️ Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (!payment) {
      alert("⚠️ Please select a payment method.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    const order = {
      id: Date.now(),
      items,
      customer: formData,
      status: "active",
      placedAt: new Date().toISOString(),
    };

    // 🔹 Save order in backend/localStorage
    const existingOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    localStorage.setItem("userOrders", JSON.stringify([...existingOrders, order]));

    alert("✅ Your order is booked!");

    setFormData({
      firstName: "",
      company: "",
      address: "",
      apartment: "",
      city: "",
      phone: "",
      email: "",
    });
    setSaveInfo(false);
    setPayment("");
    setItems([]);

    navigate("/orders");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Billing Form */}
          <div>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Street Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Town / City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mobile Number*</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">
                  Save this information for faster check-out next time
                </span>
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="border border-gray-300 rounded p-6 space-y-5">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-3 border-b pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <span>{item.name || "Product"} (x{item.quantity})</span>
                  </div>
                  <span className="font-semibold">₹{Number(item.price) * item.quantity}</span>
                </div>
              ))
            ) : (
              <p>No items in checkout</p>
            )}
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="space-y-2 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Cash on delivery
              </label>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#DB4444] text-white py-3 rounded mt-3"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
