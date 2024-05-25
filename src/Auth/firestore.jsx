import { db } from "../Auth/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getBirthdays } from "../hooks/useGetBirthdays";
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

    await getBirthdays(user.uid);
    return "Birthday added successfully!";
  } catch (error) {
    console.error("Error adding birthday: ", error);
    throw error;
  }
};

export default addBirthday;
