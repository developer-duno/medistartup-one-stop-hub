
import React from 'react';
import { BarChart3 } from 'lucide-react';
import ServiceDetail from '../../components/ServiceDetail';

const FinancialConsulting = () => {
  const serviceData = {
    title: '재무 컨설팅',
    description: '초기 투자비용 산정부터 손익분기점 예측까지 맞춤형 재무 계획 서비스',
    icon: <BarChart3 className="h-12 w-12 text-secondary" />,
    color: 'from-secondary-100 to-secondary-50',
    features: [
      {
        title: '초기 투자 계획',
        description: '인테리어, 장비, 인건비 등 개원에 필요한 모든 초기 비용 항목별 상세 산출 및 최적화'
      },
      {
        title: '자금조달 컨설팅',
        description: '개인 자산, 대출, 정부 지원금 등 다양한 자금 조달 방법 분석 및 최적 포트폴리오 제안'
      },
      {
        title: '손익분기점 분석',
        description: '예상 환자 수, 평균 진료비 등을 고려한 월별/연도별 수익 예측 및 손익분기점 도출'
      },
      {
        title: '세무 전략',
        description: '의료기관 특성에 맞는 세무 전략 수립 및 세금 최적화 방안 제시'
      }
    ],
    benefits: [
      '초기 투자비용 평균 15% 절감',
      '금융 기관 대출 승인률 30% 향상',
      '세금 부담 최소화 전략',
      '예상치 못한 비용 발생 위험 감소',
      '5년 장기 재무 계획으로 안정적 경영 기반 마련'
    ],
    process: [
      {
        step: 1,
        title: '재무 현황 분석',
        description: '개인 자산 및 부채 상태, 신용도, 투자 가능 금액 등 종합적 재무 상태 분석'
      },
      {
        step: 2,
        title: '개원 비용 산출',
        description: '입지, 규모, 진료과목 등을 고려한 상세 초기 투자비용 산출'
      },
      {
        step: 3,
        title: '자금조달 계획',
        description: '최적의 자금조달 방법 제안 및 금융기관 협상 지원'
      },
      {
        step: 4,
        title: '수익 예측 모델',
        description: '지역 특성, 진료과목, 마케팅 전략 등을 고려한 월별/연도별 수익 예측 모델 수립'
      },
      {
        step: 5,
        title: '재무 계획 확정',
        description: '최종 재무 계획 수립 및 실행 가이드 제공, 정기적 모니터링 계획 수립'
      }
    ],
    faqs: [
      {
        question: '개원 시 필요한 최소 자본금은 얼마인가요?',
        answer: '진료과목, 규모, 지역에 따라 크게 달라집니다. 일반적으로 소규모 의원은 3~5억원, 중규모는 5~10억원, 대규모 또는 특수 장비가 많이 필요한 과목은 10억원 이상이 필요합니다. 정확한 금액은 상담을 통해 맞춤형으로 산출해 드립니다.'
      },
      {
        question: '대출을 통한 개원 시 주의할 점은 무엇인가요?',
        answer: '상환 계획을 명확히 세우는 것이 중요합니다. 초기 몇 개월은 수익이 안정화되지 않을 수 있으므로, 이 기간을 버틸 수 있는 운영자금을 확보해야 합니다. 또한 금리 변동에 대비한 리스크 관리 계획도 필요합니다.'
      },
      {
        question: '손익분기점에 도달하는 평균 기간은 얼마나 되나요?',
        answer: '일반적으로 6개월~1년 사이에 손익분기점에 도달하는 경우가 많지만, 진료과목과 지역에 따라 큰 차이가 있습니다. 저희 컨설팅에서는 보수적 예측과 낙관적 예측을 모두 제공하여 다양한 시나리오에 대비할 수 있도록 합니다.'
      },
      {
        question: '개원 후 재무관리는 어떻게 해야 하나요?',
        answer: '월별 수입/지출 관리, 세금 신고, 직원 급여 및 4대보험 관리 등이 필요합니다. 저희는 개원 후에도 회계/세무 전문가를 연계하여 지속적인 재무관리를 지원합니다. 또한 반기별로 재무상태 점검 및 개선방안을 제시해 드립니다.'
      }
    ]
  };

  return <ServiceDetail {...serviceData} />;
};

export default FinancialConsulting;
