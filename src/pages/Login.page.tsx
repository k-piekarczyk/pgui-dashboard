import PageContainer from "../components/PageContainer.component";
import { useTranslation } from "react-i18next";

import LargeSplash from "../components/LargeSplash.component";

import mikolajImage from "../assets/mikolaj.jpg";
import lukaszImage from "../assets/lukasz.jpg";
import krzysiekImage from "../assets/krzysiek.jpg";

import "./Login.page.scss"

export default function Login() {
  const { t } = useTranslation();

  return (
    <PageContainer header={t("Account selection")}>
        <div className="LoginPage">
          <LargeSplash borderColor={"#006AD4"} user={{ name: "Mikołaj", imagePath: mikolajImage }} />
          <LargeSplash borderColor={"#00D971"} user={{ name: "Łukasz", imagePath: lukaszImage }} />
          <LargeSplash borderColor={"#FAFF00"} user={{ name: "Krzysiek", imagePath: krzysiekImage }} />
          <LargeSplash />
        </div>
    </PageContainer>
  );
}
