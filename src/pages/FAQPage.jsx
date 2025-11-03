import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FAQPage() {
  // 🔽 Toggle ke liye state
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I create an account?",
      answer:
        "Click on the 'Sign Up' button on the top right, fill in your details such as name, email, and password, and your account will be created instantly.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, Net Banking, and PayPal for international transactions.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes, once your order is shipped, you will receive a tracking ID on your registered email and phone number.",
    },
    {
      question: "How do I return a product?",
      answer:
        "You can place a return request within 7 days of delivery from your account dashboard under 'Orders'.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use advanced encryption and never share your details with third parties without your consent.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔝 Navbar */}
      <Navbar />

      {/* 📄 FAQ Content */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 cursor-pointer transition"
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {/* Answer */}
              {openIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* 🔻 Footer */}
      <Footer />
    </div>
  );
}

export default FAQPage;
