import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer.component";
import "./SalesChart.Page.scss";
// import rd3 from 'react-d3-library';

export default function SalesChart() {
  const { t } = useTranslation();

  return (
    <PageContainer
      header={t("Sales chart")}
      previousPage={{ route: "/dashboard", name: t("Dashboard") }}
      loggedIn={true}
    >
      <div className="leftBar">
        <div className="tile category">
          <h4>Kategoria</h4>
          <div>
            <span className="radioIcon"/>
            Obrót
          </div>
          <div>
            <span className="radioIcon"/>
            Liczba sprzedanych sztuk
            <div>Wybierz produkt</div>
          </div>
        </div>
        <div className="tile timePeriod">
          <h4>Zakres czasu</h4>
          <div>
            <span className="radioIcon"/>
            Dziś
          </div>
          <div>
            <span className="radioIcon"/>
            Obecny tydzień
          </div>
          <div>
            <span className="radioIcon"/>
            Obecny miesiąc
          </div>
          <div>
            <span className="checkIcon"/>
            Uwzględnij analogiczny okres poprzedzający
          </div>
        </div>
      </div>

      <div className="tile graph">
        To jest miejsce na wykres!!!
      </div>
    </PageContainer>
  )
}