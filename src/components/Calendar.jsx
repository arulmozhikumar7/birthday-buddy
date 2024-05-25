import { Menu, Transition } from "@headlessui/react";
import { IoEllipsisVertical } from "react-icons/io5";
import {
  FaAngleRight,
  FaAnglesRight,
  FaAngleLeft,
  FaAnglesLeft,
  FaCirclePlus,
} from "react-icons/fa6";
import BirthdayForm from "./BirthdayForm";
import firestore from "../Auth/firestore";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { Fragment, useState } from "react";
import { useUser } from "../contexts/store";
import toast from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
  const { birthdays, formModal, setFormModal } = useUser();
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let [formInitialData, setFormInitialData] = useState({});
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextYear() {
    let firstDayNextYear = add(firstDayCurrentMonth, { years: 1 });
    setCurrentMonth(format(firstDayNextYear, "MMM-yyyy"));
  }

  function previousYear() {
    let firstDayNextYear = add(firstDayCurrentMonth, { years: -1 });
    setCurrentMonth(format(firstDayNextYear, "MMM-yyyy"));
  }

  let selectedDayBirthdays = birthdays.filter((birthday) => {
    const birthdayDate = parseISO(birthday.date);
    return (
      birthdayDate.getFullYear() <= selectedDay.getFullYear() &&
      birthdayDate.getMonth() === selectedDay.getMonth() &&
      birthdayDate.getDate() === selectedDay.getDate()
    );
  });

  const handleOpenForm = (birthday = {}) => {
    setFormInitialData(birthday);
    setFormModal(true);
  };

  const handleCloseForm = () => {
    setFormModal(false);
    setFormInitialData({});
  };

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousYear}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous year</span>
                <FaAnglesLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <FaAngleLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <FaAngleRight className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextYear}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next year</span>
                <FaAnglesRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {birthdays.some((birthday) => {
                      const birthdayDate = parseISO(birthday.date);
                      return (
                        birthdayDate.getFullYear() <= day.getFullYear() &&
                        birthdayDate.getMonth() === day.getMonth() &&
                        birthdayDate.getDate() === day.getDate()
                      );
                    }) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Birthdays for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayBirthdays.length > 0 ? (
                <>
                  {selectedDayBirthdays.map((birthday) => (
                    <Birthday
                      birthday={birthday}
                      key={birthday.id}
                      onEdit={() => handleOpenForm(birthday)}
                    />
                  ))}

                  <button
                    className="px-4 py-2 text-black"
                    type="button"
                    onClick={() => handleOpenForm()}
                  >
                    <FaCirclePlus size={30} />
                  </button>

                  {formModal && (
                    <div className="max-w-2xl mx-auto">
                      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                      <BirthdayForm
                        initialData={formInitialData}
                        onClose={handleCloseForm}
                      />
                    </div>
                  )}
                </>
              ) : (
                <li>
                  <p>No birthdays for today.</p>
                  <button
                    className="py-2 text-black"
                    type="button"
                    onClick={() => handleOpenForm()}
                  >
                    <FaCirclePlus size={30} />
                  </button>
                  {formModal && (
                    <div className="max-w-2xl mx-auto">
                      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                      <BirthdayForm
                        initialData={formInitialData}
                        onClose={handleCloseForm}
                      />
                    </div>
                  )}
                </li>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function Birthday({ birthday, onEdit }) {
  const { user, setBirthdays, birthdays } = useUser();

  const handleDelete = async ({ user, birthdayId }) => {
    try {
      await firestore.deleteBirthday(user, birthdayId);
      setBirthdays(birthdays.filter((b) => b.id !== birthdayId));
      toast.success("Birthday deleted successfully");
    } catch (err) {
      console.error("Error deleting birthday: ", err);
    }
  };

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <img
        src={birthday.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{birthday.name}</p>
      </div>

      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <IoEllipsisVertical className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onEdit}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item
                onClick={() => handleDelete({ user, birthdayId: birthday.id })}
              >
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
