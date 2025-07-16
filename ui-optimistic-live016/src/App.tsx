import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from './app/context/theme-context';
import { Header } from './components/header';
import { UserForm } from './components/user-form';

import { queryClient } from './app/lib/queryClient';
import { UsersList } from './components/users-list';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="max-w-[500px] mx-auto mt-20">
          <Header />

          <main className="mt-10 space-y-3">
            <UserForm />
            <UsersList />
          </main>
        </div>
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
