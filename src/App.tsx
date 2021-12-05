import React from "react";
import { Route, Routes } from "react-router";

import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ColorModeContext from "./context/colorMode.context";
import getPalette, { colorPalette as cp } from "./palette";

import Navbar from "./components/Navbar.component";

import Home from "./pages/Home.page";

export default function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme(getPalette(mode) as any), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: cp.background, color: cp.text.primary }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
