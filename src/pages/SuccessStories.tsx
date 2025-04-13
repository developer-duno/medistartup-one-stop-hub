
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
        {/* Success stories content would go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example success story cards */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
              <div className="aspect-video bg-neutral-100"></div>
              <div className="p-5">
                <h3 className="font-pretendard font-bold text-lg mb-2">
                  성공 사례 #{item}
                </h3>
                <p className="text-neutral-600 text-sm mb-3">
                  MediStartup과 함께 효율적인 운영 시스템을 구축하여 환자 만족도를 크게 향상시켰습니다.
                </p>
                <div className="flex justify-end">
                  <Link to="#" className="theme-text font-medium text-sm">
                    자세히 보기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessStories;
