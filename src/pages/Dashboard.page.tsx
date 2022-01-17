import { Button, Rating } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageContainer from "../components/PageContainer.component";
import Tile from "../components/Tile.component";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./Dashboard.page.scss";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

        <Tile header={t("Sales chart")}></Tile>

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
