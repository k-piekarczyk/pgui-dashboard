import React, { FunctionComponent, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";

import { DateTime } from "luxon";

import ColorModeContext from "../context/colorMode.context";
import { useTranslation } from "react-i18next";
import LanguageContext from "../context/language.context";

import "./PageContainer.component.scss";
import { useNavigate } from "react-router";
import UserIcon from "./UserIcon.component";

interface PageContainerProps {
  header: string;
  loggedIn?: boolean;
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

  setInterval(() => setCurrentTime(DateTime.now()), 1000);

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const goBack = () => () => {
    navigate(props.previousPage!.route);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 2,
          paddingRight: 2,
          height: "75px",
        }}
      >
        {props.previousPage ? (
          <div className="PageContainer__back_container" onClick={goBack()}>
            <div className="PageContainer__arrow" />
            <div className="PageContainer__text">
              {t("Return to")}: {props.previousPage!.name}
            </div>
          </div>
        ) : undefined}

        <Box sx={{ marginRight: 3, marginLeft: "auto" }}>
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

        {props.loggedIn ? <UserIcon /> : undefined}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          paddingTop: 2,
          paddingBottom: 1,
          paddingLeft: 7,
          paddingRight: 7,
        }}
      >
        <div className="PageContainer__header">
          <h1>{props.header}</h1>
        </div>
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
