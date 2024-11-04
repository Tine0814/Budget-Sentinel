import React, { useState, useEffect } from "react";
import { useThemeContext } from "@/core/context";
import { MoonIcon, SunIcon } from "@/assets";

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
      className="relative inline-block cursor-pointer"
    >
      <div
        className={`transition-transform duration-300 ${
          mode === "dark"
            ? "opacity-0 scale-50 absolute"
            : "opacity-100 scale-100"
        }`}
      >
        <MoonIcon width="30" height="30" />
      </div>

      <div
        className={`transition-transform duration-300 ${
          mode === "light"
            ? "opacity-0 scale-50 absolute"
            : "opacity-100 scale-100"
        }`}
      >
        <SunIcon width="30" height="30" />
      </div>
    </div>
  );
};

export default MoleculeThemeToggleButton;
