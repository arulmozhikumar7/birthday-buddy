import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import github from "../assets/github-mark.png";
import globe from "../assets/globe.png";
const Help = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_serviceId,
        import.meta.env.VITE_templateId,
        e.target,
        import.meta.env.VITE_Publickey
      )
      .then(
        (result) => {
          setIsLoading(false);
          toast.success("Got your message.I will get back to you shortly!");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          setIsLoading(false);
          console.error("Failed to send email. Error:", error);
          toast.error("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <>
      <section className="relative text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col w-full mb-12 text-center">
            <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
              Contact Us
            </h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              Fill out the form to share your feedback or questions
            </p>
          </div>
          <div className="mx-auto lg:w-1/2 md:w-2/3">
            <div className="flex flex-wrap -m-2">
              <form onSubmit={sendEmail} className="flex flex-wrap w-full -m-2">
                <div className="w-1/2 p-2">
                  <div className="relative">
                    <label
                      for="name"
                      className="text-sm leading-7 text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200"
                    />
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="relative">
                    <label
                      for="email"
                      className="text-sm leading-7 text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200"
                    />
                  </div>
                </div>
                <div className="w-full p-2">
                  <div className="relative">
                    <label
                      for="message"
                      className="text-sm leading-7 text-gray-600"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none resize-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full p-2">
                  <button className="flex px-8 py-2 mx-auto text-lg text-white bg-teal-500 border-0 rounded focus:outline-none hover:bg-teal-600">
                    {isLoading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
              <div className="w-full p-2 pt-8 mt-8 text-center border-t border-gray-200">
                <a className="text-teal-500">arulmozhikumar7@gmail.com</a>
                <p className="my-5 leading-normal">
                  Chennai
                  <br />
                  Tamilnadu , India
                </p>
                <span className="inline-flex">
                  <a
                    className="ml-4 text-black"
                    href="https://www.arulmozhikumar.online"
                    target="_blank"
                  >
                    <img src={globe} className="w-5 h-5" srcset="" />
                  </a>
                  <a
                    className="ml-4 text-black"
                    href="https://www.instagram.com/arularul_7/"
                    target="_blank"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a
                    className="ml-4"
                    href="https://github.com/arulmozhikumar7"
                    target="_blank"
                  >
                    <img src={github} alt="" className="w-5 h-5" />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Help;
