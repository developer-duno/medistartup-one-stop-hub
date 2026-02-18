
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


interface ExpertPageLayoutProps {
  children: React.ReactNode;
}

const ExpertPageLayout: React.FC<ExpertPageLayoutProps> = ({ children }) => {
  
  
  return (
    <div className="theme-experts min-h-screen">
      <Navbar />
      
      <div className="theme-page-header">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-3 md:mb-4 text-xs md:text-sm">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-xl md:text-4xl text-neutral-900 mb-1 md:mb-2">
              전문 분야별 <span className="theme-text">최고의 전문가</span>
            </h1>
            <p className="font-noto text-neutral-600 text-xs md:text-sm">
              병원창업에 필요한 각 분야 전문가들을 만나보세요.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 md:py-10 pb-20">
        {children}
      </div>
      
      <Footer />
    </div>
  );
};

export default ExpertPageLayout;
