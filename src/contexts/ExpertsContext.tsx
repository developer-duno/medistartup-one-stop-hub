import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Expert, NewExpert } from '../types/expert';
import { useToast } from '@/components/ui/use-toast';

// Importing the initial expert data from ExpertsSection
const initialExperts = [
  {
    id: 1,
    name: '김태호',
    role: '재무 컨설턴트',
    specialty: '병원 재무설계 및 투자계획 전문',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
    experience: '15년+',
    projects: '320+',
    description: '서울대 의대 출신으로 병원 경영 컨설팅 15년 경력. 특히 개원의를 위한 맞춤형 재무설계와 수익성 분석에 강점이 있습니다.',
    regions: ['서울', '경기'],
    services: ['재무 컨설팅']
  },
  {
    id: 2,
    name: '박지연',
    role: '입지 분석가',
    specialty: '의료기관 최적 입지선정 및 상권분석',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
    experience: '12년+',
    projects: '280+',
    description: '빅데이터 기반 상권분석 전문가로 의료기관 특화 입지분석 모델을 개발했습니다. 대전/충남 지역 의료상권에 대한 깊은 이해를 갖고 있습니다.',
    regions: ['대전', '충남'],
    services: ['입지 분석']
  },
  {
    id: 3,
    name: '이준호',
    role: '의료 인테리어 디자이너',
    specialty: '진료과목별 최적화 공간설계',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop',
    experience: '10년+',
    projects: '170+',
    description: '의료공간 특화 인테리어 디자이너로 환자 경험과 의료진 효율성을 모두 고려한 최적의 공간설계를 제안합니다. 다양한 진료과목별 맞춤 설계 경험이 풍부합니다.',
    regions: ['서울', '인천', '경기'],
    services: ['설계 및 인테리어']
  },
  {
    id: 4,
    name: '최민서',
    role: '인허가 전문가',
    specialty: '의료기관 인허가 및 행정절차 대행',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    experience: '14년+',
    projects: '250+',
    description: '복잡한 의료기관 인허가 절차를 신속하고 정확하게 처리합니다. 각종 규제와 법률 변화에 즉각 대응하여 개원 지연 리스크를 최소화합니다.',
    regions: ['부산', '경남'],
    services: ['인허가 대행']
  },
  {
    id: 5,
    name: '정서연',
    role: '의료인력 채용 전문가',
    specialty: '병원 맞춤형 인력 구성 및 채용',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    experience: '9년+',
    projects: '210+',
    description: '의료기관별 최적의 인력 구조를 설계하고 적합한 인재를 매칭합니다. 장기적인 인력 안정성과 팀워크를 고려한 채용 솔루션을 제공합니다.',
    regions: ['서울', '인천', '경기'],
    services: ['인력 채용']
  },
  {
    id: 6,
    name: '강현우',
    role: '의료 마케팅 전문가',
    specialty: '디지털 마케팅 및 환자 유치 전략',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    experience: '11년+',
    projects: '190+',
    description: '의료기관 특화 디지털 마케팅 전략 수립 및 실행 전문가입니다. 지역 타겟팅과 진료과목별 특성을 고려한 효과적인 환자 유치 방안을 제시합니다.',
    regions: ['서울', '경기'],
    services: ['마케팅 전략']
  },
  {
    id: 7,
    name: '윤재호',
    role: '의료기기 컨설턴트',
    specialty: '진료과목별 최적 장비 구성 및 설치',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    experience: '13년+',
    projects: '230+',
    description: '의료기관별 최적의 의료장비 구성과 효율적인 도입 방안을 제시합니다. 비용 대비 성능을 고려한 장비 선정과 공간 효율적 배치 설계를 전문으로 합니다.',
    regions: ['대구', '경북'],
    services: ['의료기기 구입 및 설치']
  },
  {
    id: 8,
    name: '한지민',
    role: '의료폐기물 관리 전문가',
    specialty: '의료폐기물 처리 및 수납 시스템 구축',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    experience: '8년+',
    projects: '160+',
    description: '의료기관의 효율적인 수납 시스템 구축 및 의료폐기물 관리 솔루션을 제공합니다. 비용 절감과 환경 규제 준수를 모두 고려한 최적의 방안을 제시합니다.',
    regions: ['광주', '전라'],
    services: ['수납 및 의료폐기물 처리']
  }
];

