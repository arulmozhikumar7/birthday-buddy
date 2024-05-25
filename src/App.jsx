import React, { useEffect } from "react";
import { auth, onAuthStateChanged } from "./Auth/firebase";
import { useUser } from "./contexts/store";
import { getBirthdays } from "./hooks/useGetBirthdays";
import Calendar from "./components/Calendar";
import BirthdayTable from "./components/BirthdayTable";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import InfoPage from "./pages/InfoPage";
import About from "./pages/About";
import Help from "./pages/Help";
const App = () => {
  const { user, setUser, setBirthdays } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
      if (user) {
        getBirthdays(user ? user.uid : null)
          .then((result) => {
            setBirthdays(result);
          })
          .catch((error) => {
            console.error("Error fetching birthdays: ", error);
          });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Calendar />} />
          </>
        ) : (
          <Route path="/" element={<InfoPage />} />
        )}
        {user && <Route path="/birthdays" element={<BirthdayTable />} />}
        <Route path="about" element={<About />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" duration={3000} />
    </BrowserRouter>
  );
};

export default App;
