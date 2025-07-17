import { ErrorMessage } from "@hookform/error-message";
import { ThemeProvider } from "./app/context/theme-context";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { sleep } from "./app/lib/utils";
import { Button } from "./ui/components/ui/button";
import { Input } from "./ui/components/ui/input";

interface IFormData {
  name: string;
  age: number;
  zipCode: string;
  street: string;
  city: string;
}

export function App() {
  console.log("App renderizou");

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState,
    reset,
    watch,
    getValues,
    setValue
  } = useForm<IFormData>({
    defaultValues: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const user = await response.json();
      console.log(user);

      await sleep(2000);

      return {
        name: user.name,
        age: 20,
        city: user.address.city,
        street: user.address.street,
        zipCode: user.address.zipcode
      };
    }
  });

  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      console.log("Formulário submetido");

      await sleep(2000);

      reset(data);
    },
    (errors) => {
      console.log(errors);
    }
  );

  const isDirty = Object.keys(formState.dirtyFields).length > 0;

  async function handleSearchZipCode() {
    const zipCode = getValues("zipCode");

    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    const body = await response.json();

    setValue("city", body.localidade);
    setValue("street", body.logradouro);
  }


  useEffect(() => {
    const { unsubscribe } = watch(async (formData, { name }) => {
      const zipcode = formData.zipCode ?? "";

      if (name === "zipCode" && zipcode.length >= 8) {
        const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
        const body = await response.json();

        setValue("city", body.localidade);
        setValue("street", body.logradouro);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setValue, watch]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {formState.isLoading && (
          <p>Carregando dados...</p>
        )}

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">
            <div>
              <Input
                placeholder="Nome"
                {...register("name", {
                  // required: true,
                  // min: 2,
                }
                )}
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
                  // required: true,
                  // min: 18,
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

            <div className="flex gap-2">
              <Input
                // type="number"
                placeholder="CEP"
                className="flex-1"
                {...register("zipCode")}
              />

              <Button
                type="button"
                variant="ghost"
                onClick={handleSearchZipCode}
              >
                Buscar
              </Button>
            </div>

            <Input
              placeholder="Cidade"
              {...register("city")}
            />

            <Input
              placeholder="Rua"
              {...register("street")}
            />

            <div className="flex mt-4 gap-2">
              <Button className="flex-1" disabled={!isDirty || formState.isSubmitting || !formState.isValid}>Salvar</Button>
              <Button className="flex-1" disabled={isDirty || formState.isSubmitting || formState.isValid}>Enviar</Button>
            </div>
          </form>
        </div>

      </div>
    </ThemeProvider>
  );
}
