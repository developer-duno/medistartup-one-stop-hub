
import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div id="page-container-root">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
