import {
  Children,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from "react";
import "./Carousel.css";

/**
 * Props for the reusable carousel component.
 */
export type CarouselProps = {
  /**
   * The panes to render in the carousel.
   * Each direct child becomes one slide.
   */
  children: ReactNode;

  /**
   * Milliseconds between automatic slide changes.
   * Defaults to 10 seconds.
   */
  autoAdvanceMs?: number;

  /**
   * Accessible label announced for the carousel region.
   * Defaults to "Carousel".
   */
  ariaLabel?: string;

  /**
   * Optional class name applied to the outer carousel wrapper.
   */
  className?: string;
};

/**
 * A simple content carousel that:
 * - renders each child as a full-width pane
 * - auto-advances on a timer
 * - wraps back to the first pane after the last
 * - shows clickable position dots
 * - stops auto-advancing after the user clicks a dot
 *
 * Example:
 * ```tsx
 * <Carousel autoAdvanceMs={10000} ariaLabel="Project screenshots">
 *   <ProjectCardOne />
 *   <ProjectCardTwo />
 *   <ProjectCardThree />
 * </Carousel>
 * ```
 */
export default function Carousel({
  children,
  autoAdvanceMs = 10_000,
  ariaLabel = "Carousel",
  className,
}: CarouselProps) {
  const panes = useMemo(() => Children.toArray(children), [children]);
  const paneCount = panes.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);

  useEffect(() => {
    if (paneCount === 0) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((currentIndex) => currentIndex % paneCount);
  }, [paneCount]);

  const advanceSlide = useEffectEvent(() => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % paneCount);
  });

  useEffect(() => {
    if (!autoAdvanceEnabled || paneCount < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      advanceSlide();
    }, autoAdvanceMs);

    return () => window.clearInterval(intervalId);
  }, [advanceSlide, autoAdvanceEnabled, autoAdvanceMs, paneCount]);

  if (paneCount === 0) {
    return null;
  }

  const trackStyle = {
    transform: `translateX(-${activeIndex * 100}%)`,
  } satisfies CSSProperties;

  const rootClassName = ["carousel", className].filter(Boolean).join(" ");

  return (
    <section
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={rootClassName}
    >
      <div className="carouselViewport">
        <div className="carouselTrack" style={trackStyle}>
          {panes.map((pane, index) => (
            <div
              aria-hidden={index !== activeIndex}
              aria-label={`Slide ${index + 1} of ${paneCount}`}
              aria-roledescription="slide"
              className="carouselPane"
              key={index}
              role="group"
            >
              {pane}
            </div>
          ))}
        </div>
      </div>

      {paneCount > 1 ? (
        <div aria-label="Carousel navigation" className="carouselDots">
          {panes.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={isActive}
                className={`carouselDot${isActive ? " isActive" : ""}`}
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setAutoAdvanceEnabled(false);
                }}
                type="button"
              />
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
