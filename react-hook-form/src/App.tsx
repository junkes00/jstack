import { useEffect, useState } from "react";
import { ThemeProvider } from "./app/context/theme-context";
import { sleep } from "./app/lib/utils";
import type { IUser } from "./app/types/IUser";
import { Form } from "./ui/components/form";

async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();

  sleep(3000);

  return {
    name: user.name,
    age: 20,
    city: user.address.city,
    street: user.address.street,
    zipcode: "89056112",
  };
}

export function App() {
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    getUser()
      .then(user => setUser(user));
  }, []);

  return (
    <ThemeProvider>
      <Form user={user} />
    </ThemeProvider>
  );
}
