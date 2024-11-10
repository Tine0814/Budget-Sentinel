import React, { useState, useEffect } from "react";
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useThemeContext } from "@/core/context";

const MoleculeThemeToggleButton: React.FC = () => {
  const { toggleTheme, mode } = useThemeContext();
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    if (isToggling) {
      const timeout = setTimeout(() => setIsToggling(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isToggling]);

  const handleToggle = () => {
    setIsToggling(true);
    toggleTheme();
  };

  return (
    <div
      onClick={handleToggle}
      className="flex items-center justify-center w-[80px] h-[30px] p-1 bg-secondary-background-light dark:bg-secondary-background-dark rounded-full cursor-pointer relative transition-all duration-300"
    >
      <div
        className={`absolute h-6 w-6 bg-main-background-light dark:bg-main-background-dark rounded-full transition-transform duration-300 
          ${mode === "dark" ? "translate-x-full" : "-translate-x-full"}
        `}
      >
        {mode === "dark" ? (
          <FaMoon className="text-yellow-400 text-[15px] mx-auto mt-1" />
        ) : (
          <IoSunnySharp className="text-yellow-400 text-[15px] mx-auto mt-1" />
        )}
      </div>
    </div>
  );
};

export default MoleculeThemeToggleButton;
