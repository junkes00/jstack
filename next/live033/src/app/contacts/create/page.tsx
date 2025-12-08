import { ActionResponse } from '@/@types/ActionResponse';
import { ContactForm } from '@/components/ContactForm';
import { db } from '@/lib/db';
import { sleep } from '@/lib/utils';
import { createContactSchema } from '@/schema';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

async function submitAction(formData: FormData): Promise<ActionResponse> {
  'use server'

  const data = Object.fromEntries(formData);
  const parsedData = createContactSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      status: 'error',
      body: {
        message: parsedData.error.issues,
      }
    }
  }

  const { name, email } = parsedData.data;

  sleep(2000);
  const contact = await db.contact.create({
    data: {
      name,
      email
    }
  });

  return {
    status: 'success',
    body: { contact }
  }
}

export default function CreateContactPage() {
  // async function submitAction(formData: FormData): Promise<IActionResponse<IContactSuccess, IContactError>> {

  return (
    <>
      <header>
        <Link
          href="/"
          className="text-muted-foreground flex items-center gap-1 text-xs mb-2 dark:hover:text-sky-300 hover:text-sky-600"
        >
          <ArrowLeftIcon className="size-4" />
          <span>Voltar para a lista</span>
        </Link>
        <h1 className="font-semibold text-3xl tracking-tighter">
          Criar contato
        </h1>
      </header>

      <ContactForm submitAction={submitAction} />
    </>
  );
}
