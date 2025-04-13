
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
      
      <div className="pt-28 pb-20 theme-page-header">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
              전문 분야별 <span className="text-primary">최고의 전문가</span>
            </h1>
            <p className="font-noto text-neutral-600 mb-8">
              병원창업에 필요한 각 분야 전문가들을 만나보세요.
              풍부한 경력과 성공 사례를 바탕으로 최적의 솔루션을 제공해 드립니다.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        {children}
      </div>
      
      <Footer />
    </div>
  );
};

export default ExpertPageLayout;
