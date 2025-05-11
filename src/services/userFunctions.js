import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "./firebase.js";

export async function userLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const foundUser = userCredential.user;
    console.log("Logged in user:", foundUser.email);
    return {
      user: foundUser.email,
      message: `Logged in as ${userCredential.user.email}`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function userLogout() {
  try {
    await signOut(auth);
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
}

export async function getListsFromUser(email) {
  const userId = email || null;
  const lists = [];
  const q = query(collection(db, "lists"), where("user", "==", userId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log("No matching documents.");
  } else {
    querySnapshot.forEach((doc) => {
      lists.push({ ...doc.data(), id: doc.id });
    });
  }
  return lists;
}
