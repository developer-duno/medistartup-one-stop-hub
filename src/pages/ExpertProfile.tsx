
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import ExpertHero from '@/components/expert/profile/ExpertHero';
import ExpertOverview from '@/components/expert/profile/ExpertOverview';
import ExpertCareer from '@/components/expert/profile/ExpertCareer';
import ExpertSuccessCases from '@/components/expert/profile/ExpertSuccessCases';
import ExpertTestimonials from '@/components/expert/profile/ExpertTestimonials';
import ExpertSidebar from '@/components/expert/profile/ExpertSidebar';
import { useExperts } from '@/contexts/ExpertsContext';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";

const ExpertProfile = () => {
  const { id } = useParams();
  const { getExpertById } = useExperts();
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [expert, setExpert] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedExperts, selectExpert } = useConsultation();
  const isExpertSelected = expert ? selectedExperts.includes(expert.id) : false;

  useEffect(() => {
    setIsLoading(true);
    
    const expertId = Number(id);
    if (isNaN(expertId)) {
      uiToast({
        title: "오류",
        description: "잘못된 전문가 ID입니다.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    const expertData = getExpertById(expertId);
    
    if (expertData) {
      setExpert(expertData);
    } else {
      uiToast({
        title: "전문가를 찾을 수 없습니다",
        description: "요청하신 전문가 정보를 찾을 수 없습니다.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  }, [id, getExpertById, navigate, uiToast]);

  const handleSelectExpert = () => {
    if (expert) {
      selectExpert(expert.id);
      toast.success(isExpertSelected ? "전문가 선택이 취소되었습니다." : "전문가가 선택되었습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <LoadingState className="h-[60vh]" />
        <Footer />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">전문가를 찾을 수 없습니다</h1>
            <p className="text-muted-foreground">요청하신 전문가 정보가 존재하지 않습니다.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <ErrorBoundary>
        <ExpertHero expert={expert} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <ErrorBoundary>
                <ExpertOverview expert={expert} />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <ExpertCareer expert={expert} />
              </ErrorBoundary>
              
              <ErrorBoundary>
                {expert.successCases && expert.successCases.length > 0 && (
                  <ExpertSuccessCases expert={expert} />
                )}
              </ErrorBoundary>
              
              <ErrorBoundary>
                {expert.testimonials && expert.testimonials.length > 0 && (
                  <ExpertTestimonials expert={expert} />
                )}
              </ErrorBoundary>
            </div>
            
            <div>
              <ErrorBoundary>
                <ExpertSidebar
                  expert={expert}
                  isExpertSelected={isExpertSelected}
                  onSelectExpert={handleSelectExpert}
                />
              </ErrorBoundary>
            </div>
          </div>
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default ExpertProfile;
