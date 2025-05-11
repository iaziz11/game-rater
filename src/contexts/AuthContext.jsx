import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase.js";
import { userLogin, userLogout } from "../services/userFunctions.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsUserLoggedIn(true);
      } else {
        setCurrentUser({});
        setIsUserLoggedIn(false);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      const { user, message } = await userLogin(email, password);
      console.log(message);
      setCurrentUser((cur) => ({ ...cur, user }));
      setIsUserLoggedIn(true);
      navigate("/search");
    } catch (e) {
      console.log(e.message);
      // handle error
    }
  }
  async function logout() {
    await userLogout();
    setCurrentUser({});
    setIsUserLoggedIn(false);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
