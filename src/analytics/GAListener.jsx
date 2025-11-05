import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "./ga4";

export default function GAListener() {
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname) {
      trackPage(location.pathname + location.search);
    }
  }, [location]);

  return null;
}
