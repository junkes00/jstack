import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/app/context/theme-context";

import { Button } from "./ui/button";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    </Button>
  );
}

