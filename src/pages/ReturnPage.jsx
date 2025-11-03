import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReturnPage() {
  const [returnedItems, setReturnedItems] = useState([]);
  const refundSteps = [
    "Return Initiated",
    "Received by Warehouse",
    "Refund Processed",
    "Amount Credited"
  ];

  useEffect(() => {
    const savedReturned = JSON.parse(localStorage.getItem("returnedOrders")) || [];
    const initialized = savedReturned.map(item => ({
      ...item,
      trackingStep: item.trackingStep || 0
    }));
    setReturnedItems(initialized);
  }, []);

  // Auto progress tracking every 4s per step
  useEffect(() => {
    const interval = setInterval(() => {
      setReturnedItems(prevItems => {
        const updatedItems = prevItems.map(item => {
          if ((item.trackingStep || 0) < refundSteps.length - 1) {
            const newStep = (item.trackingStep || 0) + 1;

            // Update payments in localStorage at last step
            const payments = JSON.parse(localStorage.getItem("userPayments")) || [];
            const paymentIndex = payments.findIndex(p => p.orderId === item.orderId);
            if (newStep === refundSteps.length - 1) {
              if (paymentIndex !== -1) {
                payments[paymentIndex].status = "Refunded";
                payments[paymentIndex].refundStep = newStep;
                payments[paymentIndex].refundDate = new Date().toISOString();
              } else {
                payments.push({
                  id: payments.length + 1,
                  orderId: item.orderId,
                  date: new Date().toISOString(),
                  amount: item.price * item.quantity,
                  method: "Not Specified",
                  status: "Refunded",
                  refundStep: newStep,
                  refundDate: new Date().toISOString()
                });
              }
              localStorage.setItem("userPayments", JSON.stringify(payments));
            }

            return { ...item, trackingStep: newStep };
          }
          return item;
        });
        localStorage.setItem("returnedOrders", JSON.stringify(updatedItems));
        return updatedItems;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const deleteReturnedItem = (orderId, itemId) => {
    const updatedItems = returnedItems.filter(
      item => !(item.orderId === orderId && item.id === itemId)
    );
    setReturnedItems(updatedItems);
    localStorage.setItem("returnedOrders", JSON.stringify(updatedItems));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Returned Items</h1>
        {returnedItems.length === 0 ? (
          <p className="text-center text-gray-600">No returned items yet.</p>
        ) : (
          <div className="space-y-6">
            {returnedItems.map(item => (
              <div
                key={`${item.orderId}-${item.id}`}
                className="flex flex-col border rounded-lg p-3 bg-gray-50 hover:shadow-md transition"
              >
                <div className="flex items-center mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className={`text-sm font-semibold mt-1 ${item.trackingStep === refundSteps.length - 1 ? "text-green-600" : ""}`}>
                      ₹{item.price * item.quantity}{" "}
                      {item.trackingStep === refundSteps.length - 1 && "✔️"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Order #{item.orderId}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Returned on: {new Date(item.returnDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    <button
                      onClick={() => deleteReturnedItem(item.orderId, item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Refund Tracking System */}
                <div className="relative mt-4 flex items-center justify-between">
                  {refundSteps.map((step, index) => {
                    const isCompleted = (item.trackingStep || 0) > index;
                    const isCurrent = (item.trackingStep || 0) === index;
                    const isLastStep = index === refundSteps.length - 1;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center relative">
                        <div className={`w-6 h-6 rounded-full z-10 flex items-center justify-center ${
                          isCompleted ? "bg-green-500" : isCurrent ? "bg-blue-500" : "bg-gray-300"
                        }`}>
                          {isLastStep && isCompleted && "✔️"}
                        </div>
                        <p className="text-xs text-center mt-1">{step}</p>
                        {index !== refundSteps.length - 1 && (
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
        )}
      </div>
      <Footer />
    </>
  );
}
