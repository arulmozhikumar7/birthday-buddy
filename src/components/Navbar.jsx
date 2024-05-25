import React from "react";
import { useUser } from "../contexts/store";
import { auth, signInWithGoogle } from "../Auth/firebase";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/Assets/app-icon.png"
              className="h-8"
              alt="Birthday Buddy Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Birthday Buddy
            </span>
          </Link>
          <div className="flex flex-wrap items-center space-x-6 rtl:space-x-reverse">
            {user && (
              <button
                onClick={() => auth.signOut()}
                className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              >
                Logout
              </button>
            )}
            {user ? (
              <img
                src={user?.photoURL}
                className="order-2 w-8 h-8 rounded-full"
                alt=""
              />
            ) : (
              <a
                onClick={signInWithGoogle}
                className="order-1 text-sm text-gray-500 dark:text-white hover:underline"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 space-x-8 text-sm font-medium rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to="/birthdays"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Birthdays
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/about"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
