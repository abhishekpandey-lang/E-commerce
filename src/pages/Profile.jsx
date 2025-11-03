import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // 🔹 Load profile info + image from localStorage
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const savedImage = localStorage.getItem("profileImage");
      setProfileImage(savedImage || null);

      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
      }));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle image upload and save to localStorage
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      setProfileImage(imageData);
      localStorage.setItem("profileImage", imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!user) return;

    // Password validation
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("⚠️ New password and confirm password do not match!");
      return;
    }

    setLoading(true);

    try {
      // Password update
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          alert("⚠️ Please enter your current password to change password.");
          setLoading(false);
          return;
        }

        const credential = EmailAuthProvider.credential(
          user.email,
          formData.currentPassword
        );

        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, formData.newPassword);
        alert("✅ Password updated successfully!");
      }

      alert("✅ Profile saved successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error(error);
      alert("⚠️ Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-gray-500 text-sm mb-6">
          <Link to="/" className="hover:text-red-500">
            Home
          </Link>
          /<span className="text-black font-medium">My Account</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Manage My Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="text-red-500 font-medium">My Profile</li>
              <li>Address Book</li>
              <li>
                <Link to="/mypayments" className="hover:text-red-500">
                  My Payment Options
                </Link>
              </li>
            </ul>

            <h3 className="font-bold text-lg mt-6">My Orders</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/orders" className="hover:text-red-500">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/return" className="hover:text-red-500">
                  My Returns
                </Link>
              </li>
              <li>
                <Link to="/cancelledorders" className="hover:text-red-500">
                  My Cancellations
                </Link>
              </li>
            </ul>

            <h3 className="font-bold text-lg mt-6">My Wishlist</h3>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-6">
              Edit Your Profile
            </h2>

            {/* Profile Image Section */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-24 h-24">
                <img
                  src={
                    profileImage ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
              </div>
              <label className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Password Changes */}
            <h3 className="mt-6 font-semibold">Password Changes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 border border-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-red-500 text-white rounded"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
