import React from "react";
import { signInWithGoogle } from "../Auth/firebase";

const InfoPage = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-col items-center px-5 mx-auto md:flex-row">
          <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
            <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
              Birthday Buddy
            </h1>
            <p className="mb-8 leading-relaxed">
              At Birthday Buddy, we believe that every birthday is a milestone
              worth celebrating. Whether it's your own birthday or the birthday
              of someone dear to you, we're here to make every moment memorable.
            </p>
            <div className="flex justify-center">
              <button
                className="inline-flex px-6 py-2 text-lg text-white bg-teal-700 border-0 rounded focus:outline-none hover:bg-teal-800"
                onClick={signInWithGoogle}
              >
                Sign Up Now
              </button>
            </div>
          </div>
          <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
            <lottie-player
              src="https://lottie.host/533cf07e-1cb6-4ae2-9a00-72862c5f3b58/VAnid1HKJp.json"
              background="##ffffff"
              speed="1"
              style={{ width: "100%", height: "100%" }}
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoPage;
