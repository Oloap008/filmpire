import { ThemeProvider, createTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ColorModeContext = createContext();

function ToggleColorModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  function toggleColorMode() {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) throw new Error("useColorMode used outside ColorModeContext");

  return context;
}

export default ToggleColorModeProvider;
