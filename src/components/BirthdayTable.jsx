import React from "react";
import { useUser } from "../contexts/store";

const formatDate = (dateString) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const BirthdayTable = () => {
  const { birthdays } = useUser();
  const birthdaysByMonth = birthdays.reduce((acc, birthday) => {
    const month = new Date(birthday.date).getMonth();
    acc[month] = [...(acc[month] || []), birthday];
    return acc;
  }, {});

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Profile
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Birthday
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(birthdaysByMonth).map(([monthIndex, birthdays]) => (
            <React.Fragment key={monthIndex}>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <td colSpan="4" className="px-6 py-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {new Date(
                          new Date().getFullYear(),
                          parseInt(monthIndex)
                        ).toLocaleDateString("en-US", { month: "long" })}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {birthdays.map((birthday) => (
                <tr
                  key={birthday.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                  <td className="px-6 py-4">{formatDate(birthday.date)}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BirthdayTable;
