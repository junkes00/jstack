import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppBar } from './components/AppBar';
import { Toaster } from './components/ui/Toaster';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppBar />

        <BrowserRouter>
          <Router />
        </BrowserRouter>

        <Toaster richColors />
      </ThemeProvider>
    </AuthProvider>
  );
}
