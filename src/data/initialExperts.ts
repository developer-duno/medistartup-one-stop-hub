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
    description: `대한민국 최고의 병원 재무 전문가로서 15년간 320개 이상의 의료기관을 성공적으로 자문했습니다.

서울대 의대 출신으로서 의료기관의 특수성을 정확히 이해하고, 카이스트 MBA를 통해 체계적인 경영 지식을 갖추고 있습니다.

특히 개원의를 위한 맞춤형 재무설계, 투자 포트폴리오 구성, 세무 전략 수립에 강점이 있으며, 병원의 장기적인 성장을 위한 전략적 재무 계획을 제시합니다.

매년 100개 이상의 의료기관을 자문하며 평균 25% 이상의 수익률 향상을 달성하고 있습니다.`,
    regions: ['서울', '경기남부', '경기북부'],
    services: ['재무 컨설팅'],
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    keyAchievements: [
      '연간 100+ 의료기관 재무 컨설팅 수행',
      '평균 수익률 25% 이상 달성',
      '의료기관 특화 투자 포트폴리오 개발',
      '병원 가치평가 모델 개발',
      '의료기관 M&A 자문 20건+ 성공',
      '세무 최적화로 평균 15% 비용 절감'
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
      },
      {
        degree: '공인회계사(CPA)',
        institution: '한국공인회계사회',
        year: '2009'
      }
    ],
    careerTimeline: [
      {
        year: '2008-2015',
        position: '수석 컨설턴트',
        company: '메디컬파트너스',
        description: '대형병원 재무 컨설팅 총괄, 연평균 40개 병원 자문'
      },
      {
        year: '2015-2020',
        position: '대표 컨설턴트',
        company: '메디스타트업',
        description: '의료기관 맞춤형 재무설계 및 투자자문, 스타트업 투자 유치 자문'
      },
      {
        year: '2020-현재',
        position: '대표이사',
        company: '메디컬파이낸스그룹',
        description: '종합 의료기관 재무 컨설팅, M&A 자문, 투자 유치 지원'
      }
    ],
    successCases: [
      {
        title: '강남 A성형외과 수익성 개선',
        description: '운영 비용 최적화와 수익 구조 개선을 통한 수익성 향상 달성. 투자 유치를 통한 시설 확장으로 매출 2배 증가.',
        image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2071&auto=format&fit=crop',
        results: [
          '연간 운영비용 20% 절감',
          '환자 만족도 15% 상승',
          '순이익률 2배 증가',
          '투자 유치 30억 달성'
        ]
      },
      {
        title: '부산 B재활병원 재무구조 개선',
        description: '부채 구조 개선과 운영 효율화를 통한 재무건전성 확보. 신규 진료과목 확장으로 매출 다각화.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
        results: [
          '부채비율 40% 감소',
          '운영비용 15% 절감',
          '신규 진료과목 매출 30% 기여',
          '현금흐름 2배 개선'
        ]
      },
      {
        title: '대구 C내과 프랜차이즈화',
        description: '단독 의원을 프랜차이즈 모델로 전환하여 규모의 경제 달성. 표준화된 운영 시스템 구축.',
        image: 'https://images.unsplash.com/photo-1631815587646-b85a1bb027e0?q=80&w=2072&auto=format&fit=crop',
        results: [
          '5개 지점 성공적 오픈',
          '통합 운영으로 비용 25% 절감',
          '브랜드 가치 상승',
          '그룹 전체 매출 3배 성장'
        ]
      }
    ],
    testimonials: [
      {
        name: '이상철',
        position: '서울 힐링병원 원장',
        content: '김태호 컨설턴트의 전문적인 자문 덕분에 병원 재정이 안정화되었고, 장기 성장 전략을 수립할 수 있었습니다. 특히 재무구조 개선과 투자 유치 부분에서 탁월한 역량을 보여주셨습니다.',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: '박미영',
        position: '미래메디컬 대표원장',
        content: '체계적인 재무 분석과 실행 가능한 해결책을 제시해주셔서 큰 도움이 되었습니다. 특히 세무 최적화 전략으로 상당한 비용 절감을 달성할 수 있었습니다.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: '최재원',
        position: '마디로병원 이사장',
        content: '프랜차이즈 확장 과정에서 받은 자문이 매우 유용했습니다. 체계적인 재무 계획과 리스크 관리 전략 덕분에 안정적인 성장이 가능했습니다.',
        image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1974&auto=format&fit=crop'
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
    description: `의료기관 특화 빅데이터 분석 전문가로서 12년간 280개 이상의 성공적인 입지 선정을 이끌었습니다.

독자적으로 개발한 '메디로케이션 분석 시스템'을 통해 인구 통계, 유동 인구, 경쟁 현황, 임대료 등을 종합적으로 분석하여 최적의 입지를 도출합니다.

특히 대전/충남 지역 의료상권에 대한 깊은 이해를 바탕으로, 지역 특성을 고려한 맞춤형 입지 전략을 제시합니다.

데이터 기반의 과학적인 분석으로 90% 이상의 입지 선정 성공률을 자랑합니다.`,
    regions: ['대전', '충남'],
    services: ['입지 분석'],
    coverImage: 'https://images.unsplash.com/photo-1501250987900-211872d97eaa?q=80&w=2070&auto=format&fit=crop',
    keyAchievements: [
      '의료기관 입지 성공률 90% 이상',
      '빅데이터 기반 상권분석 시스템 개발',
      '지역별 의료 수요 예측 모델 구축',
      '입지 실패율 5% 미만 달성',
      '평균 상권 분석 시간 50% 단축',
      '의료기관 생존율 85% 이상 달성'
    ],
    educationHistory: [
      {
        degree: '도시계획학 박사',
        institution: 'KAIST',
        year: '2010'
      },
      {
        degree: '빅데이터분석 석사',
        institution: '서울대학교',
        year: '2008'
      }
    ],
    careerTimeline: [
      {
        year: '2010-2015',
        position: '선임연구원',
        company: '한국도시계획연구원',
        description: '의료시설 입지 최적화 모델 개발'
      },
      {
        year: '2015-2020',
        position: '수석컨설턴트',
        company: '메디컬로케이션',
        description: '의료기관 입지선정 및 상권분석 총괄'
      },
      {
        year: '2020-현재',
        position: '대표이사',
        company: '메디컬맵스',
        description: '의료상권 분석 플랫폼 운영 및 컨설팅'
      }
    ],
    successCases: [
      {
        title: '대전 메디컬스트릿 프로젝트',
        description: '대전 특정 상권을 의료특화거리로 성공적으로 개발. 15개 이상의 전문병원 집적화 달성.',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1974&auto=format&fit=crop',
        results: [
          '15개 이상 의료기관 성공적 입점',
          '보행자 통행량 200% 증가',
          '의료관광객 유입 150% 증가',
          '상권 평균 매출 80% 상승'
        ]
      },
      {
        title: '세종시 신규 의료단지 조성',
        description: '세종시 신도시 내 의료클러스터 입지 선정 및 개발 계획 수립',
        image: 'https://images.unsplash.com/photo-1538685634737-24b83e3fa2f8?q=80&w=2070&auto=format&fit=crop',
        results: [
          '10개 종합병원 유치',
          '연간 방문객 100만명 달성',
          '지역 의료 접근성 40% 개선',
          '부동산 가치 50% 상승'
        ]
      }
    ],
    testimonials: [
      {
        name: '김현우',
        position: '세종메디컬센터 이사장',
        content: '박지연 대표님의 정확한 입지 분석 덕분에 최적의 위치에서 성공적으로 개원할 수 있었습니다. 특히 유동인구와 경쟁병원 분석이 매우 정확했습니다.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
      },
      {
        name: '이성진',
        position: '대전현대병원 원장',
        content: '빅데이터를 활용한 과학적인 분석 방식이 매우 인상적이었습니다. 제시해주신 입지 전략 덕분에 개원 6개월 만에 손익분기점을 달성했습니다.',
        image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 3,
    name: '이준호',
    role: '��료 인테리어 디자이너',
    specialty: '진료과목별 최적화 공간설계',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop',
    experience: '10년+',
    projects: '170+',
    description: '의료공간 특화 인테리어 디자이너로 환자 경험과 의료진 효율성을 모두 고려한 최적의 공간설계를 제안합니다. 다양한 진료과목별 맞춤 설계 경험이 풍부합니다.',
    regions: ['서울', '인천', '경기남부', '경기북부'],
    services: ['설계 및 인테리어'],
    coverImage: 'https://images.unsplash.com/photo-1616587894686-c243d4247965?q=80&w=2069&auto=format&fit=crop',
    keyAchievements: [
      '환자 만족도 30% 향상',
      '의료진 업무 효율성 20% 증가',
      '최적 공간 설계 솔루션 개발'
    ],
    testimonials: []
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
    services: ['인허가 대행'],
    coverImage: 'https://images.unsplash.com/photo-1628201537098-f05946692164?q=80&w=2070&auto=format&fit=crop',
    keyAchievements: [
      '인허가 성공률 99% 달성',
      '평균 인허가 기간 30% 단축',
      '최신 법규 및 규정 완벽 준수'
    ],
    testimonials: []
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
    regions: ['서울', '인천', '경기남부', '경기북부'],
    services: ['인력 채용'],
    coverImage: 'https://images.unsplash.com/photo-1580894724668-f2955195791e?q=80&w=2070&auto=format&fit=crop',
    keyAchievements: [
      '이직률 15% 감소',
      '채용 만족도 40% 향상',
      '맞춤형 인재 매칭 시스템 구축'
    ],
    testimonials: []
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
    regions: ['서울', '경기남부', '경기북부'],
    services: ['마케팅 전략'],
    coverImage: 'https://images.unsplash.com/photo-1587613754453-50e1c8190c84?q=80&w=2070&auto=format&fit=crop',
    keyAchievements: [
      '신규 환자 유치율 50% 증가',
      '온라인 마케팅 ROI 3배 향상',
      '지역 타겟 마케팅 성공 사례 다수'
    ],
    testimonials: []
  },
  {
    id: 7,
    name: '윤재호',
    role: '의료기기 컨설턴트',
    specialty: '진료과목별 최적 장비 구성 및 설치',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    experience: '13년+',
    projects: '230+',
    description: '의료기관별 최적의 의료장비 구성과 효율적인 도입 ��안을 제시합니다. 비용 대비 성능을 고려한 장비 선정과 공간 효율적 배치 설계를 전문으로 합니다.',
    regions: ['대구', '경북'],
    services: ['의료기기 구입 및 설치'],
    coverImage: 'https://images.unsplash.com/photo-1629412587745-79c1929b324e?q=80&w=2070&auto=format&fit=crop',
    keyAchievements: [
      '장비 도입 비용 20% 절감',
      '공간 효율성 15% 향상',
      '최신 의료 트렌드 반영'
    ],
    testimonials: []
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
    regions: ['광주', '제주'],
    services: ['수납 및 의료폐기물 처리'],
    coverImage: 'https://images.unsplash.com/photo-1607880539761-7e44c39f44cb?q=80&w=2070&auto=format&fit=crop',
    keyAchievements: [
      '폐기물 처리 비용 25% 절감',
      '수납 효율성 30% 향상',
      '환경 규제 준수율 100% 달성'
    ],
    testimonials: []
  }
];
