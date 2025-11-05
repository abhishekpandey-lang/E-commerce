import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "./ga4";

export default function GAListener() {
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname) {
      // Log for debugging (optional)
      console.log("📊 Tracking page view:", location.pathname + location.search);
      trackPage(location.pathname + location.search);
    }
  }, [location]);

  return null;
}
