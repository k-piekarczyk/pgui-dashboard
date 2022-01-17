import { Button, Rating } from "@mui/material";
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
        <Tile header={t("Offer ranking")}></Tile>
        <Tile header={t("Sales chart")}></Tile>
        <Tile header={t("Sales advice")}></Tile>
      </div>
    </PageContainer>
  );
}
