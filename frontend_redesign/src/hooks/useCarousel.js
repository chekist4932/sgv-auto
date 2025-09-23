// hooks/useCarousel.js
import { useState } from "react";
import { useWindowWidth } from "./useWindowWidth";

export function useCarousel(config = { breakpoints: { desktop: 3, tablet: 2, mobile: 1 }, cardWidth: 300, gap: 24 }) {
  const width = useWindowWidth();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { desktop, tablet, mobile } = config.breakpoints;

  const getActiveCount = (width) => {
    if (width >= 1920) return desktop;
    if (width > 1024) return tablet;
    return mobile;
  };

  const activeCount = getActiveCount(width);

  const getStep = (activeCount, total) => {
    switch (activeCount) {
      case desktop: return total - (desktop - 1);
      case tablet: return total - 1;
      case mobile: return total;
      default: return 1;
    }
  };

  const prevSlide = (step) => setCurrentIndex((prev) => (prev - 1 + step) % step);
  const nextSlide = (step) => setCurrentIndex((prev) => (prev + 1) % step);

  return {
    width,
    currentIndex,
    setCurrentIndex,
    activeCount,
    prevSlide,
    nextSlide,
    cardWidth: config.cardWidth,
    gap: config.gap,
    getStep,
  };
}
