// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Stp = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};