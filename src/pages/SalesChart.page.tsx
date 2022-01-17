import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer.component";
import "./SalesChart.Page.scss";
import * as d3 from 'd3';
import { createRef, useEffect, useRef, useState } from "react";
import json_data from "../data/graphData.json";

export default function SalesChart() {
  const { t } = useTranslation();

  const [category, setCategory] = useState("turnover");
  const [timePeriod, setTimePeriod] = useState("today");
  const [previousPeriod, setPreviousPeriod] = useState(false);
  const [chartWidth, setChartWidth] = useState(600);

  const ref = useRef(null);
  useEffect(() => {
    // @ts-ignore
    console.log('width', ref.current ? ref.current.getBoundingClientRect().width : 0);
  }, [ref.current]);


  function buildGraph(data: ({ time: string; value: number })[]) {
    // @ts-ignore
    console.log("siemanko! chart Width: " + ref.current.offsetWidth);

    // define margin
    const margin = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    }

    //define size
    // @ts-ignore
    const width = ref.current.offsetWidth - margin.left - margin.right;
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
      .padding(0.5);


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
      .attr('width', 30);

    // put everything together
    svg.append('g').call(yAxis);
    svg.append('g').call(xAxis);
    svg.append('g').call(bars);

  }

  function buildGraphData() {
    if (category === "turnover") {
      switch(timePeriod) {
        case "today":
          buildGraph(json_data.turnover.today);
          break;
        case "week":
          buildGraph(json_data.turnover.week);
          break;
        case "month":
          buildGraph(json_data.turnover.month);
          break;
      }
    } else {
      switch (timePeriod) {
        case "today":
          buildGraph(json_data.turnover.today);
          break;
        case "week":
          buildGraph(json_data.turnover.week);
          break;
        case "month":
          buildGraph(json_data.turnover.month);
          break;
      }
    }
  }

  useEffect(() => {
    buildGraphData();
  }, [category, timePeriod, previousPeriod])


  return (
    <PageContainer
      header={t("Sales chart")}
      previousPage={{ route: "/dashboard", name: t("Dashboard") }}
      loggedIn={true}
    >
      <div className="leftBar">
        <div className="tile category">
          <div className="title">{t("Category")}</div>
          <div className={category === "turnover" ? "optionRow selected" : "optionRow"} onClick={() => setCategory("turnover")}>
            <span className={category === "turnover" ? "radioIcon selected" : "radioIcon"}/>
            {t("Turnover")}
          </div>
          <div className="optionRow">
            <span className="radioIcon"/>
            {t("Sales amount")}
            <div className="productPicker">{t("Choose product")}</div>
          </div>
        </div>
        <div className="tile timePeriod">
          <div className="title">{t("Time period")}</div>
          <div className={timePeriod === "today" ? "optionRow selected" : "optionRow"} onClick={() => setTimePeriod("today")}>
            <span className={timePeriod === "today" ? "radioIcon selected" : "radioIcon"}/>
            {t("Today")}
          </div>
          <div className={timePeriod === "week" ? "optionRow selected" : "optionRow"} onClick={() => setTimePeriod("week")}>
            <span className={timePeriod === "week" ? "radioIcon selected" : "radioIcon"}/>
            {t("Current week")}
          </div>
          <div className={timePeriod === "month" ? "optionRow selected" : "optionRow"} onClick={() => setTimePeriod("month")}>
            <span className={timePeriod === "month" ? "radioIcon selected" : "radioIcon"}/>
            {t("Current month")}
          </div>
          <div className={previousPeriod ? "optionRow selected" : "optionRow"} onClick={() => setPreviousPeriod(!previousPeriod)}>
            <span className={previousPeriod ? "checkIcon selected" : "checkIcon"}/>
            {t("Include previous period")}
          </div>
        </div>
      </div>

      <div className="tile graph" ref={ref}>
        <div className="title">{t("Graph")}</div>

      </div>
    </PageContainer>
  )
}