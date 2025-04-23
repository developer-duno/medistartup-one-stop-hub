
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import PageContainer from './PageContainer';

type MainLayoutProps = {
  children: React.ReactNode;
  hideFooter?: boolean;
  className?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  hideFooter = false,
  className = ''
}) => {
  return (
    <PageContainer className={className}>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </PageContainer>
  );
};

export default MainLayout;
