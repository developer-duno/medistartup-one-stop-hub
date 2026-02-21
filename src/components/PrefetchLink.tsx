import React, { useCallback } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

const prefetchMap: Record<string, () => Promise<unknown>> = {
  '/': () => import('../pages/Index'),
  '/services': () => import('../pages/Services'),
  '/experts': () => import('../pages/ExpertList'),
  '/regions': () => import('../pages/RegionalExperts'),
  '/insights': () => import('../pages/Insights'),
  '/success-stories': () => import('../pages/SuccessStories'),
};

const prefetched = new Set<string>();

const PrefetchLink = React.forwardRef<HTMLAnchorElement, LinkProps & { onClick?: () => void }>(
  ({ to, onMouseEnter, ...props }, ref) => {
    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        const path = typeof to === 'string' ? to : to.pathname ?? '';
        if (!prefetched.has(path) && prefetchMap[path]) {
          prefetched.add(path);
          prefetchMap[path]();
        }
        onMouseEnter?.(e);
      },
      [to, onMouseEnter]
    );

    return <Link ref={ref} to={to} onMouseEnter={handleMouseEnter} {...props} />;
  }
);

PrefetchLink.displayName = 'PrefetchLink';

export default PrefetchLink;
