import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Switch } from "./ui/switch";

interface IControledSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function ControledSwitch<T extends FieldValues>({ control, name }: Readonly<IControledSwitchProps<T>>) {
  const { field } = useController({ name, control });

  return (
    <Switch
      ref={field.ref}
      name={field.name}
      checked={field.value}
      disabled={field.disabled}
      onCheckedChange={field.onChange}
    />
  );
}
