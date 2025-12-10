import { useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    
    if (theme === "dark") {
    
    document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition"
    >
      {theme === "light" ? <IoMdMoon className="text-yellow-500 text-2xl"/> : <MdSunny className="text-yellow-500 text-2xl"/>}
    </button>
  );
}
