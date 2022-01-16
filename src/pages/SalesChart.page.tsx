import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer.component";
import "./SalesChart.Page.scss";

export default function SalesChart() {
  const { t } = useTranslation();

  return (
    <PageContainer
      header={t("Sales chart")}
      previousPage={{ route: "/dashboard", name: t("Dashboard") }}
      loggedIn={true}
    >
      <div>
        I cyk tu jest div
      </div>
      <div>
        drugi div jest tu
      </div>
      <div>
        i trzeci divik jest tutaj!
      </div>
    </PageContainer>
  )
}