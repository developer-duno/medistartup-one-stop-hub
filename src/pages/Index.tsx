
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
import SimulatorSection from '../components/simulator/SimulatorSection';
import ExpertApplicationCTA from '../components/expert/ExpertApplicationCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <SimulatorSection />
      <RegionalMap />
      <ExpertsSection />
      <NewsInsightsSection />
      <SuccessStoriesSection />
      
      <ContactSection />
      
      {/* Expert application CTA section - moved below contact section */}
      <ExpertApplicationCTA />
      
      <Footer />
    </div>
  );
};

export default Index;
