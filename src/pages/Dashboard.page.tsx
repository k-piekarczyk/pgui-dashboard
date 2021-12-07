import { Box, Button, Rating } from "@mui/material";
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
        <Tile width="600px" height="300px" header={t("Orders")}>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              top: "20px",
              "& > * ": {
                flexBasis: "49%",
              },
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "20px",
            }}
          >
            <Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ fontSize: "30px" }}>{t("Not paid")}</Box>{" "}
                <Box sx={{ marginLeft: "auto", fontSize: "30px", fontWeight: 700 }}>44</Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ fontSize: "30px" }}>{t("Not sent")}</Box>{" "}
                <Box sx={{ marginLeft: "auto", fontSize: "30px", fontWeight: 700 }}>18</Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ fontSize: "30px" }}>{t("Returns")}</Box>{" "}
                <Box sx={{ marginLeft: "auto", fontSize: "30px", fontWeight: 700 }}>9</Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "25px" }}>
                <Button size="small" variant="contained">
                  {t("Order history")}
                </Button>
              </Box>
            </Box>
            <Box>
              <Box sx={{ fontWeight: "bold", fontSize: "144px", position: "relative", top: "-50px", left: "70px" }}>
                71
              </Box>
              <Box sx={{ fontSize: "22px", position: "relative", top: "-60px", left: "25px", textAlign: "center" }}>
                {t("Currently processed orders")}
              </Box>
            </Box>
          </Box>
        </Tile>

        <Tile width="600px" height="300px" header={t("Quality of sales")}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
              flexDirection: "column",
            }}
          >
            <Rating name="read-only" value={4.1} size="large" readOnly sx={{ fontSize: "70px", marginBottom: "15px" }} />
            <Box sx={{ fontSize: "30px", textAlign: "center", marginBottom: "25px" }}>{`${t("90 day average")}: 4.1/5`}</Box>
            <Button size="small" variant="contained">
              {t("Check your category: Specialist")}
            </Button>
          </Box>
        </Tile>
        <Tile width="600px" height="300px" header={t("Customer feedback")}></Tile>
        <Tile width="600px" height="300px" header={t("Offer ranking")}></Tile>
        <Tile width="600px" height="300px" header={t("Sales chart")}></Tile>
        <Tile width="600px" height="300px" header={t("Sales advice")}></Tile>
      </Box>
    </PageContainer>
  );
}
