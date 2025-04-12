
import React, { useState } from 'react';
import { UserPlus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddExpertForm from './AddExpertForm';
import ExpertsTable from './ExpertsTable';

const mockExperts = [
  {
    id: 1,
    name: '김태호',
    role: '재무 컨설턴트',
    specialty: '병원 재무설계 및 투자계획 전문',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
    regions: ['서울', '경기'],
    services: ['재무 컨설팅', '마케팅 전략']
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
