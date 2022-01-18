import { Button, Rating } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageContainer from "../components/PageContainer.component";
import Tile from "../components/Tile.component";
import data from "../data/graphDataDashboard.json";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./Dashboard.page.scss";
import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const buildGraph = useCallback(() => {
    // define margin
    const margin = {
      top: 18,
      right: 40,
      bottom: 20,
      left: 40,
    };

    //define size
    // @ts-ignore
    const width = (ref.current !== null ? ref.current.getBoundingClientRect().width : 200) - margin.left - margin.right;
    const height = (ref.current !== null ? ref.current.getBoundingClientRect().height : 400) - margin.top - margin.bottom;

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
      .domain(data.map(d => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.5);


    // define svg
    d3.selectAll(".svg-graph").remove();
    const svg = d3
      .select(".graph")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr('class', 'svg-graph');

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
    const bars = (g) => g.selectAll("rect")
      .data(data)
      .join(
      // @ts-ignore
      (enter) => enter.append("rect"),
      // @ts-ignore
      (update) => update,
      // @ts-ignore
      (exit) => exit.remove(),
    )
      .attr("x", (d: { year: string; }) => x(d.year))
      .attr("y", (d: { value: d3.NumberValue; }) => y(d.value))
      .attr("height", (d: { value: d3.NumberValue; }) => y(0) - y(d.value))
      .attr("width", width / data.length / 2)

    // define bar values texts
    // @ts-ignore
    const barsTexts = (g) => g.selectAll("text")
      .data(data)
      .join(
      // @ts-ignore
      (enter) => enter.append("text"),
      // @ts-ignore
      (update) => update,
      // @ts-ignore
      (exit) => exit.remove(),
      )
      // @ts-ignore
      .attr("x", (d: { year: string; }) => x(d.year))
      .attr("transform", `translate(${width / data.length / 8}, 0)`)
      .attr("y", (d: { value: d3.NumberValue; }) => y(d.value) - 10)
      .attr("height", (d: { value: d3.NumberValue; }) => y(0) - y(d.value))
      .attr("width", width / data.length / 2)
      // @ts-ignore
      .attr("class", "bar-label")
      .text((d: { value: number }) => d.value);

    // put everything together
    svg.append("g").call(yAxis);
    svg.append("g").call(xAxis);
    svg.append("g").call(bars);
    svg.append("g").call(barsTexts);

  }, []);

  useEffect(() => {
    let x = 0;

    function handleResize() {
      if (x > 10) {

        setTimeout(buildGraph, 100);
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
  }, [buildGraph]);

  useEffect(() => {
    setTimeout(buildGraph, 100);
  }, [buildGraph]);

  return (
    <PageContainer
      header={t("Good evening") + `, ${localStorage.getItem("user")}!`}
      previousPage={{ route: "/", name: t("Account selection") }}
      loggedIn={true}
    >
      <div className="Dashboard">
        <Tile header={t("Orders")}>
          <div className="Dashboard__Orders">
            <div>
              <div className="Dashboard__Orders__Stats">
                <div>{t("Not paid")}</div> <div className="Dashboard__Orders__Stats-number">44</div>
              </div>

              <div className="Dashboard__Orders__Stats">
                <div>{t("Not sent")}</div> <div className="Dashboard__Orders__Stats-number">18</div>
              </div>

              <div className="Dashboard__Orders__Stats">
                <div>{t("Returns")}</div> <div className="Dashboard__Orders__Stats-number">9</div>
              </div>

              <div className="Dashboard__Orders__Button_Container">
                <Button size="small" variant="contained">
                  {t("Order history")}
                </Button>
              </div>
            </div>
            <div className="Dashboard__Orders__Spacer" />
            <div className="Dashboard__Orders__Current">
              <div className="Dashboard__Orders__Current-number">71</div>
              <div className="Dashboard__Orders__Current-text">{t("Currently processed orders")}</div>
            </div>
          </div>
        </Tile>

        <Tile header={t("Quality of sales")}>
          <div className="Dashboard__QoS">
            <Rating
              className="Dashboard__QoS__Rating"
              name="read-only"
              value={4.1}
              size="large"
              readOnly
              sx={{ marginBottom: "15px" }}
            />
            <div className="Dashboard__QoS__Sub">{`${t("90 day average")}: 4.1/5`}</div>
            <Button size="small" variant="contained">
              {t("Check your category: Specialist")}
            </Button>
          </div>
        </Tile>

        <Tile header={t("Customer feedback")}>
          <div className="Dashboard__CF">
            <div className="Dashboard__CF__Testimonial_Container">
              <div className="Dashboard__CF__Testimonial">
                <div className="Dashboard__CF__Testimonial__Header">
                  <div className="Dashboard__CF__Testimonial__Header-number">4</div>
                  <div className="Dashboard__CF__Testimonial__Header-text">
                    <div>Aneta Żalkiewicz</div>
                    <div>02.11.2021</div>
                  </div>
                </div>
                <div className="Dashboard__CF__Testimonial__Body">
                  Świetna obsługa, nie było żadnych problemów z dostarczeniem zamów...
                </div>
              </div>
              <div className="Dashboard__CF__Testimonial">
                <div className="Dashboard__CF__Testimonial__Header">
                  <div className="Dashboard__CF__Testimonial__Header-number">5</div>
                  <div className="Dashboard__CF__Testimonial__Header-text">
                    <div>Jacek Michaliński</div>
                    <div>28.10.2021</div>
                  </div>
                </div>
                <div className="Dashboard__CF__Testimonial__Body">
                  Świetna obsługa, nie było żadnych problemów z dostarczeniem zamów...
                </div>
              </div>
            </div>
            <div className="Dashboard__CF__Spacer" />
            <div className="Dashboard__CF__Average">
              <div className="Dashboard__CF__Average-number">
                <div>4.2</div>
                <div>/</div>
                <div>5</div>
              </div>
              <div className="Dashboard__CF__Average-text">{t("30 day average")}</div>
            </div>
          </div>
        </Tile>

        <Tile header={t("Offer ranking")}>
          <div className="Dashboard__Rankings" onClick={() => navigate("/ranking")}>
            <div className="Dashboard__Rankings__Entry">
              <div className="Dashboard__Rankings__Entry-header">{t("Top seller")}</div>
              <div className="Dashboard__Rankings__Entry-name">Zotac GeForce RTX 3060 Ti AMP White 8GB GDDR6</div>
            </div>
            <div className="Dashboard__Rankings__Entry">
              <div className="Dashboard__Rankings__Entry-header">{t("Bottom seller")}</div>
              <div className="Dashboard__Rankings__Entry-name">Xiaomi Mi True Wireless Earbuds Basic 2</div>
            </div>
          </div>
        </Tile>

        <Tile header={t("Sales chart")}>
          <div className="Dashboard__Sales" onClick={() => navigate("/sales-chart")}>
            <div className="Dashboard__Sales__Header">
              {t("Navigate to data from chart")}:
            </div>
            <div className="Dashboard__Sales__Chart">
              <div className="Dashboard__Sales__Chart-labels">
                <div>{t("last month")}</div>
                <div>{t("last 3 months")}</div>
                <div>{t("last year")}</div>
              </div>

              <div className="Dashboard__Sales__Chart-chart graph" ref={ref}/>

            </div>
          </div>
        </Tile>

        <Tile header={t("Sales advice")}>
          <div className="Dashboard__Advice">
            <div className="Dashboard__Advice__Entry">
              <div className="Dashboard__Advice__Entry-text">
                Czy wiesz, że możesz usprawnić swój kontakt z klientami o 60% korzystając z chatu online, dostępnego z
                poziomu zakładki...
              </div>
              <div className="Dashboard__Advice__Entry-icon">
                <ArrowForwardIosIcon />
              </div>
            </div>
            <div className="Dashboard__Advice__Entry">
              <div className="Dashboard__Advice__Entry-text">
                Zamieszczenie zdjęć produktu w wysokiej rozdzielczości zwiększa wskaźnik kliknięć o ponad 46%!
                </div>
              <div className="Dashboard__Advice__Entry-icon">
                <ArrowForwardIosIcon />
              </div>
            </div>
          </div>
        </Tile>
      </div>
    </PageContainer>
  );
}
