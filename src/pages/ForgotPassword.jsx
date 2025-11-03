import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ForgotPassword() {
  const auth = getAuth();
  const [input, setInput] = useState("");
  

  // ✅ Email Reset
  const handleEmailReset = async () => {
    try {
      await sendPasswordResetEmail(auth, input);
      alert("📩 Password reset link sent to your email!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex justify-center items-center mt-10">
        <div className="w-full max-w-md p-6 border rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          <p className="text-gray-600 mb-4">
            Enter your registered email.
          </p>

          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Email  (@gmail.com)"
            className="w-full border px-3 py-2 mb-4 rounded"
          />

          {/* Email Reset Button */}
          <button
            onClick={handleEmailReset}
            className="w-full bg-red-500 text-white py-2 rounded mb-3"
          >
            Send Reset Link (Email)
          </button>

         
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
