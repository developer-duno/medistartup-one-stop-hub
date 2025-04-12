
import React from 'react';
import { MapPin } from 'lucide-react';
import ServiceDetail from '../../components/ServiceDetail';

const LocationAnalysis = () => {
  const serviceData = {
    title: '입지 분석',
    description: '유동인구, 경쟁 의료기관, 임대료 등을 고려한 최적 입지 선정 서비스',
    icon: <MapPin className="h-12 w-12 text-primary" />,
    color: 'from-primary-100 to-primary-50',
    features: [
      {
        title: '빅데이터 기반 분석',
        description: '인구통계, 유동인구, 지역 내 의료기관 분포 등의 빅데이터를 활용한 과학적 입지 분석'
      },
      {
        title: '경쟁 분석',
        description: '반경 내 경쟁 의료기관의 전문과목, 규모, 운영 현황 등 상세 분석으로 차별화 전략 수립'
      },
      {
        title: '접근성 평가',
        description: '대중교통, 주차 공간, 도보 접근성 등 환자 편의성 관점에서의 입지 평가'
      },
      {
        title: '미래 성장성 예측',
        description: '지역 개발 계획, 인구 변화 추이 등을 고려한 장기적 관점의 입지 가치 평가'
      }
    ],
    benefits: [
      '개원 실패 위험 최소화',
      '타깃 환자군에 최적화된 위치 선정',
      '장기적 성장 가능성 확보',
      '임대료 대비 효율성 극대화',
      '환자 접근성 향상으로 내원율 증가'
    ],
    process: [
      {
        step: 1,
        title: '요구사항 파악',
        description: '진료과목, 타깃 환자층, 예산 등 병원 개원 계획에 대한 상세 상담'
      },
      {
        step: 2,
        title: '후보지 선정',
        description: '요구사항 분석 결과를 바탕으로 3~5곳의 최적 후보지 도출'
      },
      {
        step: 3,
        title: '현장 조사',
        description: '후보지 방문 조사 및 주변 환경, 경쟁 의료기관, 유동인구 분석'
      },
      {
        step: 4,
        title: '데이터 분석',
        description: '수집된 데이터를 바탕으로 과학적 분석 및 각 후보지별 장단점 비교'
      },
      {
        step: 5,
        title: '최종 입지 제안',
        description: '최적의 입지 제안 및 해당 위치의 성공적 개원을 위한 전략 수립'
      }
    ],
    faqs: [
      {
        question: '전문과목별로 입지 선정 기준이 다른가요?',
        answer: '네, 진료과목별로 최적의 입지 조건이 상이합니다. 내과나 가정의학과는 주거 밀집 지역, 성형외과나 피부과는 상업 지구, 소아과는 신혼부부 및 젊은 가족 밀집 지역이 유리합니다. 저희는 각 진료과목별 특성을 고려한 맞춤형 입지 분석을 제공합니다.'
      },
      {
        question: '임대료가 비싸더라도 유동인구가 많은 곳이 좋을까요?',
        answer: '반드시 그렇지는 않습니다. 유동인구의 양뿐 아니라 질(연령대, 소득수준 등)을 함께 고려해야 합니다. 또한 임대료 대비 예상 수익률을 계산하여 최적의 균형점을 찾는 것이 중요합니다. 저희 분석에서는 이런 다양한 요소를 종합적으로 고려합니다.'
      },
      {
        question: '개원 예정지 주변에 동일 진료과목 병원이 있다면 피해야 하나요?',
        answer: '경쟁 병원의 존재 자체보다는 시장의 포화도를 평가하는 것이 중요합니다. 때로는 의료 클러스터가 형성된 지역이 더 많은 환자를 유치할 수 있습니다. 경쟁 병원과의 차별화 전략을 함께 수립하는 것이 핵심입니다.'
      },
      {
        question: '입지 분석에 소요되는 기간은 얼마나 되나요?',
        answer: '일반적으로 초기 상담부터 최종 보고서 제출까지 약 2~3주가 소요됩니다. 다만, 분석 지역의 범위와 요구사항의 복잡도에 따라 기간이 달라질 수 있습니다.'
      }
    ]
  };

  return <ServiceDetail {...serviceData} />;
};

export default LocationAnalysis;
