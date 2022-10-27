import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    if (
      (location.state as any)?._scrollToTop &&
        typeof window !== 'undefined'
    ) {
      window.scrollTo(0, 0);
    }
  }, [location])
}