import { db } from "../Auth/firebase";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
const addBirthday = async (user, name, date, imageUrl = "") => {
  try {
    if (!user) {
      throw new Error("User is not authenticated.");
    }

    await addDoc(collection(db, "birthdays"), {
      userId: user.uid,
      name,
      date,
      imageUrl,
    });
    return "Birthday added successfully!";
  } catch (error) {
    console.error("Error adding birthday: ", error);
    throw error;
  }
};

const deleteBirthday = async (user, birthdayId) => {
  try {
    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const birthdayRef = doc(db, "birthdays", birthdayId);
    await deleteDoc(birthdayRef);

    return "Birthday deleted successfully!";
  } catch (error) {
    console.error("Error deleting birthday: ", error);
    throw error;
  }
};

export default { addBirthday, deleteBirthday };
