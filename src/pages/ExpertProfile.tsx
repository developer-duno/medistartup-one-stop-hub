
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExpertHero from '@/components/expert/profile/ExpertHero';
import ExpertOverview from '@/components/expert/profile/ExpertOverview';
import ExpertCareer from '@/components/expert/profile/ExpertCareer';
import ExpertSidebar from '@/components/expert/profile/ExpertSidebar';
import { useExperts } from '@/contexts/ExpertsContext';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useToast } from '@/components/ui/use-toast';
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
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">전문가를 찾을 수 없습니다</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <ExpertHero expert={expert} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ExpertOverview expert={expert} />
            <ExpertCareer expert={expert} />
          </div>
          
          <div>
            <ExpertSidebar
              expert={expert}
              isExpertSelected={isExpertSelected}
              onSelectExpert={handleSelectExpert}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpertProfile;
