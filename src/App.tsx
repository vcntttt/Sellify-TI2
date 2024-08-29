import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">        
        <h1>Hello World</h1>
      </ThemeProvider>
  );
}