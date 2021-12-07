import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer.component";
import Tile from "../components/Tile.component";

import "./Dashboard.page.scss";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <PageContainer
      header={t("Good evening") + `, ${localStorage.getItem("user")}!`}
      previousPage={{ route: "/", name: t("Account selection") }}
      loggedIn={true}
    >
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          flexWrap: "wrap",

          position: "absolute",
          top: "50vh",
          transform: "translateY(-50%)",
          justifyContent: "center",

          "& > * ": {
            flexBasis: "30%",
            margin: "15px",
          },
        }}
      >
        <Tile width="600px" height="300px" header={t("Orders")}></Tile>
        <Tile width="600px" height="300px" header={t("Quality of sales")}></Tile>
        <Tile width="600px" height="300px" header={t("Customer feedback")}></Tile>
        <Tile width="600px" height="300px" header={t("Offer ranking")}></Tile>
        <Tile width="600px" height="300px" header={t("Sales chart")}></Tile>
        <Tile width="600px" height="300px" header={t("Sales advice")}></Tile>
      </Box>
    </PageContainer>
  );
}
