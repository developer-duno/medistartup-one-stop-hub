import React, { useRef, useState, useEffect } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  className = '', 
  rootMargin = '200px',
  fallback 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (fallback || <div className="min-h-[200px]" />)}
    </div>
  );
};

export default LazySection;
