import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "../contexts/store";
import { storage } from "../Auth/firebase";
import addBirthday from "../Auth/firestore";
import { getBirthdays } from "../hooks/useGetBirthdays";
import toast from "react-hot-toast";
const BirthdayForm = () => {
  const { user, setFormModal, setBirthdays } = useUser();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
      await addBirthday(user, name, date, imageUrl);
      toast.success("Birthday added successfully");
      setIsLoading(false);
      setFormModal(false);
      setBirthdays(await getBirthdays(user.uid));
      setName("");
      setDate("");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add birthday. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto h-modal md:h-full">
      <div className="relative w-full h-auto max-w-md px-4">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setFormModal(false)}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form
            className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-medium text-gray-900">
              Add a new birthday
            </h3>
            <div>
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Tyler Durden"
                required="true"
              />
            </div>
            <div>
              <label
                for="date"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Birth date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name="date"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required="true"
              />
            </div>
            <div>
              <label
                for="image"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                id="file_input"
                onChange={(e) => setImageFile(e.target.files[0])}
                name="image"
                type="file"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isLoading ? "Adding birthday..." : "Add Birthday"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BirthdayForm;
