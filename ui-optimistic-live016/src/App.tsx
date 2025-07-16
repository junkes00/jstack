import { ThemeProvider } from './app/context/theme-context';
import { ThemeSwitcher } from './components/theme-switcher';

export function App() {
  return (
    <ThemeProvider>
      <div>
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}
