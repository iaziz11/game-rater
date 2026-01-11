import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getListFromId(listId) {
  const q = doc(db, "lists", listId);
  const querySnapshot = await getDoc(q);
  if (querySnapshot.empty) {
    console.log("No matching lists.");
    return null;
  } else {
    return querySnapshot.data();
  }
}

export async function addGameToList(gameId, gameName, gameThumbnail, listId) {
  console.log("adding " + gameName + " to list: " + listId);
  const listRef = doc(db, "lists", listId);
  await updateDoc(listRef, {
    games: arrayUnion({ gameId, gameName, gameThumbnail }), // Replace with your actual item
  });
}

export async function removeGameFromList(listId, gameId) {
  console.log(listId, gameId);
  const docRef = doc(db, "lists", listId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.error("Document not found");
    return;
  }
  const data = docSnap.data();

  const updatedArray = data.games.filter((item) => item.gameId !== gameId);

  await updateDoc(docRef, {
    games: updatedArray,
  });
}

export async function createList(listName, user) {
  try {
    const docRef = await addDoc(collection(db, "lists"), {
      games: [],
      listName: listName,
      user: user,
      userCreated: true,
      dateCreated: Date.now(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function editList(listId, newList) {
  try {
    const docRef = doc(db, "lists", listId);
    await updateDoc(docRef, {
      ...newList,
    });
    console.log("List name updated successfully");
  } catch (e) {
    console.error("Error updating list name: ", e);
  }
}

export async function deleteList(listId) {
  try {
    const docRef = doc(db, "lists", listId);
    await deleteDoc(docRef);
    console.log("List deleted successfully");
  } catch (e) {
    console.error("Error deleting list: ", e);
  }
}
