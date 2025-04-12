
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import RegionalMap from '../components/RegionalMap';
import ExpertsSection from '../components/ExpertsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <RegionalMap />
      <ExpertsSection />
      
      {/* News & Insights Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              뉴스 & <span className="text-primary">인사이트</span>
            </h2>
            <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
              병원 창업과 운영에 관한 최신 의료법 개정 소식과 트렌드 리포트를 확인하세요.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link to="/insights" className="inline-flex items-center bg-white px-6 py-3 rounded-md shadow-sm border border-neutral-200 hover:shadow-md transition-shadow font-pretendard font-medium">
              모든 인사이트 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
