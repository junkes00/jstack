import { ThemeProvider } from "./app/context/theme-context";
import { ToggleTheme } from "./ui/components/toggle-theme";

export function App() {
  return (
    <ThemeProvider>
      <div className="flex max-w-lg mx-auto mt-20 items-center justify-between">
        <div>
          <h1>Template project</h1>
          <small>A tamplate to create new projects using Vite, Shadcn and Tailwind</small>
        </div>

        <div>
          <ToggleTheme />
        </div>
      </div>
    </ThemeProvider>
  );
}
