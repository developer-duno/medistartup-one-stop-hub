
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import RegionalMap from '../components/RegionalMap';
import ExpertsSection from '../components/ExpertsSection';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/Footer';
import NewsInsightsSection from '../components/home/NewsInsightsSection';
import SuccessStoriesSection from '../components/home/SuccessStoriesSection';
import ExpertApplicationButton from '../components/expert/ExpertApplicationButton';
import SimulatorSection from '../components/simulator/SimulatorSection';
import { UserPlus } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <SimulatorSection />
      <RegionalMap />
      <ExpertsSection />
      
      {/* Expert application CTA section */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
              <UserPlus className="inline-block h-8 w-8 mr-2 text-primary" />
              메디스타트업과 함께할 <span className="text-primary">전문가</span>를 모십니다
            </h3>
            <p className="font-noto text-neutral-600 mb-8">
              병원창업 관련 전문성을 갖추신 분들의 많은 지원 바랍니다.
              함께 성장하며 가치 있는 서비스를 제공할 전문가를 찾고 있습니다.
            </p>
            <div className="flex justify-center">
              <ExpertApplicationButton />
            </div>
          </div>
        </div>
      </section>
      
      <NewsInsightsSection />
      <SuccessStoriesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
