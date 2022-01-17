import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer.component";
import Tile from "../components/Tile.component";
import ProductImage from "../components/ProductImage.component";
import { useState } from "react";
import "./Ranking.page.scss";
import JsonData from './../data/ranking.json'

export default function Ranking() {
  const { t } = useTranslation();

  const [frequentlyBought, setFrequentlyBought] = useState("mostOften");
  const [useTop5Products, setUseTop5Products] = useState(false);

  function JsonDataDisplay(){
    const DisplayData=JsonData.items.map(
      (i: { picture: string; name: string; sold: number; turnover: number; })=>{
          return(
              <tr className="Ranking__Table__Row">
                  <td>
                    <ProductImage imageraw={i.picture}/>
                  </td>
                  <td>{i.name}</td>
                  <td>{i.sold}</td>
                  <td>{i.turnover}</td>
              </tr>
          )
      }
    )
    return(
        <div>
          <thead>
              <tr>
              <th>{t("Picture")}</th>
              <th>{t("Name")}</th>
              <th>{t("Sold Items")}</th>
              <th>{t("Turnover")+ " ["+JsonData.currency+"]"}</th>
              </tr>
          </thead>
          <tbody>
              {DisplayData}
          </tbody>
        </div>
    )
  }

  return (
    <PageContainer
      header={t("Good evening") + `, ${localStorage.getItem("user")}!`}
      previousPage={{ route: "/dashboard", name: t("Dashboard") }}
      loggedIn={true}
    >
      <div className="Ranking">
        <Tile width="400px" height="600px" header={t("Category")}>
          <div className="Ranking__Options">
            <div className={frequentlyBought === "mostOften" ? "optionRow selected" : "optionRow"} onClick={() => setFrequentlyBought("mostOften")}>
              <span className={frequentlyBought === "mostOften" ? "radioIcon selected" : "radioIcon"}/>
              {t("Most frequently bought")}
            </div>
            <div className={frequentlyBought === "leastOften" ? "optionRow selected" : "optionRow"} onClick={() => setFrequentlyBought("leastOften")}>
              <span className={frequentlyBought === "leastOften" ? "radioIcon selected" : "radioIcon"}/>
              {t("Least frequently bought")}
            </div>
            <div className={useTop5Products ? "optionRow selected" : "optionRow"} onClick={() => setUseTop5Products(!useTop5Products)}>
              <span className={useTop5Products ? "checkIcon selected" : "checkIcon"}/>
              {t("Show only first 5 positions")}
            </div>
          </div>
        </Tile>
        <Tile width="1400px" height="600p">
          <table className="Ranking__Table">
            {JsonDataDisplay()}
          </table>
        </Tile>
      </div>
    </PageContainer>
  );
}
