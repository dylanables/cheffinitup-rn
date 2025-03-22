import { collection, doc, addDoc, getDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const GetFavorites = async (uid) => {
  const docSnap = await getDoc(doc(db,'Favorites',uid))
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(doc(db, "Favorites", uid), {
      UID: uid,
      Favorites: [],
    })
  }
} 


const AddFavorite = async (uid, idMeal) => {
  console.log("ADD FAV: " + idMeal);
  try {
    const docRef = await addDoc(collection(db, "Favorites"), {
      UID: uid,
      Favorites: [],
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}