import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function CancelledOrdersPage() {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Orders fetch from backend or fallback to localStorage
  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders"); // backend API
      const allOrders = res.data;
      const filtered = allOrders.filter((order) =>
        order.items.some((item) => item.status === "cancelled")
      );
      setCancelledOrders(filtered);
    } catch (error) {
      console.error("Backend not reachable, using localStorage fallback.", error);
      const savedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
      const filtered = savedOrders.filter((order) =>
        order.items.some((item) => item.status === "cancelled")
      );
      setCancelledOrders(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Delete cancelled item
  const handleDelete = async (orderId, itemId) => {
    try {
      // Backend delete
      await axios.delete(`/api/orders/${orderId}/items/${itemId}`);
    } catch (error) {
      console.warn("Backend delete failed, updating localStorage only.", error);
    }

    // Update state
    const updatedOrders = cancelledOrders
      .map((order) => {
        if (order.id === orderId || order._id === orderId) {
          return {
            ...order,
            items: order.items.filter((item) => item.id !== itemId && item._id !== itemId),
          };
        }
        return order;
      })
      .filter((order) => order.items.length > 0);

    setCancelledOrders(updatedOrders);

    // Update localStorage fallback
    const allOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    const updatedAllOrders = allOrders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.filter((item) => item.id !== itemId),
        };
      }
      return order;
    });
    localStorage.setItem("userOrders", JSON.stringify(updatedAllOrders));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center min-h-screen">Loading cancelled orders...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Cancelled Orders</h1>

        {cancelledOrders.length === 0 ? (
          <p className="text-center text-gray-600">No cancelled orders.</p>
        ) : (
          <div className="space-y-6">
            {cancelledOrders.map((order) => (
              <div key={order.id || order._id} className="border rounded-xl shadow-lg p-6 bg-white">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <p className="font-bold text-lg text-gray-500 line-through">
                    Order #{order.id || order._id}
                  </p>
                </div>

                <div className="space-y-4">
                  {order.items
                    .filter((item) => item.status === "cancelled")
                    .map((item) => (
                      <div
                        key={item.id || item._id}
                        className="flex flex-col sm:flex-row items-center sm:items-start border rounded-lg p-4 bg-gray-50"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg mr-4 mb-2 sm:mb-0"
                        />
                        <div className="flex-1">
                          <p className="font-medium line-through text-gray-500">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold text-gray-700">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(order.id || order._id, item.id || item._id)}
                          className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
