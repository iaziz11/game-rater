import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
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
      user: foundUser,
      message: `Logged in as ${userCredential.user.email}`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function userRegister(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create user metadata in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
    });

    return {
      success: true,
      uid: user.uid,
      email: user.email,
    };
  } catch (error) {
    console.log(error.code);
    const errorMessage =
      error.code === "auth/weak-password"
        ? "Please make sure password is at least 6 characters"
        : error.code === "auth/email-already-in-use"
        ? "This email is already in use, please try another one or reset your password"
        : "Something went wrong, please try again.";
    return {
      success: false,
      error: errorMessage,
      code: error.code,
    };
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
