
import { Service } from '@/types/service';

export const initialServices: Service[] = [
  {
    id: 1,
    title: '입지 분석',
    description: '유동인구, 경쟁 의료기관, 임대료 등을 고려한 최적 입지 선정',
    icon: 'MapPin',
    path: '/services/location-analysis',
    category: 'planning'
  },
  {
    id: 2,
    title: '재무 컨설팅',
    description: '초기 투자비용 산정부터 손익분기점 예측까지 맞춤형 재무 계획',
    icon: 'BarChart3',
    path: '/services/financial-consulting',
    category: 'planning'
  },
  {
    id: 3,
    title: '설계 및 인테리어',
    description: '진료과목별 최적 동선 설계 및 브랜드 아이덴티티를 반영한 인테리어',
    icon: 'Building2',
    path: '/services/design-interior',
    category: 'implementation'
  },
  {
    id: 4,
    title: '인허가 대행',
    description: '복잡한 행정 절차를 원스톱으로 처리하는 인허가 대행 서비스',
    icon: 'FileCheck',
    path: '/services/licensing',
    category: 'implementation'
  },
  {
    id: 7,
    title: '의료기기 구입 및 설치',
    description: '최적의 의료장비 선정부터 설치, A/S까지 원스톱 제공',
    icon: 'Package',
    path: '/services/medical-equipment',
    category: 'equipment'
  },
  {
    id: 8,
    title: '수납 및 의료폐기물 처리',
    description: '의료폐기물 처리 계약부터 효율적인 수납 시스템 구축까지',
    icon: 'Trash2',
    path: '/services/waste-management',
    category: 'equipment'
  },
  {
    id: 5,
    title: '인력 채용',
    description: '전문 의료인력 채용 및 교육 프로그램 지원',
    icon: 'Users',
    path: '/services/recruitment',
    category: 'operation'
  },
  {
    id: 6,
    title: '마케팅 전략',
    description: '개원 초기 인지도 확보부터 지속 가능한 환자 유치 전략 수립',
    icon: 'Briefcase',
    path: '/services/marketing-strategy',
    category: 'operation'
  }
];
