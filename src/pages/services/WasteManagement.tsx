
import React from 'react';
import { Trash2 } from 'lucide-react';
import ServiceDetail from '../../components/ServiceDetail';

const WasteManagement = () => {
  const serviceData = {
    title: '수납 및 의료폐기물 처리',
    description: '효율적인 수납 시스템 구축과 안전한 의료폐기물 처리를 위한 원스톱 솔루션',
    icon: <Trash2 className="h-12 w-12 text-secondary" />,
    color: 'from-secondary-100 to-secondary-50',
    features: [
      {
        title: '수납 시스템 구축',
        description: '병원 규모와 특성에 맞는 최적의 수납 시스템 설계 및 구축, POS 연동 및 카드 결제 시스템 통합'
      },
      {
        title: '의료폐기물 처리 계약',
        description: '지역별 최적의 의료폐기물 처리 업체 선정 및 계약 대행, 법적 요건 충족 보증'
      },
      {
        title: '폐기물 분리배출 시스템',
        description: '효율적이고 안전한 의료폐기물 분리배출 시스템 설계 및 교육 프로그램 제공'
      },
      {
        title: '비용 최적화',
        description: '수납 및 폐기물 처리 비용 분석 및 최적화 전략 수립, 지속적인 비용 모니터링'
      }
    ],
    benefits: [
      '의료폐기물 처리 비용 평균 12% 절감',
      '수납 오류 70% 감소, 환자 대기시간 40% 단축',
      '폐기물 관련 법적 위험 최소화',
      '친환경 의료기관 인증 취득 지원',
      '온라인 결제 및 모바일 수납 시스템 구축'
    ],
    process: [
      {
        step: 1,
        title: '현황 분석',
        description: '병원 규모, 진료과목별 발생 폐기물 특성 분석, 수납 프로세스 진단'
      },
      {
        step: 2,
        title: '최적 시스템 설계',
        description: '맞춤형 수납 시스템 및 의료폐기물 관리 계획 수립'
      },
      {
        step: 3,
        title: '서비스 업체 선정',
        description: '지역별 최적 폐기물 처리 업체 비교 및 선정, 계약 조건 협상'
      },
      {
        step: 4,
        title: '시스템 구축 및 교육',
        description: '수납 시스템 설치 및 직원 교육, 폐기물 분리배출 시스템 구축'
      },
      {
        step: 5,
        title: '모니터링 및 개선',
        description: '정기적인 모니터링 및 성과 분석, 시스템 개선 및 최적화'
      }
    ],
    faqs: [
      {
        question: '의료폐기물 처리 관련 법적 요건은 어떻게 되나요?',
        answer: '의료폐기물은 「폐기물관리법」 및 「의료폐기물 관리법규」에 따라 엄격히 관리됩니다. 저희 서비스는 최신 법규를 반영한 관리 시스템을 제공하여 법적 요건을 100% 충족시킵니다.'
      },
      {
        question: '수납 시스템은 기존 EMR과 연동이 가능한가요?',
        answer: '네, 대부분의 주요 EMR 시스템과 연동 가능한 수납 솔루션을 제공합니다. 이를 통해 진료 기록부터 수납까지 원활한 데이터 흐름을 보장합니다.'
      },
      {
        question: '의료폐기물 처리 비용은 어떻게 결정되나요?',
        answer: '폐기물 종류, 발생량, 지역, 수거 주기 등에 따라 결정됩니다. 여러 업체와의 협상을 통해 최적의 가격으로 계약을 체결해 드립니다.'
      },
      {
        question: '직원들을 위한 폐기물 분리배출 교육도 제공되나요?',
        answer: '네, 모든 의료진과 직원을 대상으로 올바른 폐기물 분리배출 교육을 제공하며, 시각적 가이드라인과 포스터도 함께 제공합니다.'
      }
    ]
  };

  return <ServiceDetail {...serviceData} />;
};

export default WasteManagement;
