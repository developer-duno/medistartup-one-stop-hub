
import React from 'react';
import { Building2 } from 'lucide-react';
import ServiceDetail from '../../components/ServiceDetail';

const DesignInterior = () => {
  const serviceData = {
    title: '설계 및 인테리어',
    description: '진료과목별 최적 동선 설계 및 브랜드 아이덴티티를 반영한 인테리어 서비스',
    icon: <Building2 className="h-12 w-12 text-accent" />,
    color: 'from-accent-100 to-accent-50',
    features: [
      {
        title: '맞춤형 설계',
        description: '진료과목별 특성과 공간 효율성을 고려한 최적의 평면 설계 및 동선 계획'
      },
      {
        title: '브랜딩 인테리어',
        description: '병원의 아이덴티티와 차별화 전략을 공간에 녹여내는 디자인 컨셉 개발'
      },
      {
        title: '시공 관리',
        description: '설계부터 시공, 감리까지 원스톱 관리로 일정 및 예산 준수'
      },
      {
        title: '장비 배치 최적화',
        description: '의료장비 크기, 사용 빈도, 동선 등을 고려한 최적의 배치 계획'
      }
    ],
    benefits: [
      '환자 편의성 극대화로 재방문율 20% 증가',
      '효율적 동선 설계로 의료진 피로도 감소',
      '차별화된 공간 디자인으로 브랜드 가치 상승',
      '예산 대비 최적화된 인테리어 효과',
      '친환경 자재 활용으로 환자 신뢰도 향상'
    ],
    process: [
      {
        step: 1,
        title: '요구사항 분석',
        description: '병원 운영 계획, 진료과목 특성, 환자 타깃층 등 종합적 요구사항 파악'
      },
      {
        step: 2,
        title: '디자인 컨셉 개발',
        description: '병원 브랜드 아이덴티티를 반영한 디자인 컨셉 및 무드보드 제안'
      },
      {
        step: 3,
        title: '설계 및 도면 작성',
        description: '공간 구성, 동선 계획, 장비 배치 등을 포함한 상세 설계 및 도면 작성'
      },
      {
        step: 4,
        title: '자재 및 가구 선정',
        description: '예산, 기능성, 심미성을 고려한 최적의 자재, 가구, 조명 등 선정'
      },
      {
        step: 5,
        title: '시공 및 감리',
        description: '전문 시공팀의 일정에 맞춘 시공 진행 및 품질 관리를 위한 정기 감리'
      }
    ],
    faqs: [
      {
        question: '인테리어 공사 기간은 얼마나 소요되나요?',
        answer: '일반적으로 소규모 의원은 1~2개월, 중규모는 2~3개월, 대규모 의원이나 특수 시설이 필요한 경우는 3~4개월 정도 소요됩니다. 다만 건물의 상태, 설비 공사의 복잡도 등에 따라 기간이 달라질 수 있습니다.'
      },
      {
        question: '인테리어 비용은 어떻게 결정되나요?',
        answer: '크게 면적, 마감재 등급, 설비 공사의 복잡도에 따라 결정됩니다. 평당 기준으로 기본형은 150~200만원, 중급형은 200~300만원, 고급형은 300만원 이상이 소요되는 경우가 일반적입니다. 정확한 견적은 현장 방문 후 산출해 드립니다.'
      },
      {
        question: '인테리어 트렌드와 기능성 중 무엇이 더 중요한가요?',
        answer: '의료기관의 특성상 기능성이 가장 중요합니다. 효율적인 동선과 위생적인 환경이 기본이 되어야 합니다. 다만 최근에는 환자 경험을 중시하는 추세로, 트렌디한 디자인과 기능성의 균형을 맞추는 것이 이상적입니다. 저희는 두 가지 요소를 모두 고려한 최적의 디자인을 제안합니다.'
      },
      {
        question: '기존 건물의 구조적 제약이 있을 때 어떻게 대응하나요?',
        answer: '구조적 제약은 사전 현장 조사를 통해 파악하고, 이를 고려한 설계를 진행합니다. 기둥, 내력벽 등의 제약이 있더라도 공간을 최대한 효율적으로 활용할 수 있는 대안을 제시해 드립니다. 필요시 구조 보강이나 설비 이전 등의 방법도 검토합니다.'
      }
    ]
  };

  return <ServiceDetail {...serviceData} />;
};

export default DesignInterior;
