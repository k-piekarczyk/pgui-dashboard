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
  const [imageVisibility, _] = useState(true);

  function numberWithSpaces(x: { toString: () => string; }) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(",");
  }

  function HeaderDisplay(){
    if (imageVisibility) {
    return(
      <tr>
        <th className="Ranking__Table__Headline__Image">{t("Picture")}</th>
        <th className="Ranking__Table__Headline__Name">{t("Name")}</th>
        <th className="Ranking__Table__Headline__Number">{t("Sold Items")}</th>
        <th className="Ranking__Table__Headline__Number">
          {t("Turnover")+ " ["+JsonData.currency+"]"}
        </th>
      </tr>
    )
    }
    return(
      <tr>
        <th className="Ranking__Table__Headline__Name">{t("Name")}</th>
        <th className="Ranking__Table__Headline__Number">{t("Sold Items")}</th>
        <th className="Ranking__Table__Headline__Number">
          {t("Turnover")+ " ["+JsonData.currency+"]"}
        </th>
      </tr>
    )
  }

  function JsonDataDisplay(){
    const ArrayJson = Array.from(JsonData.items)
    const LoadedJson = frequentlyBought === "mostOften" ? ArrayJson : ArrayJson.reverse()
    const FilteredJson = useTop5Products ? LoadedJson.slice(0,5) : LoadedJson
    if (imageVisibility) {
    const DisplayData=FilteredJson.map(
      (i: { picture: string; name: string; sold: number; turnover: number; })=>{
          return(
              <tr key={i.name}>
                <td className="Ranking__Table__Row__Image">
                  <ProductImage imageraw={i.picture}/>
                </td>
                <td className="Ranking__Table__Row__Name">{i.name}</td>
                <td className="Ranking__Table__Row__Number">{i.sold}</td>
                <td className="Ranking__Table__Row__Number">
                  {numberWithSpaces(i.turnover.toFixed(2))}
                </td>
              </tr>
          )
      }
    )
    return DisplayData
    }
    const DisplayData=FilteredJson.map(
      (i: { picture: string; name: string; sold: number; turnover: number; })=>{
          return(
              <tr key={i.name}>
                <td className="Ranking__Table__Row__Name">{i.name}</td>
                <td className="Ranking__Table__Row__Number">{i.sold}</td>
                <td className="Ranking__Table__Row__Number">
                  {numberWithSpaces(i.turnover.toFixed(2))}
                </td>
              </tr>
          )
      }
    )
    return DisplayData
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
            <div className={frequentlyBought === "mostOften" ? "optionRow selected2" : "optionRow"} onClick={() => setFrequentlyBought("mostOften")}>
              <span className={frequentlyBought === "mostOften" ? "radioIcon selected2" : "radioIcon"}/>
              {t("Most frequently bought")}
            </div>
            <div className={frequentlyBought === "leastOften" ? "optionRow selected2" : "optionRow"} onClick={() => setFrequentlyBought("leastOften")}>
              <span className={frequentlyBought === "leastOften" ? "radioIcon selected2" : "radioIcon"}/>
              {t("Least frequently bought")}
            </div>
            <div className={useTop5Products ? "optionRow selected2" : "optionRow"} onClick={() => setUseTop5Products(!useTop5Products)}>
              <span className={useTop5Products ? "checkIcon selected2" : "checkIcon"}/>
              {t("Show only first 5 positions")}
            </div>
          </div>
        </Tile>
        <Tile width="1400px" height="600px">
          <div className="Ranking__Fix">
          </div>
          <table className="Ranking__Table">
            <thead className="Ranking__Table__Headline">
              {HeaderDisplay()}
            </thead>
            <tbody className="Ranking__Table__Row">
              {JsonDataDisplay()}
            </tbody>
          </table>
        </Tile>
      </div>
    </PageContainer>
  );
}
