import { Box } from "@mui/system";
import PageContainer from "../components/PageContainer.component";
import { useTranslation } from "react-i18next";

import LargeSplash from "../components/LargeSplash.component";

import mikolajImage from "../assets/mikolaj.jpg";
import lukaszImage from "../assets/lukasz.jpg";
import krzysiekImage from "../assets/krzysiek.jpg";

export default function Login() {
  const { t } = useTranslation();

  return (
    <PageContainer header={t("Account selection")}>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          top: "50vh",
          transform: "translateY(-50%)",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          "& > *:not(:first-child)": {
            marginLeft: "82px",
          },
        }}
      >
        <LargeSplash imagePath={mikolajImage} borderColor={"#006AD4"} />
        <LargeSplash imagePath={lukaszImage} borderColor={"#00D971"}/>
        <LargeSplash imagePath={krzysiekImage} borderColor={"#FAFF00"}/>
        <LargeSplash />
      </Box>
    </PageContainer>
  );
}
