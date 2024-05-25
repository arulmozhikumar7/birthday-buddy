import React, { useState } from "react";
import { useUser } from "../contexts/store";
import BirthdayForm from "./BirthdayForm";
import firestore from "../Auth/firestore";
import toast from "react-hot-toast";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
const formatDate = (dateString) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const BirthdayTable = () => {
  const { birthdays, setBirthdays, user } = useUser();
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({});

  const upcomingBirthdays = birthdays.filter((birthday) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const birthdayDate = new Date(birthday.date);
    return birthdayDate >= today && birthdayDate <= nextWeek;
  });

  const handleEdit = (birthday) => {
    setFormData(birthday);
    setFormVisible(true);
  };

  const handleDelete = async (birthday) => {
    try {
      await firestore.deleteBirthday(user, birthday.id);
      setBirthdays(birthdays.filter((b) => b.id !== birthday.id));
      toast.success("Birthday deleted successfully");
    } catch (err) {
      console.error("Error deleting birthday: ", err);
    }
  };

  const handleCloseForm = () => {
    setFormData({});
    setFormVisible(false);
  };

  const birthdaysByMonth = birthdays.reduce((acc, birthday) => {
    const month = new Date(birthday.date).getMonth();
    acc[month] = [...(acc[month] || []), birthday];
    return acc;
  }, {});

  const handleAddBirthday = () => {
    setFormData({});
    setFormVisible(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-4 mb-4 bg-gray-100 rounded-lg">
        <h2 className="mb-2 text-lg font-semibold">Upcoming Birthdays</h2>
        {upcomingBirthdays.length > 0 ? (
          <ul className="pl-5 list-disc">
            {upcomingBirthdays.map((birthday) => (
              <li key={birthday.id}>{`${birthday.name} - ${formatDate(
                birthday.date
              )}`}</li>
            ))}
          </ul>
        ) : (
          <p>No upcoming birthdays within a week.</p>
        )}

        <div className="flex justify-start mt-4">
          <button
            onClick={handleAddBirthday}
            className="p-2 m-2 text-white bg-black rounded-full hover:bg-blue-600"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="relative w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Profile</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Birthday</th>
              <th className="px-6 py-3"></th>{" "}
            </tr>
          </thead>
          {birthdays.length > 0 && (
            <tbody>
              {Object.entries(birthdaysByMonth).map(
                ([monthIndex, birthdays]) => (
                  <React.Fragment key={monthIndex}>
                    <tr className="bg-gray-200 dark:bg-gray-800">
                      <td colSpan="4" className="px-6 py-3">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {new Date(
                            new Date().getFullYear(),
                            parseInt(monthIndex)
                          ).toLocaleDateString("en-US", { month: "long" })}
                        </div>
                      </td>
                    </tr>
                    {birthdays.length > 0 &&
                      birthdays.map((birthday) => (
                        <tr
                          key={birthday.id}
                          className="relative bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={birthday.imageUrl}
                              alt="Profile"
                            />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {birthday.name}
                          </td>
                          <td className="px-6 py-4">
                            {formatDate(birthday.date)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="py-1" role="none">
                              <button
                                onClick={() => {
                                  handleEdit(birthday);
                                }}
                                className="block w-full my-3 text-sm text-left text-gray-700 "
                                role="menuitem"
                              >
                                <MdEdit size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(birthday);
                                }}
                                className="block w-full my-3 text-sm text-left text-red-600 "
                                role="menuitem"
                              >
                                <MdDelete size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                )
              )}
            </tbody>
          )}
          {birthdays.length === 0 && (
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td
                  colSpan="4"
                  className="w-full py-4 font-medium text-center text-gray-900 dark:text-white"
                >
                  No birthdays found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {formVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <BirthdayForm initialData={formData} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default BirthdayTable;
