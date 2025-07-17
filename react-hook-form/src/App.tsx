import { ErrorMessage } from "@hookform/error-message";
import { ThemeProvider } from "./app/context/theme-context";

import { useForm } from "react-hook-form";
import { Button } from "./ui/components/ui/button";
import { Input } from "./ui/components/ui/input";

interface IFormData {
  name: string;
  age: number;
}

export function App() {
  console.log("App renderizou");

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState
  } = useForm<IFormData>({
    defaultValues: {
      name: "",
    }
  });

  const handleSubmit = hookFormHandleSubmit(
    (data) => {
      console.log("Formulário submetido");
      console.log(data);
    },
    (errors) => {
      console.log(errors);
    }
  );

  const isDirty = Object.keys(formState.dirtyFields).length > 0;

  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">
            <div>
              <Input
                placeholder="Nome"
                {...register("name")}
              />

              <ErrorMessage
                errors={formState.errors}
                name="name"
                render={({ message }) => (
                  <small className="block text-red-400">
                    {message}
                  </small>
                )}
              />
            </div>


            <div>
              <Input
                type="number"
                placeholder="Idade"
                {...register("age", {
                  required: true,
                  setValueAs: age => Number(age)
                }
                )}
              />

              <ErrorMessage
                errors={formState.errors}
                name="age"
                render={({ message }) => (
                  <small className="block text-red-400">
                    {message}
                  </small>
                )}
              />
            </div>

            <div className="flex mt-4 gap-2">
              <Button type="button" className="flex-1" disabled={!isDirty}>Salvar</Button>
              <Button className="flex-1" disabled={isDirty}>Enviar</Button>
            </div>
          </form>
        </div>

      </div>
    </ThemeProvider>
  );
}
