
import React, { useState } from 'react';
import { UserPlus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddExpertForm from './AddExpertForm';
import ExpertsTable from './ExpertsTable';

// Updated mock experts to include all 8 experts from ExpertsSection
const mockExperts = [
  {
    id: 1,
    name: '김태호',
    role: '재무 컨설턴트',
    specialty: '병원 재무설계 및 투자계획 전문',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
    regions: ['서울', '경기'],
    services: ['재무 컨설팅']
  },
  {
    id: 2,
    name: '박지연',
    role: '입지 분석가',
    specialty: '의료기관 최적 입지선정 및 상권분석',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
    regions: ['대전', '충남'],
    services: ['입지 분석']
  },
  {
    id: 3,
    name: '이준호',
    role: '의료 인테리어 디자이너',
    specialty: '진료과목별 최적화 공간설계',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop',
    regions: ['서울', '인천', '경기'],
    services: ['설계 및 인테리어']
  },
  {
    id: 4,
    name: '최민서',
    role: '인허가 전문가',
    specialty: '의료기관 인허가 및 행정절차 대행',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    regions: ['부산', '경남'],
    services: ['인허가 대행']
  },
  {
    id: 5,
    name: '정서연',
    role: '의료인력 채용 전문가',
    specialty: '병원 맞춤형 인력 구성 및 채용',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    regions: ['서울', '인천', '경기'],
    services: ['인력 채용']
  },
  {
    id: 6,
    name: '강현우',
    role: '의료 마케팅 전문가',
    specialty: '디지털 마케팅 및 환자 유치 전략',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    regions: ['서울', '경기'],
    services: ['마케팅 전략']
  },
  {
    id: 7,
    name: '윤재호',
    role: '의료기기 컨설턴트',
    specialty: '진료과목별 최적 장비 구성 및 설치',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    regions: ['대구', '경북'],
    services: ['의료기기 구입 및 설치']
  },
  {
    id: 8,
    name: '한지민',
    role: '의료폐기물 관리 전문가',
    specialty: '의료폐기물 처리 및 수납 시스템 구축',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    regions: ['광주', '전라'],
    services: ['수납 및 의료폐기물 처리']
  }
];

const ExpertsManagement: React.FC = () => {
  const [isAddingExpert, setIsAddingExpert] = useState(false);
  
  const handleExpertAdded = () => {
    setIsAddingExpert(false);
    // Here you would typically refresh the experts list
  };

  if (isAddingExpert) {
    return <AddExpertForm onCancel={() => setIsAddingExpert(false)} onSubmit={handleExpertAdded} />;
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">전문가 관리</h2>
        <Button onClick={() => setIsAddingExpert(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          전문가 추가
        </Button>
      </div>
      
      <ExpertsTable experts={mockExperts} />
    </>
  );
};

export default ExpertsManagement;
