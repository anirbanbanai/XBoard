import React, { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/navbar.jsx";
import { RouteA } from "./routes/route.js"; // Ensure this path is correct

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  return (
    <div
      className={`fullbodymood min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <nav>
        <Navbar />
      </nav>
      <main className="flex-grow">
        <RouteA />
      </main>
      <footer className="w-full">
        <Footer />
        <div className="bg-[#1B405D]">
          <h1 className="text-center text-[12px] text-white p-3">
            Copyright 2024 - All right reserved by airTalX
          </h1>
        </div>
      </footer>
    </div>
  );
}

export default App;
