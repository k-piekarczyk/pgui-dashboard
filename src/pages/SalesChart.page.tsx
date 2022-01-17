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

  function buildGraph(data: ({ time: string; value: number })[]) {
    console.log("siemanko!");

    // define margin
    const margin = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    }

    //define size
    const width = 600;
    const height = 400;

    // define y scale
    const yMax = Math.max(...data.map((d) => d.value));
    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top])
    ;

    // define x scale
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.time))
      .range([margin.left, width - margin.right])
      .padding(0.3);


    // define svg
    d3.select("svg").remove();
    const svg = d3
      .select('.graph')
      .append("svg")
      .attr("height", height)
      .attr("width", width);

    // define axis
    // @ts-ignore
    const yAxis = (g) => g.attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // @ts-ignore
    const xAxis = (g) =>
      g.attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // define bars
    // @ts-ignore
    const bars = (g) => g.selectAll('rect').data(data).join(
      // @ts-ignore
      (enter) => enter.append('rect'),
      // @ts-ignore
      (update) => update,
      // @ts-ignore
      (exit) => exit.remove()
    )
      .attr('x', (d: { time: string; }) => x(d.time))
      .attr('y', (d: { value: d3.NumberValue; }) => y(d.value))
      .attr('height', (d: { value: d3.NumberValue; }) => y(0) - y(d.value))
      .attr('width', 20);

    // put everything together
    svg.append('g').call(yAxis);
    svg.append('g').call(xAxis);
    svg.append('g').call(bars);

  }

  useEffect(() => {
    buildGraph(turnoverWeek);
  })

  const turnoverWeek = [
    { time: "Poniedziałek", value: 1000 },
    { time: "Wtorek", value: 1236 },
    { time: "Środa", value: 1420 },
    { time: "Czwartek", value: 1089 },
    { time: "Piątek", value: 1690 },
    { time: "Sobota", value: 2137 },

  ];

/*
  const data = [1, 2, 3, 4, 5, 8];


  const yMax = Math.max(...turnoverWeek.map(d => d.value));
  const width = 600;
  const height = 400;
  const y = d3.scaleLinear()
      .domain([0, yMax])
      .range([0, height])

  const x = d3.scaleBand()
    .domain(turnoverWeek.map(d => d.time))
    .range([0, width])
    .padding(0.1)


  useEffect(() => {
    d3.select("svg").remove();

    const svg = d3
      .select('.graph')
      .append("svg")
      .attr("height", height)
      .attr("width", width);

  console.log(x("Wtorek"))

    // wartości na wykresie (prostokąty)
    svg.selectAll('rect')
      .data(turnoverWeek)
      .enter()
      .append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'orange')
      .attr('x', d => x(d.time) ?? null)
      .attr('y', d => height - y(d.value) ?? null);

  // oś X
    const xAxisScale = d3.scaleBand()
      .domain(turnoverWeek.map(d => d.time))
      .range([0, width])
      .padding(0.1)

    const xAxis = d3.axisBottom(xAxisScale)
      .tickFormat((d, i) => d)
      .tickSizeOuter(0)

    const xAxisTranslate = height-20;

    svg.append('g')
      .attr("transform", "translate(0, " + xAxisTranslate + ")")
      .call(xAxis)


  });
*/


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