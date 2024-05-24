import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Auth/firebase";

export const getBirthdays = async (userId) => {
  try {
    const q = query(collection(db, "birthdays"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const birthdaysData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return birthdaysData;
  } catch (error) {
    console.error("Error getting birthdays: ", error);
    return [];
  }
};
