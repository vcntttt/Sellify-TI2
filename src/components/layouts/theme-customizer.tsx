import { colors } from "@/data/colors";
import { Button } from "../ui/button";
import { useThemeStore } from "@/store/theme";
import { Label } from "../ui/label";
import clsx from "clsx";

export default function ThemeCustomizer() {
  const { setTheme } = useThemeStore();

  return (
    <div className="flex flex-col gap-4">

      <Label>Color Primario</Label>
      {colors.map((color) => (
        <Button
          variant={"outline"}
          size="sm"
          key={color.primary}
          onClick={() => {
            setTheme(color);
          }}
          className={"justify-start"}
        >
          <span
            className={clsx(
              "mr-5 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full",
              {
                "bg-slate-800": color.name === "slate",
                "bg-blue-600": color.name === "blue",
                "bg-red-600": color.name === "red",
              }
            )}
          >
          </span>
          {color.label}
        </Button>
      ))}
    </div>
  );
}
