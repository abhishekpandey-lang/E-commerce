import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyPaymentPage() {
  const [payments, setPayments] = useState([]);

  const refundSteps = [
    "Return Initiated",
    "Received by Warehouse",
    "Refund Processed",
    "Amount Credited"
  ];

  useEffect(() => {
    const fetchPayments = () => {
      let savedPayments = JSON.parse(localStorage.getItem("userPayments")) || [];

      const savedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
      const returnedOrders = JSON.parse(localStorage.getItem("returnedOrders")) || [];

      // Ensure each order has a payment record
      savedOrders.forEach(order => {
        if (!savedPayments.find(p => p.orderId === order.id)) {
          savedPayments.push({
            id: savedPayments.length + 1,
            orderId: order.id,
            date: new Date().toISOString(),
            amount: order.items.reduce((acc, i) => acc + i.price * i.quantity, 0),
            method: "Not Specified",
            status: "Paid",
            refundStep: 0
          });
        }
      });

      // Update returned orders in payments
      returnedOrders.forEach(item => {
        let paymentIndex = savedPayments.findIndex(p => p.orderId === item.orderId);
        if (paymentIndex !== -1) {
          savedPayments[paymentIndex].status = "Refunded";
          savedPayments[paymentIndex].refundStep = item.trackingStep || 0;
          savedPayments[paymentIndex].refundDate = item.returnDate;
        } else {
          savedPayments.push({
            id: savedPayments.length + 1,
            orderId: item.orderId,
            date: new Date().toISOString(),
            amount: item.price * item.quantity,
            method: "Not Specified",
            status: "Refunded",
            refundStep: item.trackingStep || 0,
            refundDate: item.returnDate
          });
        }
      });

      localStorage.setItem("userPayments", JSON.stringify(savedPayments));
      setPayments(savedPayments);
    };

    fetchPayments(); // Initial fetch

    const interval = setInterval(fetchPayments, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          My Payments
        </h1>

        {payments.length === 0 ? (
          <p className="text-center text-gray-600">No payments found.</p>
        ) : (
          <div className="space-y-6">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="border rounded-xl shadow-lg p-4 bg-white hover:shadow-xl transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="font-medium text-lg">Order #{payment.orderId}</p>
                    <p className="text-sm text-gray-600">
                      Payment Date: {new Date(payment.date).toLocaleDateString()}
                    </p>
                    {payment.status === "Refunded" && payment.refundDate && (
                      <p className="text-sm text-gray-600">
                        Refund Initiated: {new Date(payment.refundDate).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-sm font-semibold mt-1">
                      ₹{payment.amount} via {payment.method}
                    </p>
                    <p className="text-xs mt-1">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          payment.status === "Paid"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Refund Tracking */}
                {payment.status === "Refunded" && (
                  <div className="relative mt-4 flex items-center justify-between">
                    {refundSteps.map((step, index) => {
                      const isCompleted = payment.refundStep > index;
                      const isCurrent = payment.refundStep === index;
                      return (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center relative"
                        >
                          <div
                            className={`w-6 h-6 rounded-full z-10 ${
                              isCompleted
                                ? "bg-green-500"
                                : isCurrent
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <p className="text-xs text-center mt-1">{step}</p>
                          {index !== refundSteps.length - 1 && (
                            <div className="absolute top-2.5 left-1/2 w-full h-1 z-0 transform -translate-x-1/2">
                              <div
                                className={`h-1 w-full ${
                                  isCompleted ? "bg-green-500" : "bg-gray-300"
                                }`}
                              ></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
