import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { sleep } from "./sleep";
import type { IUser } from "./types";

export function Posts() {
  const queryClient = useQueryClient();

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: ['users'],
      queryFn: async (): Promise<IUser[]> => {
        await sleep();
        const response = await fetch('http://localhost:3000/users');
        return response.json();
      },
    })
  }

  return (
    <pre>
      <div>Posts</div>

      <br />
      <br />

      <Link to="/" onMouseEnter={handleMouseEnter}>Ir para usuários</Link>
    </pre>

  )
}
