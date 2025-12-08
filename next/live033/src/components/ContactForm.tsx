'use client'

import { ActionResponse } from '@/@types/ActionResponse';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { ZodIssue } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface IContactFormProps {
  contact?: {
    name: string;
    email: string;
  };
  // submitAction: (formData: FormData) => Promise<IActionResponse<IContactSuccess, IContactError>>;
  submitAction: (formData: FormData) => Promise<ActionResponse>;
}

export function ContactForm({ contact, submitAction }: Readonly<IContactFormProps>) {
  const router = useRouter();

  // ! Somente a partir da versão 15 do next e 19 do react
  const [state, clientSubmitAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await submitAction(formData)

      // if (response?.status === 'error') {
      //   const errorMessage = response.body?.message.map((issue: ZodIssue) => issue.message).join(' | ');
      //   alert(errorMessage);
      // }

      if (response?.status === 'success') {
        router.push(`/`);
      }

      return response;
    },
    null,
  );

  return (
    <form className="space-y-4" action={clientSubmitAction}>
      {state?.body.message && state?.body.message.map((issue: ZodIssue) => issue.message).join(' | ')}
      <div className="space-y-1.5">
        <Label>Nome</Label>
        <Input
          defaultValue={contact?.name}
          name="name"
        />
      </div>

      <div className="space-y-1.5">
        <Label>E-mail</Label>
        <Input
          defaultValue={contact?.email}
          name="email"
        />
      </div>


      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2Icon className="size-4 mr-1 animate-spin" />}
        {contact ? 'Salvar' : 'Criar'}
      </Button>

    </form>
  );
}
