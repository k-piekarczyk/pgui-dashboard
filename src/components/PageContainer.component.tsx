import React, { FunctionComponent, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";

import { DateTime } from "luxon";

import ColorModeContext from "../context/colorMode.context";
import { useTranslation } from "react-i18next";
import LanguageContext from "../context/language.context";

interface PageContainerProps {
  header: string;
  previousPage?: {
    name: string;
    route: string;
  };
}

const PageContainer: FunctionComponent<PageContainerProps> = (props) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const langMode = React.useContext(LanguageContext);

  const [currentTime, setCurrentTime] = useState(DateTime.now());

  const { t, i18n } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Box sx={{ marginRight: 3 }}>
          {t("Language")}:
          <Button sx={{ marginLeft: 1 }} size="small" variant="outlined" onClick={langMode.toggleLanguage}>
            {i18n.language === "en" ? t("English") : t("Polish")}
          </Button>
        </Box>

        <Box>
          {t("Theme")}:
          <Button sx={{ marginLeft: 1 }} size="small" variant="outlined" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? t("Dark") : t("Light")}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Box>
          <h1>{props.header}</h1>
        </Box>
        <Box sx={{ marginLeft: "auto", fontSize: "2em" }}>
          <Box component="span" sx={{ marginRight: 1, fontWeight: 600 }}>
            {currentTime.toFormat("hh:mm", { locale: i18n.language })}
          </Box>
          <Box component="span" sx={{ fontWeight: 300 }}>
            {currentTime.toFormat("dd LLLL yyyy", { locale: i18n.language })}
          </Box>
        </Box>
      </Box>

      <Box>{props.children ?? "Nothing here"}</Box>
    </>
  );
};

export default PageContainer;
