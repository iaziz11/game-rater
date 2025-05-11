import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getListsFromId(listId) {
  const q = doc(db, "lists", listId);
  const querySnapshot = await getDoc(q);
  if (querySnapshot.empty) {
    console.log("No matching lists.");
    return null;
  } else {
    return querySnapshot.data();
  }
}
