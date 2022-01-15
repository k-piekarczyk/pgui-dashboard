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
        <Tile width="600px" height="300px" header={t("Orders")}>
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
            <div className="Dashboard__Orders__Current">
              <div className="Dashboard__Orders__Current-number">71</div>
              <div className="Dashboard__Orders__Current-text">{t("Currently processed orders")}</div>
            </div>
          </div>
        </Tile>

        <Tile width="600px" height="300px" header={t("Quality of sales")}>
          <div className="Dashboard__QoS">
            <Rating
              name="read-only"
              value={4.1}
              size="large"
              readOnly
              sx={{ fontSize: "70px", marginBottom: "15px" }}
            />
            <div className="Dashboard__QoS__Sub">
              {`${t("90 day average")}: 4.1/5`}
            </div>
            <Button size="small" variant="contained">
              {t("Check your category: Specialist")}
            </Button>
          </div>
        </Tile>
        <Tile width="600px" height="300px" header={t("Customer feedback")}></Tile>
        <Tile width="600px" height="300px" header={t("Offer ranking")}></Tile>
        <Tile width="600px" height="300px" header={t("Sales chart")}></Tile>
        <Tile width="600px" height="300px" header={t("Sales advice")}></Tile>
      </div>
    </PageContainer>
  );
}
