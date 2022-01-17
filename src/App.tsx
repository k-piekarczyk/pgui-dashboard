import React from "react";
import { Route, Routes } from "react-router";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ColorModeContext from "./context/colorMode.context";
import getPalette from "./palette";

import LoginPage from "./pages/Login.page";
import DashboardPage from "./pages/Dashboard.page";
import RankingPage from "./pages/Ranking.page";
import LanguageContext from "./context/language.context";
import { useTranslation } from "react-i18next";

import "./App.scss"

export default function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";

          document.documentElement.className = "";
          document.documentElement.classList.add(`theme-${newMode}`);

          return newMode;
        });
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
          <div className="App">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/ranking" element={<RankingPage />} />
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LanguageContext.Provider>
  );
}
