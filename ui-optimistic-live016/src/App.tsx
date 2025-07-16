import { ThemeProvider } from './app/context/theme-context';
import { Header } from './components/header';
import { UserForm } from './components/user-form';

import { UsersList } from './components/users-list';

export function App() {
  return (
    <ThemeProvider>
      <div className="max-w-[500px] mx-auto mt-20">
        <Header />

        <main className="mt-10 space-y-3">
          <UserForm />
          <UsersList />
        </main>
      </div>
    </ThemeProvider>
  );
}
