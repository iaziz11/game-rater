import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { addGameToList, removeGameFromList } from "./gameLists";
import { fetchGameFromId } from "./gamesApi";

export async function changeGameRating(gameId, userId, newRating) {
  const userRef = doc(db, "ratings", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    console.log("usersnap exists");
    const userData = userSnap.data();
    const existingRating = userData?.ratings?.[gameId];
    if (newRating === null) {
      // 🧹 Remove rating and game from rated list
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          [`ratings.${gameId}`]: deleteField(),
        });

        // Find system list
        const listsRef = collection(db, "lists");
        const q = query(
          listsRef,
          where("user", "==", userId),
          where("userCreated", "==", false)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const ratedGamesListId = querySnapshot.docs[0].id;
          await removeGameFromList(ratedGamesListId, gameId);
          console.log(`Removed ${gameId} from ratings and system list.`);
        }
      }

      return;
    }
    if (existingRating !== undefined) {
      // Rating exists, update it
      await updateDoc(userRef, {
        [`ratings.${gameId}`]: newRating,
      });
    } else {
      // Rating does not exist, optionally add it or handle differently
      console.log("New rating");
      await updateDoc(userRef, {
        [`ratings.${gameId}`]: newRating,
      });
      const listsRef = collection(db, "lists");
      const q = query(
        listsRef,
        where("user", "==", userId),
        where("userCreated", "==", false)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const ratedGamesListId = querySnapshot.docs[0].id;
        console.log(ratedGamesListId);
        const gameData = await fetchGameFromId(gameId);
        console.log(gameData);
        await addGameToList(
          gameId,
          gameData[0].name,
          gameData[0].cover.url,
          ratedGamesListId
        );
      }
    }
  } else {
    // Document does not exist, create it with the new rating
    await setDoc(userRef, {
      ratings: {
        [gameId]: newRating,
      },
    });
    const listsRef = collection(db, "lists");
    const q = query(
      listsRef,
      where("user", "==", userId),
      where("userCreated", "==", false)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const ratedGamesListId = querySnapshot.docs[0].id;
      console.log(ratedGamesListId);
      const gameData = await fetchGameFromId(gameId);
      console.log(gameData);
      await addGameToList(
        gameId,
        gameData[0].name,
        gameData[0].cover.url,
        ratedGamesListId
      );
    }
  }
}

export async function getRatingFromGame(gameId, userId) {
  if (!userId || !gameId) return;
  const userRef = doc(db, "ratings", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    const rating = userData.ratings?.[gameId];

    if (rating !== undefined) {
      console.log(`Rating for ${gameId}:`, rating);
      return rating;
    } else {
      console.log(`No rating found for ${gameId}`);
      return null;
    }
  } else {
    console.log("User not found.");
    return null;
  }
}

export async function fetchRatingsFromList(gameList, userId) {
  if (!gameList || !userId) return;
  const userRef = doc(db, "ratings", userId);
  const userSnap = await getDoc(userRef);
  const res = {};
  if (userSnap.exists()) {
    const userData = userSnap.data();
    gameList.forEach((gameObj) => {
      if (userData.ratings?.[gameObj.gameId]) {
        res[gameObj.gameId] = userData.ratings?.[gameObj.gameId];
      }
      return;
    });
  }
  console.log(res);
  return res;
}
