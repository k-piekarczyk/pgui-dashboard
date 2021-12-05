import { Box } from "@mui/system";
import PageContainer from "../components/PageContainer.component";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t, i18n } = useTranslation();

  return (
    <PageContainer header={t("Account selection")}>
      <Box sx={{ p: "10px 20px 10px 20px" }}>
        <h1>Hello cruel world!</h1>
        <p>We're here again, but in color this time!</p>
      </Box>
    </PageContainer>
  );
}
