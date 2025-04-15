import { Expert } from '../types/expert';

export const initialExperts: Expert[] = [
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
    services: ['재무 컨설팅'],
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    keyAchievements: [
      '연간 100+ 의료기관 재무 컨설팅 수행',
      '평균 수익률 25% 이상 달성',
      '의료기관 특화 투자 포트폴리오 개발'
    ],
    educationHistory: [
      {
        degree: '의학박사',
        institution: '서울대학교 의과대학',
        year: '2005'
      },
      {
        degree: 'MBA',
        institution: '카이스트 경영대학',
        year: '2008'
      }
    ],
    careerTimeline: [
      {
        year: '2008-2015',
        position: '수석 컨설턴트',
        company: '메디컬파트너스',
        description: '대형 병원 재무 컨설팅 총괄'
      },
      {
        year: '2015-현재',
        position: '대표 컨설턴트',
        company: '메디스타트업',
        description: '의료기관 맞춤형 재무설계 및 투자자문'
      }
    ],
    successCases: [
      {
        title: '강남 A병원 수익성 개선',
        description: '운영 비용 최적화와 수익 구조 개선을 통한 수익성 향상 달성',
        image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2071&auto=format&fit=crop',
        results: [
          '연간 운영비용 20% 절감',
          '환자 만족도 15% 상승',
          '순이익률 2배 증가'
        ]
      }
    ],
    testimonials: [
      {
        name: '이상철',
        position: '서울 힐링병원 원장',
        content: '김태호 컨설턴트의 전문적인 자문 덕분에 병원 재정이 안정화되었고, 장기 성장 전략을 수립할 수 있었습니다.',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: '박미영',
        position: '미래메디컬 대표원장',
        content: '체계적인 재무 분석과 실행 가능한 해결책을 제시해주셔서 큰 도움이 되었습니다.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop'
      }
    ]
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
