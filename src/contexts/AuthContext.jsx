import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase.js";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../services/userFunctions.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsUserLoggedIn(false);
      }
      setAuthLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);
  const navigate = useNavigate();

  async function register(email, password) {
    try {
      const res = await userRegister(email, password);
      if (res.error) {
        throw res.code;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function login(email, password) {
    try {
      const { user } = await userLogin(email, password);
      setCurrentUser(user);
      setIsUserLoggedIn(true);
      // navigate("/search");
    } catch (e) {
      console.log(e.message);
      // handle error
    }
  }

  async function logout() {
    await userLogout();
    setCurrentUser(null);
    setIsUserLoggedIn(false);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isUserLoggedIn,
        authLoading,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
