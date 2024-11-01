import { Color } from "@/data/colors";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  theme: Color;
  setTheme: (newTheme: Color) => void;
};

const primaryProp = ["--sidebar-background", "--primary", "--chart-1"];
const accentProp = ["--sidebar-accent"];
const foregroundProps = [
  "--sidebar-primary-foreground",
  "--sidebar-accent-foreground",
];

export const useThemeStore = create<Store>()(
  devtools(
    persist(
    (set) => ({
      theme: {
        name: "slate-800",
        label: "Slate",
        primary: "217.2 32.6% 17.5%",
        accent: "215.3 25% 26.7%",
        foreground: "210 40% 96.1%",
      },
      setTheme: (newTheme: Color) => {
        primaryProp.forEach((prop) => {
          document.documentElement.style.setProperty(prop, newTheme.primary);
        });
        accentProp.forEach((prop) => {
          document.documentElement.style.setProperty(prop, newTheme.accent);
        });
        foregroundProps.forEach((prop) => {
          document.documentElement.style.setProperty(prop, newTheme.foreground);
        })

        set({ theme: newTheme });
      },
    }),
    {
      name: "theme-store",
    }
    )
  )
);
