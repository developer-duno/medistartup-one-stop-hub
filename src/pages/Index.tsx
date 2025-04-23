
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import RegionalMap from '../components/RegionalMap';
import ExpertsSection from '../components/ExpertsSection';
import NewsInsightsSection from '../components/home/NewsInsightsSection';
import SuccessStoriesSection from '../components/home/SuccessStoriesSection';
import SimulatorSection from '../components/simulator/SimulatorSection';
import ExpertApplicationCTA from '../components/expert/ExpertApplicationCTA';
import { Helmet } from 'react-helmet-async';
import { generateSeoData } from '@/utils/seo/metaUtils';
import { generateOrganizationSchema } from '@/utils/schema/organizationSchema';

const Index = () => {
  const seoData = generateSeoData({
    title: '병원창업 원스톱 허브',
    description: '병원창업 전문지식과 경험을 한 곳에서. 의료인을 위한 맞춤형 창업 컨설팅 서비스.',
    pathname: '/',
  });

  const schemaData = generateOrganizationSchema();

  return (
    <MainLayout>
      <Helmet {...seoData}>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <HeroSection />
      <ServicesSection />
      <SimulatorSection />
      <RegionalMap />
      <ExpertsSection />
      <NewsInsightsSection />
      <SuccessStoriesSection />
      <ExpertApplicationCTA />
    </MainLayout>
  );
};

export default Index;
