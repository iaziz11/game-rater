import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase.js";
import { userLogin } from "../services/userLogin.js";
import { userLogout } from "../services/userLogout.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      const { user, message } = await userLogin(email, password);
      console.log(message);
      setCurrentUser(user);
      navigate("/search");
    } catch (e) {
      console.log(e.message);
      // handle error
    }
  }
  async function logout() {
    await userLogout();
    setCurrentUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
