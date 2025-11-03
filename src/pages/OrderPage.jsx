import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const trackingSteps = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    setOrders(savedOrders);

    const savedPayments = JSON.parse(localStorage.getItem("userPayments")) || [];
    savedOrders.forEach(order => {
      if (!savedPayments.find(p => p.orderId === order.id)) {
        savedPayments.push({
          orderId: order.id,
          amount: order.items.reduce((acc, i) => acc + i.price * i.quantity, 0),
          status: "Paid",
          refundStep: 0
        });
      }
    });
    localStorage.setItem("userPayments", JSON.stringify(savedPayments));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => {
        const updatedOrders = prevOrders.map(order => {
          if (order.status === "active") {
            const updatedItems = order.items.map(item => ({
              ...item,
              trackingStep: (item.trackingStep || 0) < trackingSteps.length - 1
                ? (item.trackingStep || 0) + 1
                : trackingSteps.length - 1
            }));
            return { ...order, items: updatedItems };
          }
          return order;
        });
        localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
        return updatedOrders;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const cancelOrderItem = (orderId, itemId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.map(item =>
          item.id === itemId ? { ...item, status: "cancelled" } : item
        );
        const orderStatus = updatedItems.every(i => i.status === "cancelled" || i.status === "returned")
          ? "completed"
          : "active";
        return { ...order, items: updatedItems, status: orderStatus };
      }
      return order;
    });

    const payments = JSON.parse(localStorage.getItem("userPayments")) || [];
    const paymentIndex = payments.findIndex(p => p.orderId === orderId);
    if (paymentIndex !== -1) {
      payments[paymentIndex].status = "Refunded";
      payments[paymentIndex].refundStep = 0;
    }
    localStorage.setItem("userPayments", JSON.stringify(payments));
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const returnOrderItem = (orderId, itemId) => {
    const returnedItems = JSON.parse(localStorage.getItem("returnedOrders")) || [];
    const order = orders.find(o => o.id === orderId);
    const item = order.items.find(i => i.id === itemId);
    returnedItems.push({ ...item, orderId, returnDate: new Date().toISOString() });
    localStorage.setItem("returnedOrders", JSON.stringify(returnedItems));

    const updatedOrders = orders.map(o => {
      if (o.id === orderId) {
        const updatedItems = o.items.map(i =>
          i.id === itemId ? { ...i, status: "returned" } : i
        );
        const orderStatus = updatedItems.every(i => i.status === "cancelled" || i.status === "returned")
          ? "completed"
          : "active";
        return { ...o, items: updatedItems, status: orderStatus };
      }
      return o;
    });

    const payments = JSON.parse(localStorage.getItem("userPayments")) || [];
    const paymentIndex = payments.findIndex(p => p.orderId === orderId);
    if (paymentIndex !== -1) {
      payments[paymentIndex].status = "Refunded";
      payments[paymentIndex].refundStep = 0;
    }
    localStorage.setItem("userPayments", JSON.stringify(payments));
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const activeOrders = orders.filter(order =>
    order.status === "active" && order.items.some(i => i.status !== "cancelled" && i.status !== "returned")
  );
  const cancelledOrders = orders.filter(order => order.status === "completed");

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Your Orders</h1>

        {activeOrders.length === 0 ? (
          <p className="text-center text-gray-600 mb-4">No active orders.</p>
        ) : (
          <div className="space-y-6">
            {activeOrders.map(order => (
              <div key={order.id} className="border rounded-xl shadow-lg p-4 bg-white">
                <p className="font-bold text-lg mb-3">Order #{order.id}</p>

                {order.items
                  .filter(i => i.status !== "cancelled" && i.status !== "returned")
                  .map(item => (
                    <div key={item.id} className="flex flex-col border rounded-lg p-3 bg-gray-50 hover:shadow-md transition">
                      <div className="flex items-center mb-3">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold mt-1">₹{item.price * item.quantity}</p>
                          <p className="text-xs text-gray-500 mt-1">Status: Active</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => cancelOrderItem(order.id, item.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => returnOrderItem(order.id, item.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Return
                          </button>
                        </div>
                      </div>

                      <div className="relative mt-4 flex items-center justify-between">
                        {trackingSteps.map((step, index) => {
                          const isCompleted = (item.trackingStep || 0) > index;
                          const isCurrent = (item.trackingStep || 0) === index;
                          return (
                            <div key={index} className="flex-1 flex flex-col items-center relative">
                              <div
                                className={`w-6 h-6 rounded-full z-10 ${
                                  isCompleted ? "bg-green-500" : isCurrent ? "bg-blue-500" : "bg-gray-300"
                                }`}
                              ></div>
                              <p className="text-xs text-center mt-1">{step}</p>
                              {index !== trackingSteps.length - 1 && (
                                <div className="absolute top-2.5 left-1/2 w-full h-1 z-0 transform -translate-x-1/2">
                                  <div className={`h-1 w-full ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}></div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        {cancelledOrders.length > 0 && (
          <div className="text-center mt-8">
            <Link to="/cancelledorders" className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">
              View Cancelled/Returned Orders ({cancelledOrders.length})
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
