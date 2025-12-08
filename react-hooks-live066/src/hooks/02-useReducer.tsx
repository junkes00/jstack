import { Button } from "@/components/ui/button";
import { useReducer } from "react";

type User = {
  id: string;
  name: string;
  age: number;
};

export function Reducer() {
  const [state, dispatch] = useReducer<User>(
    (prevState, action) => {
      return {
        user: {
          id: crypto.randomUUID(),
          age: 18,
          name: "Nicolas",
        },
        isUnderage: false,
      };
    },
    {
      user: {
        id: crypto.randomUUID(),
        age: 18,
        name: "Nicolas",
      },
      isUnderage: false,
    }
  );

  function handleChangeName() {
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   name: "José",
    //   age: 58,
    // }));
  }

  function handleRefreshAge() {
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   age: 25,
    // }));
  }

  return (
    <div>
      <h1>Counter: {state.user.name}</h1>
      <h2>Counter: {state.user.age}</h2>
      <Button onClick={handleChangeName}>Trocar usuário</Button>
      <Button onClick={handleRefreshAge}>Atualizar idade</Button>
    </div>
  );
}
