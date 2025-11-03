import { useState } from "react";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ResetPassword() {
  const auth = getAuth();
  const [params] = useSearchParams();
  const oobCode = params.get("oobCode"); // Firebase reset code
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      alert("✅ Password has been reset successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md p-6 border rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter New Password"
            className="w-full border px-3 py-2 mb-4 rounded"
          />
          <button
            onClick={handleReset}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ResetPassword;

