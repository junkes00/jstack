import { useUsers } from '@/app/hooks/use-users';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Skeleton } from './ui/skeleton';
import { useUpdateUser } from '@/app/hooks/use-update-user';
import { cn } from '@/app/lib/utils';

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  async function handleBlockedChange(id: string, blocked: boolean) {
    await updateUser({ id, blocked });
  }

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
        <div
          key={user.id}
          className={cn(
            'flex border p-4 rounded-md items-center justify-between',
            user.status === 'pending' && 'opacity-70',
            user.status === 'error' && 'border-destructive bg-destructive/10',
          )}
        >
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
          <Switch
            checked={user.blocked}
            onCheckedChange={blocked => handleBlockedChange(user.id, blocked)}
            disabled={user.status === 'pending' || user.status === 'error'}
          />
        </div>
      ))}
    </div>
  );
}
