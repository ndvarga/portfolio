import { motion } from 'framer-motion';
import React, { Children, cloneElement, useEffect, useRef, useState, type ReactElement } from 'react';
import TimelineEvent from './TimelineEvent';

interface TimelineEvent {
  startYear: number;
  endYear?: number;
  title: string;
  description?: string;
  isOngoing?: boolean;
}

interface TimelineEventProps {
  startYear: number;
  endYear?: number;
  title: string;
  description?: string;
  isOngoing?: boolean;
  duration?: number;
  index?: number;
}

interface TimelineProps {
  children: React.ReactElement[];
}

export default function Timeline({ children }: TimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // understands the children inside Timeline as ReactElements
  const eventElements = Children.toArray(children) as ReactElement[];
  // understands the children inside Timeline as TimelineEvents
  const events = eventElements.map(child => child.props) as TimelineEvent[];

  const allYears = new Set<number>();
  events.forEach((event: TimelineEvent) => {
    allYears.add(event.startYear);
    if (event.endYear) allYears.add(event.endYear);
  });

  const years = Array.from(allYears).sort((a, b) => b - a); //Newest first
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearSpan = maxYear - minYear;

  const minSpacing = 200; // Increased from 150 to 200
  const containerHeight = Math.max(yearSpan * minSpacing, events.length * minSpacing * 1.5); // Use max instead of min, add multiplier

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  const getEventPosition = (event: TimelineEvent) => {
    const duration = event.endYear ? event.endYear - event.startYear : 0;
    // Add minimum spacing between years to prevent clustering
    const yearPosition = ((maxYear - event.startYear) / (maxYear - minYear)) * 100;
    return {
      top: yearPosition,
      height: duration > 0 ? ((duration) / (maxYear - minYear)) * 100 : 0
    };
  };

  const getYearPosition = ((year:number) => (maxYear - year) /  (maxYear - minYear) * 100); 
  
  
    return (
    <div 
      ref={timelineRef}
      style={{ 
        position: 'relative', 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '4rem 2rem', // Increased padding from 2rem 0 to 4rem 2rem
        height: `${containerHeight}px`
    }}>
      {/* Main timeline spine */}
      <motion.div
        className="timeline-spine"
        initial={{ height: 0 }}
        animate={{ height: isVisible ? '100%' : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '4px',
          background: 'var(--color-3)',
          left: '40%',
          transform: 'translateX(-50%)',
          top: 0,
          bottom: 0,
          borderRadius: '2px',
        }}
      />

      {/* Year markers */}
      {years.map((year, index) => {
        const yearPosition = getYearPosition(year);
        return (
        <motion.div
          key={year}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={{
            position: 'absolute',
            left: '37%',
            transform: 'translateX(50%)',
            top: `${yearPosition}%`,
            background: 'var(--color-2)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {year}
        </motion.div>
        );
      }
      )}

      {/* Render children events */}
      {eventElements.map((child, index) => {
        const event = child.props as TimelineEvent;

        // Handle ongoing events
        const currentYear = new Date().getFullYear();
        const effectiveEndYear = event.isOngoing ? currentYear : event.endYear;
        const duration = effectiveEndYear ? effectiveEndYear - event.startYear : 0;
        console.log(duration);
        // Group events by start year and calculate offset within year
        const getSameYearOffset = (currentIndex: number) => {
          const currentEvent = eventElements[currentIndex].props as TimelineEvent;
          let sameYearIndex = 0;
          
          // Count how many events with the same start year come before this one
          for (let i = 0; i < currentIndex; i++) {
            const otherEvent = eventElements[i].props as TimelineEvent;
            if (otherEvent.startYear === currentEvent.startYear) {
              sameYearIndex++;
            }
          }
          
          return sameYearIndex * 180; // Increased from 120 to 180px vertical offset for each same-year event
        };

        //calculate overlaps with other duration lines
        const getHorizontalOffset = (currentIndex: number) => {
          let offset = 0;
          for (let i = 0; i < currentIndex; i++) {
            const otherEvent = eventElements[i].props as TimelineEvent;
            const otherEffectiveEndYear = otherEvent.isOngoing ? currentYear : otherEvent.endYear;
            const otherDuration = otherEffectiveEndYear ? otherEffectiveEndYear - otherEvent.startYear : 0;
            
            // Check if events overlap in time
            const currentStart = event.startYear;
            const currentEnd = effectiveEndYear || event.startYear;
            const otherStart = otherEvent.startYear;
            const otherEnd = otherEffectiveEndYear || otherEvent.startYear;
            
            // If there's overlap and both have duration lines
            if (duration > 0 && otherDuration > 0 && 
                currentStart <= otherEnd && currentEnd >= otherStart) {
              offset += 8; // 8px offset per overlapping event
            }
          }
          return offset;
        };

        const basePosition = getEventPosition(event);
        const sameYearOffset = getSameYearOffset(index)
        const horizontalOffset = getHorizontalOffset(index);

        return (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0, 
              x: 200,
              scale: 0.8
            }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : 200,
              scale: isVisible ? 1 : 0
            }}
            transition={{ 
              duration: 0.8, 
              delay: isVisible ? index * 0.2 + 1 : 0,
              type: "spring",
              stiffness: 100
            }}
            style={{
              position: 'absolute',
              left: '50%',
              width: '45%',
              top: `calc(${basePosition.top}% + ${sameYearOffset}px)`, // Add same-year offset
              paddingLeft: '5%',
              paddingRight: '0'
            }}
          >
        

            {/* Duration line for multi-year events */}
            {duration > 0 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ 
                  height: `${isVisible ? (duration / (maxYear - minYear)) * containerHeight : 0}px` 
                }}
                transition={{ duration: 1, delay: isVisible ? index * 0.2 + 0.5 : 0 }}
                style={{
                  position: 'absolute',
                  width: '3px',
                  background: `linear-gradient(to bottom, var(--color-3), var(--color-4))`,
                  left: `${horizontalOffset}px`,
                  top: `${-duration * 100}px`,
                  // transform: 'translateY(1rem)',
                  borderRadius: '2px',
                  zIndex: 5
                }}
              />
            )}

            {/* Clone child with additional props */}
            {cloneElement(child as ReactElement<TimelineEventProps>, {
              ...((child.props as object) || {}),
              duration,
              index,
              
              // Pass any additional layout props if needed
            })}
          </motion.div>
        );
      })}
    </div>
  );
}