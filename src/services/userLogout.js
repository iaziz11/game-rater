import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // Make sure your Firebase instance is initialized

const userLogout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

export { userLogout };
