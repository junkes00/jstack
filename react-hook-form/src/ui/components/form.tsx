import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { sleep } from "@/app/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import type { IUser } from "@/app/types/IUser";
import { ControledSwitch } from "./controled-switch";

const schema = z.object({
  blocked: z.boolean().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  zipcode: z.string(),
  age: z.number().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface IFormProps {
  user: IUser;
}

export function Form({ user }: Readonly<IFormProps>) {
  const form = useForm<FormData>({
    values: {
      ...user,
      blocked: false,
    },
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit: hookFormHandleSubmit,
    control,
    formState,
    register,
    // reset,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    setFocus,
    trigger,
  } = form;

  console.log("Form renderizou");

  useEffect(() => {
    const { unsubscribe } = watch(async (formData, { name }) => {
      const zipcode = formData.zipcode ?? "";

      if (name === "zipcode" && zipcode.length >= 8) {
        const response = await fetch(
          `https://viacep.com.br/ws/${zipcode}/json/`
        );
        const body = await response.json();

        if (body.erro) {
          setError("zipcode", {
            type: "validate",
            message: "O CEP informado é inválido",
          });

          return;
        }

        setValue("city", body.localidade);
        setValue("street", body.logradouro);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setError, setValue, watch]);

  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      console.log("Formulário submetido");

      await sleep(2000);

      console.log(data);

      // reset(data);
    },
    (errors) => {
      console.log(errors);
    }
  );

  async function handleSearchZipCode() {
    const zipcode = getValues("zipcode");

    const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
    const body = await response.json();

    setValue("city", body.localidade);
    setValue("street", body.logradouro);
  }

  const isDirty = Object.keys(formState.dirtyFields).length > 0;

  return (
    <FormProvider {...form}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {formState.isLoading && <p>Carregando dados...</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">
          <div>
            <ControledSwitch control={control} name="blocked" />
          </div>

          <div>
            <Input placeholder="Nome" {...register("name")} />

            <ErrorMessage
              errors={formState.errors}
              name="name"
              render={({ message }) => (
                <small className="block text-red-400">{message}</small>
              )}
            />
          </div>

          <div>
            <Input
              type="number"
              placeholder="Idade"
              {...register("age", {
                setValueAs: (age) => Number(age),
              })}
            />

            <ErrorMessage
              errors={formState.errors}
              name="age"
              render={({ message }) => (
                <small className="block text-red-400">{message}</small>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="CEP"
              className="flex-1"
              {...register("zipcode")}
            />

            <Button type="button" variant="ghost" onClick={handleSearchZipCode}>
              Buscar
            </Button>
          </div>
          <ErrorMessage
            errors={formState.errors}
            name="zipcode"
            render={({ message }) => (
              <small className="block text-red-400">{message}</small>
            )}
          />

          <Input placeholder="Cidade" {...register("city")} />

          <Input placeholder="Rua" {...register("street")} />

          <div className="flex mt-4 gap-2">
            <Button
              className="flex-1"
              disabled={!isDirty || formState.isSubmitting}
            >
              Salvar
            </Button>
            <Button
              className="flex-1"
              disabled={isDirty || formState.isSubmitting}
            >
              Enviar
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => {
                clearErrors();
              }}
            >
              Limpar erros
            </Button>

            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => {
                setFocus("age");
              }}
            >
              Focar na idade
            </Button>

            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => {
                trigger("age");
              }}
            >
              Forçar validação
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
