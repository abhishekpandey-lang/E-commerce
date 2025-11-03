import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { login, googleLogin, redirectProduct, setRedirectProduct } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.message);
        return;
      }

      if (redirectProduct) {
        addToCart(redirectProduct);
        setRedirectProduct(null);
      }

      navigate("/cart");
    } catch (err) {
      setError("Login failed. Please try again!");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      const res = await googleLogin();
      if (!res.success) {
        setError(res.message);
        return;
      }

      if (redirectProduct) {
        addToCart(redirectProduct);
        setRedirectProduct(null);
      }

      navigate("/cart");
    } catch (err) {
      setError("Google login failed. Please try again!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🔐 Login Section */}
      <main className="flex flex-col md:flex-row flex-grow max-w-6xl mx-auto py-12 px-6 gap-10">
        {/* ✅ Left Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/shopping 2.jpg" // 👈 public folder me rakhna
            alt="Login Banner"
            className="w-full h-auto md:h-[500px] object-contain"
          />
        </div>

        {/* ✅ Right Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Log in to Exclusive</h2>
            <p className="text-gray-600 mb-6">Enter your details below</p>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Phone Number"
                className="w-full border-b border-gray-400 px-2 py-2 focus:outline-none"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-400 px-2 py-2 focus:outline-none"
                required
              />

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-[#DB4444] text-white px-6 py-2 rounded hover:bg-red-600 transition"
                >
                  Log In
                </button>
                <Link to="/forgot-password" className="text-red-500">
                  Forget Password?
                </Link>
              </div>
            </form>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded hover:bg-gray-100 transition"
            >
               <img src="/google.png" alt="Google" className="w-5 h-5" />
  <span>Log in with Google</span>
            </button>
          </div>
        </div>
      </main>

      {/* 🔻 Footer */}
      <Footer />
    </div>
  );
};

export default Login;