interface ExpertsContextType {
  experts: Expert[];
  addExpert: (expert: NewExpert) => void;
  updateExpert: (expert: Expert) => void;
  deleteExpert: (id: number) => void;
}

const ExpertsContext = createContext<ExpertsContextType | undefined>(undefined);

export const useExperts = () => {
  const context = useContext(ExpertsContext);
  if (!context) {
    throw new Error('useExperts must be used within an ExpertsProvider');
  }
  return context;
};

interface ExpertsProviderProps {
  children: ReactNode;
}

export const ExpertsProvider: React.FC<ExpertsProviderProps> = ({ children }) => {
  const [experts, setExperts] = useState<Expert[]>(initialExperts);
  const { toast } = useToast();

  // Log experts whenever it changes (for debugging)
  useEffect(() => {
    console.log("Experts state updated:", experts);
  }, [experts]);

  const addExpert = useCallback((newExpert: NewExpert) => {
    // Ensure regions and services are arrays
    const expertWithArrays: NewExpert = {
      ...newExpert,
      regions: Array.isArray(newExpert.regions) ? newExpert.regions : [],
      services: Array.isArray(newExpert.services) ? newExpert.services : []
    };

    setExperts(prevExperts => {
      // Create new ID by finding the max ID and adding 1
      const newId = Math.max(0, ...prevExperts.map(expert => expert.id)) + 1;
      const expertWithId: Expert = { ...expertWithArrays, id: newId };
      
      // Use functional update to ensure we're working with the latest state
      const updatedExperts = [...prevExperts, expertWithId];
      
      // Display success toast
      toast({
        title: "전문가 추가 완료",
        description: `${newExpert.name} 전문가가 성공적으로 등록되었습니다.`,
        variant: "default",
      });

      console.log("Expert added:", expertWithId);
      console.log("Updated experts list:", updatedExperts);
      
      return updatedExperts;
    });
  }, [toast]);

  const updateExpert = useCallback((updatedExpert: Expert) => {
    // Ensure regions and services are arrays
    const expertWithArrays: Expert = {
      ...updatedExpert,
      regions: Array.isArray(updatedExpert.regions) ? updatedExpert.regions : [],
      services: Array.isArray(updatedExpert.services) ? updatedExpert.services : []
    };
    
    setExperts(prevExperts => {
      const updatedExperts = prevExperts.map(expert => 
        expert.id === expertWithArrays.id ? expertWithArrays : expert
      );
      
      toast({
        title: "전문가 정보 업데이트",
        description: `${updatedExpert.name} 전문가 정보가 업데이트되었습니다.`,
        variant: "default",
      });
      
      return updatedExperts;
    });
  }, [toast]);

  const deleteExpert = useCallback((id: number) => {
    setExperts(prevExperts => {
      const expertToDelete = prevExperts.find(expert => expert.id === id);
      const filteredExperts = prevExperts.filter(expert => expert.id !== id);
      
      if (expertToDelete) {
        toast({
          title: "전문가 삭제 완료",
          description: `${expertToDelete.name} 전문가가 삭제되었��니다.`,
          variant: "default",
        });
        
        console.log("Expert deleted:", expertToDelete);
        console.log("Remaining experts:", filteredExperts);
      }
      
      return filteredExperts;
    });
  }, [toast]);

  const contextValue = {
    experts,
    addExpert,
    updateExpert,
    deleteExpert
  };

  return (
    <ExpertsContext.Provider value={contextValue}>
      {children}
    </ExpertsContext.Provider>
  );
};
