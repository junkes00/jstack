import { sleep } from '../lib/utils';
import type { IUser } from '../types/IUser';

type UpdateUserDTO = Partial<Omit<IUser, 'id'>> & { id: string };

export async function updateUser({ id, blocked, name, username }: UpdateUserDTO): Promise<IUser> {
  await sleep();

  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      blocked,
      name,
      username,
    }),
  });
  const body = await response.json();

  return body as IUser;
};
