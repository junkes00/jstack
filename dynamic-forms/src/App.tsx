import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Label } from "./components/label";

export function App() {
  const form = useForm({
    defaultValues: {
      links: [
        { title: "Link 01", url: "https://jstack.com.br" },
        { title: "Link 02", url: "https://instagram.com" },
      ],
    },
  });

  const links = useFieldArray({
    control: form.control,
    name: "links",
  });

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">Links</h1>

        <form className="mt-10 flex flex-col gap-4">
          {links.fields.map((link, index) => (
            <div key={link.id} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" {...form.register(`links.${index}.title`)} />
              </div>

              <div className="flex flex-1 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" {...form.register(`links.${index}.url`)} />
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    links.remove(index);
                  }}
                  tabIndex={-1}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed mt-6"
            onClick={() => {
              links.append({ title: "", url: "" });
            }}
          >
            <PlusCircleIcon className="size-4" />
            Adicionar novo link
          </Button>

          <div className="flex gap-4">
            <Button
              className="flex-1"
              type="button"
              variant="secondary"
              onClick={() => {
                links.insert(1, { title: "Insert at position 1", url: "" });
              }}
            >
              Insert
            </Button>

            <Button
              className="flex-1"
              type="button"
              variant="secondary"
              onClick={() => {
                links.move(1, 0);
              }}
            >
              Move
            </Button>

            <Button
              className="flex-1"
              type="button"
              variant="secondary"
              onClick={() => {
                links.replace([{ title: "Replace new array", url: "" }]);
              }}
            >
              Replace
            </Button>

            <Button
              className="flex-1"
              type="button"
              variant="secondary"
              onClick={() => {
                links.swap(1, 0);
              }}
            >
              Swap
            </Button>

            <Button
              className="flex-1"
              type="button"
              variant="secondary"
              onClick={() => {
                links.update(1, { title: "Updated title", url: "Updated url" });
              }}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
