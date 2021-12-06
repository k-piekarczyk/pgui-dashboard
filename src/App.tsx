import React from "react";
import { Route, Routes } from "react-router";

import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ColorModeContext from "./context/colorMode.context";
import getPalette, { colorPalette as cp } from "./palette";

import LoginPage from "./pages/Login.page";
import LanguageContext from "./context/language.context";
import { useTranslation } from "react-i18next";

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

  const { i18n } = useTranslation();

  const [, setLang] = React.useState<"en" | "pl">("en");
  const langMode = React.useMemo(
    () => ({
      toggleLanguage: () => {
        setLang((prevLang) => {
          const newLang = prevLang === "pl" ? "en" : "pl";

          i18n.changeLanguage(newLang);

          return newLang;
        });
      },
    }),
    [i18n],
  );

  const theme = React.useMemo(() => createTheme(getPalette(mode) as any), [mode]);

  return (
    <LanguageContext.Provider value={langMode}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: cp.background, color: cp.text.primary }}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LanguageContext.Provider>
  );
}
