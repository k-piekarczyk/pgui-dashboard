import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Makes the app scroll to the top on route change
 * @returns null
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
