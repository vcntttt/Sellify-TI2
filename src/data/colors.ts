export interface Color {
  name: string;
  label: string;
  primary: string;
  accent: string;
  foreground: string;
}

export const colors: Color[] = [
  {
    name: "red",
    label: "Rojo",
    primary: "0 73.7% 41.8%",
    accent: "0 70% 35.3%",
    foreground: "210 40% 96.1%"

  },
  {
    name: "blue",
    label: "Azul",
    primary: "224.3 76.3% 48%",
    accent: "225.9 70.7% 40.2%",
    foreground: "210 40% 96.1%"

  },
  {
    name: "slate",
    label: "Slate",
    primary: "217.2 32.6% 17.5%",
    accent: "215.3 25% 26.7%",
    foreground: "210 40% 96.1%"
  },
];

