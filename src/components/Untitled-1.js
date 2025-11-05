import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactGA from "react-ga4"; // ✅ Added for tracking

function Profile() {
  const navigate = useNavigate();

  // LocalStorage से user data लाना
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ Page view track + user redirect logic
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/profile" });

    if (!storedUser) {
      navigate("/login");
    } else {
      setFormData({
        firstName: storedUser.firstName || "",
        lastName: storedUser.lastName || "",
        email: storedUser.email || "",
        address: storedUser.address || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [navigate]);

  // Handle change (Track input edits)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // ✅ GA4 tracking for input edits
    ReactGA.event({
      category: "Profile Interaction",
      action: "Edited Field",
      label: name,
    });
  };

  // Save changes
  const handleSave = () => {
    // Password validation
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("⚠️ New password and confirm password do not match!");
      return;
    }

    // User update
    const updatedUser = {
      ...storedUser,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      password: formData.newPassword ? formData.newPassword : storedUser.password,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("✅ Profile updated successfully!");

    // ✅ Track save event
    ReactGA.event({
      category: "Profile Interaction",
      action: "Saved Profile Changes",
      label: `${formData.firstName} ${formData.lastName}`,
    });
  };

  // Cancel button handler (Track cancel event)
  const handleCancel = () => {
    ReactGA.event({
      category: "Profile Interaction",
      action: "Cancelled Edit",
    });
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <p className="text-gray-500 text-sm mb-6">
          Home / <span className="text-black font-medium">My Account</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Manage My Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="text-red-500 font-medium">My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>

            <h3 className="font-bold text-lg mt-6">My Orders</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>

            <h3 className="font-bold text-lg mt-6">My Wishlist</h3>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-6">Edit Your Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Last Name</label>
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
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Address</label>
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
              <div>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Current Password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-red-500 text-white rounded"
              >
                Save Changes
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
