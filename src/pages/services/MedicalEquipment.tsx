
import React from 'react';
import { Package } from 'lucide-react';
import ServiceDetail from '../../components/ServiceDetail';

const MedicalEquipment = () => {
  const serviceData = {
    title: '의료기기 구입 및 설치',
    description: '최적의 의료장비 선정부터 설치, A/S까지 원스톱 제공하는 의료기기 구입 및 설치 서비스',
    icon: <Package className="h-12 w-12 text-primary" />,
    color: 'from-primary-100 to-primary-50',
    features: [
      {
        title: '맞춤형 장비 제안',
        description: '진료과목별 필수 장비부터 특화 장비까지 병원 규모와 예산에 맞는 최적의 장비 포트폴리오 제안'
      },
      {
        title: '가격 협상 대행',
        description: '다년간의 공급망 네트워크를 활용하여 최적의 가격으로 고품질 의료장비 구매 지원'
      },
      {
        title: '설치 및 셋업',
        description: '전문 기술진의 장비 설치 및 초기 설정, 의료진 대상 사용법 교육 제공'
      },
      {
        title: 'A/S 및 유지보수',
        description: '정기 점검 및 긴급 A/S 지원, 장비 수명 연장을 위한 최적화된 유지보수 계획 수립'
      }
    ],
    benefits: [
      '장비 구입 비용 평균 15~20% 절감',
      '의료장비 통합 관리 시스템 무상 제공',
      '24시간 긴급 기술 지원',
      '장비 업그레이드 및 교체 시 특별 할인',
      '의료장비 법정 검사 일정 관리'
    ],
    process: [
      {
        step: 1,
        title: '요구사항 분석',
        description: '진료과목, 예상 환자수, 공간, 예산 등을 고려한 맞춤형 의료장비 요구사항 분석'
      },
      {
        step: 2,
        title: '장비 제안 및 견적',
        description: '필수 장비 리스트 및 선택 장비 옵션 제안, 장비별 상세 견적 및 ROI 분석'
      },
      {
        step: 3,
        title: '계약 및 발주',
        description: '최종 장비 선정 후 계약 체결 및 발주, 납품 일정 조율'
      },
      {
        step: 4,
        title: '설치 및 교육',
        description: '전문 기술진의 장비 설치, 테스트 및 의료진 대상 사용법 교육 진행'
      },
      {
        step: 5,
        title: '사후 관리',
        description: '정기 점검 일정 수립, A/S 지원 체계 구축, 유지보수 계획 제공'
      }
    ],
    faqs: [
      {
        question: '개원 시 필요한 의료장비 리스트를 어떻게 알 수 있나요?',
        answer: '진료과목별 필수 의료장비 리스트를 제공해 드리며, 병원 규모와 특성에 맞게 맞춤 상담을 통해 최적의 장비 구성을 안내해 드립니다.'
      },
      {
        question: '의료장비 구입 시 재무적으로 유리한 방법은 무엇인가요?',
        answer: '일시 구매, 할부, 리스 등 다양한 옵션의 장단점을 비교 분석하여 병원의 재무 상황에 가장 적합한 구매 방식을 제안해 드립니다.'
      },
      {
        question: '장비 고장 시 얼마나 빨리 A/S를 받을 수 있나요?',
        answer: '서울 및 수도권 지역은 4시간 이내, 지방은 24시간 이내 기술지원이 가능하며, 중요 장비의 경우 대체 장비 임시 지원 서비스도 제공합니다.'
      },
      {
        question: '의료장비 관련 인증과 검사는 어떻게 관리되나요?',
        answer: '모든 장비의 인증 상태와 정기 검사 일정을 관리하는 시스템을 제공하며, 법정 검사 일정 알림 및 대행 서비스를 제공합니다.'
      }
    ]
  };

  return <ServiceDetail {...serviceData} />;
};

export default MedicalEquipment;
