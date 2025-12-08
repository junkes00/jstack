import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { EditContactForm } from './EditContactForm';

const contact = {
  email: 'edit@jstack.com.br',
  name: 'Editing Contact...',
};

interface ICreateContactPageProps {
  params: {
    contactId: string;
  }
}

export default async function EditContactPage({ params }: Readonly<ICreateContactPageProps>) {
  const { contactId } = params;

  const contact = await db.contact.findUnique({
    where: { id: contactId },
  });

  if (!contact) {
    return redirect('/');
  }

  return <EditContactForm contact={contact} />
}
