import { ReactNode, useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HorizontalCarouselProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
  autoScroll?: boolean;
  scrollSpeed?: number;
}

export default function HorizontalCarousel({
  children,
  className,
  itemClassName,
  showControls = true,
  autoScroll = false,
  scrollSpeed = 1
}: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScroll();
    
    let interval: NodeJS.Timeout;
    if (autoScroll) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft >= scrollWidth - clientWidth) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
          }
        }
      }, 50);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoScroll, scrollSpeed]);

  return (
    <div className={cn("relative group", className)}>
      {/* Left Control */}
      {showControls && (
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-20",
            "bg-black/80 hover:bg-black/90 text-white",
            "w-10 h-10 rounded-full flex items-center justify-center",
            "transition-all duration-300",
            "disabled:opacity-30 disabled:cursor-not-allowed",
            "shadow-lg hover:shadow-purple-500/20"
          )}
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
      >
        <div className={cn("flex gap-4", itemClassName)}>
          {children}
        </div>
      </div>

      {/* Right Control */}
      {showControls && (
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-20",
            "bg-black/80 hover:bg-black/90 text-white",
            "w-10 h-10 rounded-full flex items-center justify-center",
            "transition-all duration-300",
            "disabled:opacity-30 disabled:cursor-not-allowed",
            "shadow-lg hover:shadow-purple-500/20"
          )}
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Gradient Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />
    </div>
  );
}