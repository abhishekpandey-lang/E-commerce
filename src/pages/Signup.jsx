import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Password validation
  const isValidPassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 6 && hasLetter && hasNumber;
  };

  // ✅ Normal Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isValidPassword(form.password)) {
      setError("Password must contain letters & numbers and be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const res = await signup(form.email, form.password);
    if (!res.success) {
      setError(res.message);
    } else {
      navigate("/login");
    }

    setLoading(false);
  };

  // ✅ Google Signup
  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    const res = await googleLogin();
    if (!res.success) {
      setError(res.message);
    } else {
      navigate("/cart"); // ya /home
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🔐 Signup Section */}
      <main className="flex flex-col md:flex-row flex-grow max-w-6xl mx-auto w-full py-12 px-6 gap-10">
        {/* ✅ Left Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="shopping 2.jpg" // 👈 image public folder me dal do
            alt="Signup Banner"
            className="w-full max-w-lg object-contain"
          />
        </div>

        {/* ✅ Right Form Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Create an account</h2>
            <p className="text-gray-600 mb-6">Enter your details below</p>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="w-full border-b border-gray-400 px-2 py-2 focus:outline-none"
                required
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email or Phone Number"
                className="w-full border-b border-gray-400 px-2 py-2 focus:outline-none"
                required
              />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Password"
                className="w-full border-b border-gray-400 px-2 py-2 focus:outline-none"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#DB4444] text-white py-2 rounded hover:bg-red-600 transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Google Signup */}
            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded hover:bg-gray-100 transition"
            >
             <img src="/google.png" alt="Google" className="w-5 h-5" />
              <span>Sign up with Google</span>
            </button>

            {/* Already have account */}
            <p className="mt-6 text-gray-600 text-center">
              Already have account?{" "}
              <Link to="/login" className="text-black font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* 🔻 Footer */}
      <Footer />
    </div>
  );
};

export default Signup;
