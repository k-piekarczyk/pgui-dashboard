import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer.component";
import "./SalesChart.Page.scss";
import * as d3 from "d3";
import { useCallback, useEffect, useRef, useState } from "react";
import json_data from "../data/graphData.json";

export default function SalesChart() {
  const { t } = useTranslation();

  const [category, setCategory] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [previousPeriod, setPreviousPeriod] = useState(false);

  const ref = useRef<HTMLDivElement>(null);



  const buildGraphDataFn = useCallback(
    () => {
      function buildGraph(data: ({ time: string; value: number })[], previousData: ({ time: string; value: number })[], xLabel: string, yLabel: string) {

        // define margin
        const margin = {
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        };

        //define size
        const width = ref.current!.offsetWidth - margin.left - margin.right;
        const height = width * 0.7;

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
          .domain(previousPeriod ? previousData.concat(data).map(d => d.time) : data.map(d => d.time))
          .range([margin.left, width - margin.right])
          .padding(0.5);


        // define svg
        d3.select("svg").remove();
        const svg = d3
          .select(".graph")
          .append("svg")
          .attr("height", height)
          .attr("width", width);

        // define axis
        // @ts-ignore
        const yAxis = (g) => g.attr("transform", `translate(${margin.left}, 0)`)
          .call(d3.axisLeft(y));

        // @ts-ignore
        const xAxis = (g) =>
          g.attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        // define bars
        // @ts-ignore
        const bars = (g) => g.selectAll("rect").data(
          previousPeriod ? previousData.concat(data) : data,
        ).join(
          // @ts-ignore
          (enter) => enter.append("rect"),
          // @ts-ignore
          (update) => update,
          // @ts-ignore
          (exit) => exit.remove(),
        )
          .attr("x", (d: { time: string; }) => x(d.time))
          .attr("y", (d: { value: d3.NumberValue; }) => y(d.value))
          .attr("height", (d: { value: d3.NumberValue; }) => y(0) - y(d.value))
          .attr("width", previousPeriod ? width / previousData.concat(data).length / 2 : width / data.length / 2)
          // @ts-ignore
          .attr("class", (d: { time: string; }) => d.time.indexOf("p") !== -1 ? "previous-data" : "");

        // define bar values texts
        // @ts-ignore
        const barsTexts = (g) => g.selectAll("text").data(
          previousPeriod ? previousData.concat(data) : data,
        ).join(
          // @ts-ignore
          (enter) => enter.append("text"),
          // @ts-ignore
          (update) => update,
          // @ts-ignore
          (exit) => exit.remove(),
        )
          // @ts-ignore
          .attr("x", (d: { time: string; }) => x(d.time))
          .attr("transform", `translate(${previousPeriod ? width / previousData.concat(data).length / 8 : width / data.length / 8}, 0)`)
          .attr("y", (d: { value: d3.NumberValue; }) => y(d.value) - 10)
          .attr("height", (d: { value: d3.NumberValue; }) => y(0) - y(d.value))
          .attr("width", previousPeriod ? width / previousData.concat(data).length / 2 : width / data.length / 2)
          // @ts-ignore
          .attr("class", "bar-label")
          .text((d: { value: number }) => d.value);

        // put everything together
        svg.append("g").call(yAxis);
        svg.append("g").call(xAxis);
        svg.append("g").call(bars);
        svg.append("g").call(barsTexts);

        // ad x label
        svg.append("text")
          .attr("class", "graph-label")
          .attr("text-anchor", "end")
          .attr("x", width)
          .attr("y", height - 6)
          .text(xLabel);

        // ad y label
        svg.append("text")
          .attr("class", "graph-label")
          .attr("text-anchor", "end")
          .attr("y", 0)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text(yLabel);

      }

      if (category === "Turnover") {
        switch (timePeriod) {
          case "today":
            buildGraph(json_data.turnover.today.current, json_data.turnover.today.previous, json_data.turnover.today.labelX, json_data.turnover.today.labelY);
            break;
          case "week":
            buildGraph(json_data.turnover.week.current, json_data.turnover.week.previous, json_data.turnover.week.labelX, json_data.turnover.week.labelY);
            break;
          case "month":
            buildGraph(json_data.turnover.month.current, json_data.turnover.month.previous, json_data.turnover.month.labelX, json_data.turnover.month.labelY);
            break;
        }
      } else if (category === "Product") {
        switch (timePeriod) {
          case "today":
            buildGraph(json_data.product.today.current, json_data.product.today.previous, json_data.product.today.labelX, json_data.product.today.labelY);
            break;
          case "week":
            buildGraph(json_data.product.week.current, json_data.product.week.previous, json_data.product.week.labelX, json_data.product.week.labelY);
            break;
          case "month":
            buildGraph(json_data.product.month.current, json_data.product.month.previous, json_data.product.month.labelX, json_data.product.month.labelY);
            break;
        }
      }
    },[category, timePeriod, previousPeriod]
  );



  useEffect(() => {
    let x = 0;

    function handleResize() {
      if (x > 10) {
        buildGraphDataFn();
        x = 0;
      } else {
        x++;
      }

      return undefined;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [buildGraphDataFn]);

  // @ts-ignore
  useEffect(() => setTimeout(buildGraphDataFn, 100), [buildGraphDataFn]);

  return (
    <PageContainer
      header={t("Sales chart")}
      previousPage={{ route: "/dashboard", name: t("Dashboard") }}
      loggedIn={true}
    >
      <div className="sales-container">
        <div className="leftBar">
          <div className="tile">
            <div className="title">{t("Category")}</div>
            <div className={category === "Turnover" ? "optionRow selected" : "optionRow"}
                 onClick={() => setCategory("Turnover")}>
              <span className={category === "Turnover" ? "radioIcon selected" : "radioIcon"} />
              {t("Turnover")}
            </div>
            <div className={category === "Product" ? "optionRow" : "optionRow"}
            onClick={() => setCategory("Product")}>
              <span className={category === "Product" ? "radioIcon selected" : "radioIcon"} />
              <span className={category === "Product" ? "selected" : ""}>{t("Sales amount")}</span>
              <div className="productPicker">{t("Choose product")}</div>
            </div>
          </div>
          <div className="tile">
            <div className="title">{t("Time period")}</div>
            <div className={timePeriod === "today" ? "optionRow selected" : "optionRow"}
                 onClick={() => setTimePeriod("today")}>
              <span className={timePeriod === "today" ? "radioIcon selected" : "radioIcon"} />
              {t("Today")}
            </div>
            <div className={timePeriod === "week" ? "optionRow selected" : "optionRow"}
                 onClick={() => setTimePeriod("week")}>
              <span className={timePeriod === "week" ? "radioIcon selected" : "radioIcon"} />
              {t("Current week")}
            </div>
            <div className={timePeriod === "month" ? "optionRow selected" : "optionRow"}
                 onClick={() => setTimePeriod("month")}>
              <span className={timePeriod === "month" ? "radioIcon selected" : "radioIcon"} />
              {t("Current month")}
            </div>
            <div className={previousPeriod ? "optionRow selected" : "optionRow"}
                 onClick={() => setPreviousPeriod(!previousPeriod)}>
              <span className={previousPeriod ? "checkIcon selected" : "checkIcon"} />
              {t("Include previous period")}
            </div>
          </div>
        </div>

        <div className="tile graph sales-container" ref={ref}>
          <div className="title">{t(category)} </div>

        </div>
      </div>

    </PageContainer>
  );
}