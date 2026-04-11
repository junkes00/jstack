import { useUsers } from '@/app/hooks/useUsers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Skeleton } from './ui/skeleton';

export function UsersList() {
  const { users, isLoading } = useUsers();

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </>
      )}

      {users.map(user => (
        <div key={user.id} className="flex border p-4 rounded-md items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div>
              <strong className="block text-lg leading-4">{user.name}</strong>
              <small className="text-muted-foreground">@{user.username}</small>
            </div>

          </div>
          <Switch />
        </div>
      ))}
    </div>
  );
}
