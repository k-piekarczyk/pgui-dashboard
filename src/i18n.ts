import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  pl: {
    translation: {
      "Account selection": "Wybór konta",
      Dashboard: "Strona główna",
      Theme: "Motyw",
      Dark: "Ciemny",
      Light: "Jasny",
      Language: "Język",
      Polish: "Polski",
      English: "Angielski",
      "Return to": "Powrót do",
      "Good evening": "Dobry wieczór",
      Orders: "Zamówienia",
      "Quality of sales": "Jakość sprzedaży",
      "Customer feedback": "Opinie kupujących",
      "Offer ranking": "Ranking offer",
      "Sales chart": "Wykres sprzedaży",
      "Sales advice": "Porady sprzedażowe",
      "Not paid": "Nieopłacone",
      "Not sent": "Niewysłane",
      Returns: "Zwroty",
      "Currently processed orders": "Obecnie realizowane zamówienia",
      "Order history": "Historia zamówień",
      "90 day average": "Średnia z ostatnich 90 dni",
      "Check your category: Specialist": "Sprawdź swoją kategorię: Wyjadacz",
      Category: "Kategoria",
      Picture: "Zdjęcie",
      Name: "Nazwa",
      "Sold Items": "Sprzedane sztuki",
      Turnover: "Obrót",
      "Most frequently bought": "Najczęściej kupowane",
      "Least frequently bought": "Najrzadziej kupowane",
      "Show only first 5 positions": "Pokaż wyłącznie pierwsze 5 pozycji",
      "30 day average": "średnia z ostatnich 30 dni",
      "Top seller": "Najczęściej kupowane",
      "Bottom seller": "Najrzadziej kupowane",
      "Navigate to data from chart": "Przejdź do danych z wykresu",
      "last month": "ostatni miesiąc",
      "last 3 months": "ostatnie 3 miesiące",
      "last year": "ostatni rok",
      "Graph": "Wykres",
      "Sales amount": "Ilość sprzedaży",
      "Time period": "Zakres czasu",
      "Today": "Dzisiaj",
      "Current week": "Obecny tydzień",
      "Current month": "Obecny miesiąc",
      "Include previous period": "Uwzględnij okres poprzedzający",
      "Choose product": "Wybierz produkt",
      "Product": "Produkt"
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
