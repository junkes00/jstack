import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { sleep } from "@/app/lib/utils";
import type { IUser } from "@/app/types/IUser";

interface IFormProps {
  user: IUser;
}

export function Form({ user }: Readonly<IFormProps>) {
  console.log("App renderizou");

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<IUser>({
    values: user,
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      console.log("Formulário submetido");

      await sleep(2000);

      reset(data);
    },
    (errors) => {
      console.log(errors);
    },
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
                required: {
                  value: true,
                  message: "Campo obrigatório",
                },
              },
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
                required: true,
                setValueAs: age => Number(age),
              },
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
              placeholder="CEP"
              className="flex-1"
              {...register("zipCode", {
                required: {
                  value: true,
                  message: "Campo obrigatório",
                },
              },
              )}
            />

            <Button
              type="button"
              variant="ghost"
              onClick={handleSearchZipCode}
            >
              Buscar
            </Button>

          </div>
          <ErrorMessage
            errors={formState.errors}
            name="zipCode"
            render={({ message }) => (
              <small className="block text-red-400">
                {message}
              </small>
            )}
          />

          <Input
            placeholder="Cidade"
            {...register("city")}
          />

          <Input
            placeholder="Rua"
            {...register("street")}
          />

          <div className="flex mt-4 gap-2">
            <Button className="flex-1" disabled={!isDirty || formState.isSubmitting}>Salvar</Button>
            <Button className="flex-1" disabled={isDirty || formState.isSubmitting}>Enviar</Button>
          </div>
        </form>
      </div>

    </div>
  );
};
