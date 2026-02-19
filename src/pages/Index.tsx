
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/HeroSection';
import LazySection from '../components/LazySection';
import { Helmet } from 'react-helmet-async';
import { generateSeoData } from '@/utils/seo/metaUtils';
import { generateOrganizationSchema } from '@/utils/schema/organizationSchema';

// Lazy-load below-fold sections
const ServicesSection = React.lazy(() => import('../components/ServicesSection'));
const RegionalMap = React.lazy(() => import('../components/RegionalMap'));
const ExpertsSection = React.lazy(() => import('../components/ExpertsSection'));
const NewsInsightsSection = React.lazy(() => import('../components/home/NewsInsightsSection'));
const SuccessStoriesSection = React.lazy(() => import('../components/home/SuccessStoriesSection'));
const SimulatorSection = React.lazy(() => import('../components/simulator/SimulatorSection'));
const ExpertApplicationCTA = React.lazy(() => import('../components/expert/ExpertApplicationCTA'));

const SectionFallback = () => (
  <div className="min-h-[300px] flex items-center justify-center">
    <div className="h-6 w-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
      
      <LazySection>
        <React.Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </React.Suspense>
      </LazySection>
      
      <LazySection>
        <React.Suspense fallback={<SectionFallback />}>
          <SimulatorSection />
        </React.Suspense>
      </LazySection>
      
      <LazySection>
        <React.Suspense fallback={<SectionFallback />}>
          <RegionalMap />
        </React.Suspense>
      </LazySection>
      
      <LazySection>
        <React.Suspense fallback={<SectionFallback />}>
          <div className="bg-gray-50">
            <ExpertsSection />
          </div>
        </React.Suspense>
      </LazySection>
      
      <LazySection>
        <React.Suspense fallback={<SectionFallback />}>
          <NewsInsightsSection />
        </React.Suspense>
      </LazySection>
      
      <LazySection>
        <React.Suspense fallback={<SectionFallback />}>
          <SuccessStoriesSection />
        </React.Suspense>
      </LazySection>
      
      <LazySection>
        <React.Suspense fallback={<SectionFallback />}>
          <ExpertApplicationCTA />
        </React.Suspense>
      </LazySection>
    </MainLayout>
  );
};

export default Index;
