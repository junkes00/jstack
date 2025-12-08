'use server'

import { ActionResponse } from '@/@types/ActionResponse';
import { db } from '@/lib/db';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function deleteContactAction(contactId: string): Promise<ActionResponse> {
  try {
    await sleep();
    await db.contact.delete({ where: { id: contactId } });

    revalidatePath('/');

    return {
      status: 'success',
      body: { contactId }
    }
  } catch {
    return {
      status: 'error',
      body: {
        message: 'Erro ao deletar o contato!'
      }
    }
  }
}