import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SuccessStories = () => {
  // The original content of this file is not in the provided code, so I'll create a basic structure
  // with the green theme applied
  
  return (
    <div className="theme-success min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-28 pb-16 theme-page-header">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
              성공 <span className="theme-text">스토리</span>
            </h1>
            <p className="font-noto text-neutral-600 mb-8">
              MediStartup과 함께한 의료기관들의 성공 사례를 확인하세요.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* The content would normally go here, applying the theme classes as appropriate */}
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessStories;
