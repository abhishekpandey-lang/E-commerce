import { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged
} from "firebase/auth";

// ✅ firebase.js se auth & googleProvider import karo
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectProduct, setRedirectProduct] = useState(null);

  // 🔄 Track user state from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Signup with Firebase
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ✅ Login with Firebase
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ✅ Google Login/Signup
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ✅ Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        googleLogin,
        logout,
        redirectProduct,
        setRedirectProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
