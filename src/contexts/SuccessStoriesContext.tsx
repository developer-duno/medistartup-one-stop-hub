
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SuccessStory {
  id: number;
  title: string;
  hospital: string;
  location: string;
  services: string[];
  date: string;
  imageUrl: string;
  featured: boolean;
  visible: boolean;
  content: string;
  summary: string;
}

interface SuccessStoriesContextType {
  successStories: SuccessStory[];
  addSuccessStory: (story: Omit<SuccessStory, 'id'>) => void;
  updateSuccessStory: (story: SuccessStory) => void;
  deleteSuccessStory: (id: number) => void;
  toggleVisibility: (id: number) => void;
  toggleFeatured: (id: number) => void;
  getVisibleStories: () => SuccessStory[];
  getFeaturedStories: () => SuccessStory[];
}

const defaultSuccessStories: SuccessStory[] = [
  {
    id: 1,
    title: '서울 강남구 피부과 성공적 개원',
    hospital: '미소피부과의원',
    location: '서울 강남',
    services: ['입지 분석', '인테리어', '마케팅'],
    date: '2023-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop',
    featured: true,
    visible: true,
    content: '미소피부과의원은 MediStartup과 함께 강남 지역의 특성을 고려한 입지 분석부터 시작했습니다. 유동인구가 많고 접근성이 좋은 위치를 선정했으며, 타겟 고객층에 맞는 인테리어와 마케팅 전략을 수립하였습니다. 개원 3개월 만에 손익분기점을 돌파하는 성과를 거두었습니다.',
    summary: 'MediStartup과 함께 효율적인 운영 시스템을 구축하여 환자 만족도를 크게 향상시켰습니다.'
  },
  {
    id: 2,
    title: '대전 둔산동 소아과 리모델링',
    hospital: '행복소아과의원',
    location: '대전 서구',
    services: ['인테리어', '의료기기'],
    date: '2023-02-10',
    imageUrl: 'https://images.unsplash.com/photo-1629909614088-7dd6c3197533?q=80&w=2069&auto=format&fit=crop',
    featured: false,
    visible: true,
    content: '행복소아과의원은 10년 된 의원의 리모델링을 통해 새로운 도약을 준비했습니다. MediStartup은 아이들이 편안함을 느낄 수 있는 인테리어 디자인과 최신 의료기기 도입을 통해 진료 효율성을 높였습니다. 리모델링 후 환자 만족도가 92%로 상승했으며, 신규 환자 유입이 35% 증가했습니다.',
    summary: '10년 된 소아과 의원의 리모델링을 통해 새로운 도약을 이루어낸 성공 사례입니다.'
  },
  {
    id: 3,
    title: '부산 해운대 치과 개원 컨설팅',
    hospital: '스마일치과의원',
    location: '부산 해운대',
    services: ['재무 컨설팅', '인력 채용'],
    date: '2023-01-22',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop',
    featured: true,
    visible: true,
    content: '스마일치과의원은 해운대 지역 특성에 맞는 재무 계획과 인력 채용 전략을 MediStartup과 함께 수립했습니다. 지역 특성에 맞는 치과 서비스 포트폴리오를 구성하고, 경험 많은 의료진을 채용하여 개원 초기부터 안정적인 운영을 이룰 수 있었습니다. 개원 6개월 만에 월 매출 목표의 120%를 달성하였습니다.',
    summary: '지역 특성에 맞는 재무 계획과 인력 채용으로 성공적인 치과 개원을 이루어냈습니다.'
  }
];

const SuccessStoriesContext = createContext<SuccessStoriesContextType | undefined>(undefined);

export const SuccessStoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(() => {
    const savedStories = localStorage.getItem('successStories');
    return savedStories ? JSON.parse(savedStories) : defaultSuccessStories;
  });

  // Save to localStorage whenever stories change
  useEffect(() => {
    localStorage.setItem('successStories', JSON.stringify(successStories));
  }, [successStories]);

  const addSuccessStory = (story: Omit<SuccessStory, 'id'>) => {
    const newId = successStories.length > 0 
      ? Math.max(...successStories.map(s => s.id)) + 1 
      : 1;
    
    setSuccessStories([...successStories, { ...story, id: newId }]);
  };

  const updateSuccessStory = (story: SuccessStory) => {
    setSuccessStories(
      successStories.map(s => s.id === story.id ? story : s)
    );
  };

  const deleteSuccessStory = (id: number) => {
    setSuccessStories(successStories.filter(s => s.id !== id));
  };

  const toggleVisibility = (id: number) => {
    setSuccessStories(
      successStories.map(s => s.id === id ? { ...s, visible: !s.visible } : s)
    );
  };

  const toggleFeatured = (id: number) => {
    setSuccessStories(
      successStories.map(s => s.id === id ? { ...s, featured: !s.featured } : s)
    );
  };

  const getVisibleStories = () => {
    return successStories.filter(s => s.visible);
  };

  const getFeaturedStories = () => {
    return successStories.filter(s => s.visible && s.featured);
  };

  return (
    <SuccessStoriesContext.Provider value={{
      successStories,
      addSuccessStory,
      updateSuccessStory,
      deleteSuccessStory,
      toggleVisibility,
      toggleFeatured,
      getVisibleStories,
      getFeaturedStories
    }}>
      {children}
    </SuccessStoriesContext.Provider>
  );
};

export const useSuccessStories = () => {
  const context = useContext(SuccessStoriesContext);
  if (context === undefined) {
    throw new Error('useSuccessStories must be used within a SuccessStoriesProvider');
  }
  return context;
};
