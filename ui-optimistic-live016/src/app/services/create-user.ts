import type { IUser } from '../types/IUser';

type CreateUserDTO = Omit<IUser, 'id'>;

export async function createUser({ blocked, name, username }: CreateUserDTO): Promise<IUser[]> {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
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

  return body as IUser[];
};
