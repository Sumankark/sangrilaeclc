import React from "react";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const LangTranslator = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (language) => {
    // Ensure that i18n has been properly initialized
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(language);
    } else {
      console.error(
        "i18n is not properly initialized or changeLanguage is not a function"
      );
    }
    setIsDropdownOpen(false); // Close dropdown after language change
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg shadow-lg"
        onClick={toggleDropdown}
      >
        <MdLanguage className="mr-1 text-xl" /> {i18n.language.toUpperCase()}
      </button>
      {isDropdownOpen && (
        <div className="mt-2 ml-[-60px] bg-white shadow-lg rounded-md w-32">
          <button
            onClick={() => changeLanguage("en")}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("np")}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            नेपाली
          </button>
        </div>
      )}
    </div>
  );
};

export default LangTranslator;
