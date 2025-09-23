// hooks/useCarouselPositions.js
export function useCarouselPositions(total, currentIndex, activeCount, cardWidth, gap, width) {
  const displayCount = Math.min(total, activeCount);
  const activeWindowWidth = displayCount * cardWidth + (displayCount - 1) * gap;
  const leftIndex = (currentIndex - 1 + total) % total;
  const rightIndex = (currentIndex + activeCount) % total;
  const transformOffset = currentIndex * (cardWidth + gap);
  const showSideCardsAndArrows = total > activeCount && (width >= 1024);

  return { displayCount, activeWindowWidth, leftIndex, rightIndex, transformOffset, showSideCardsAndArrows };
}