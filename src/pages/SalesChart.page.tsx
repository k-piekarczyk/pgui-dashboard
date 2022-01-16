import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer.component";
import "./SalesChart.Page.scss";
import * as d3 from 'd3';
import { useEffect, useState } from "react";

export default function SalesChart() {
  const { t } = useTranslation();

  const [category, setCategory] = useState("turnover");
  const [timePeriod, setTimePeriod] = useState("today");
  const [previousPeriod, setPreviousPeriod] = useState(false);

  useEffect(() => {
    d3.select("svg").remove();

    const svg = d3
      .select('.graph')
      .append("svg")
      .attr("height", 400)
      .attr("width", 600);

    const data = [1, 2, 3, 4, 5, 8];

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'orange')
      .attr('x', d => d*30)
      .attr('y', d => d*30)
  });



  return (
    <PageContainer
      header={t("Sales chart")}
      previousPage={{ route: "/dashboard", name: t("Dashboard") }}
      loggedIn={true}
    >
      <div className="leftBar">
        <div className="tile category">
          <div className="title">Kategoria</div>
          <div className={category == "turnover" ? "optionRow selected" : "optionRow"} onClick={() => setCategory("turnover")}>
            <span className={category == "turnover" ? "radioIcon selected" : "radioIcon"}/>
            Obrót
          </div>
          <div className="optionRow">
            <span className="radioIcon"/>
            Liczba sprzedanych sztuk
            <div className="productPicker">Wybierz produkt</div>
          </div>
        </div>
        <div className="tile timePeriod">
          <div className="title">Zakres czasu</div>
          <div className={timePeriod == "today" ? "optionRow selected" : "optionRow"} onClick={() => setTimePeriod("today")}>
            <span className={timePeriod == "today" ? "radioIcon selected" : "radioIcon"}/>
            Dzisiaj
          </div>
          <div className={timePeriod == "week" ? "optionRow selected" : "optionRow"} onClick={() => setTimePeriod("week")}>
            <span className={timePeriod == "week" ? "radioIcon selected" : "radioIcon"}/>
            Obecny tydzień
          </div>
          <div className={timePeriod == "month" ? "optionRow selected" : "optionRow"} onClick={() => setTimePeriod("month")}>
            <span className={timePeriod == "month" ? "radioIcon selected" : "radioIcon"}/>
            Obecny miesiąc
          </div>
          <div className={previousPeriod ? "optionRow selected" : "optionRow"} onClick={() => setPreviousPeriod(!previousPeriod)}>
            <span className={previousPeriod ? "checkIcon selected" : "checkIcon"}/>
            Uwzględnij analogiczny okres poprzedzający
          </div>
        </div>
      </div>

      <div className="tile graph">
        <div className="title">Wykres</div>
      </div>
    </PageContainer>
  )
}