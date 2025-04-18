
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
