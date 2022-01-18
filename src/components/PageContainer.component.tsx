import React, { FunctionComponent, useState, useEffect } from "react";
import { Button, useTheme } from "@mui/material";

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

  useEffect(() => {
    const clockInterval = setInterval(() => setCurrentTime(DateTime.now()), 1000);

    return function cleanup() {
      clearInterval(clockInterval);
    };
  }, []);

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const goBack = () => () => {
    navigate(props.previousPage!.route);
  };

  return (
    <div className="PageContainer">
      <div className="PageContainer__Controls">
        {props.previousPage ? (
          <div className="PageContainer__Controls__Nav" onClick={goBack()}>
            <div className="PageContainer__Controls__Nav-arrow" />
            <div className="PageContainer__Controls__Nav-text">
              {t("Return to")}: {props.previousPage!.name}
            </div>
          </div>
        ) : undefined}

        <div className="PageContainer__Controls__Lang">
          {t("Language")}:
          <Button size="small" variant="outlined" onClick={langMode.toggleLanguage}>
            {i18n.language === "en" ? t("English") : t("Polish")}
          </Button>
        </div>

        <div className="PageContainer__Controls__Theme">
          {t("Theme")}:
          <Button size="small" variant="outlined" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? t("Dark") : t("Light")}
          </Button>
        </div>

        {props.loggedIn ? <UserIcon /> : undefined}
      </div>

      <div className="PageContainer__Header">
        <h1 className="PageContainer__Header-text">{props.header}</h1>

        <div className="PageContainer__Header__Clock">
          <span className="PageContainer__Header__Clock-time">
            {currentTime.toFormat("HH:mm")}
          </span>
          <span className="PageContainer__Header__Clock-date">
            {currentTime.toFormat("dd LLLL yyyy", { locale: i18n.language })}
          </span>
        </div>
      </div>

      <div className="PageContainer__Children">{props.children ?? "Nothing here"}</div>
    </div>
  );
};

export default PageContainer;
