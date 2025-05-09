import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

export async function userLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Logged in user:", user);
    return {
      user,
      message: `Logged in as ${userCredential.user.email}`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
