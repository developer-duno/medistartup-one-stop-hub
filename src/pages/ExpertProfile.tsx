
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, Award, CheckCircle, Calendar, Download, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import CustomButton from '../components/ui/CustomButton';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

// Expert data - this would typically come from an API/database
const expertsData = [
  {
    id: 1,
    name: '김태호',
    role: '재무 컨설턴트',
    specialty: '병원 재무설계 및 투자계획 전문',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2070&auto=format&fit=crop',
    experience: '15년+',
    projects: '320+',
    description: '서울대 의대 출신으로 병원 경영 컨설팅 15년 경력. 특히 개원의를 위한 맞춤형 재무설계와 수익성 분석에 강점이 있습니다.',
    regions: ['서울', '경기'],
    services: ['재무 컨설팅'],
    keyAchievements: [
      '의료기관 320개 이상의 재무 컨설팅 수행',
      '평균 수익성 23% 향상 달성',
      '병원 인수합병 자문 47건 성공적 완료'
    ],
    education: [
      { degree: '의학박사', institution: '서울대학교 의과대학', year: '2005' },
      { degree: 'MBA', institution: '연세대학교 경영대학원', year: '2008' }
    ],
    certifications: [
      { name: '공인회계사(CPA)', year: '2009', image: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=2673&auto=format&fit=crop' },
      { name: '의료기관 평가인증 심사위원', year: '2015', image: 'https://images.unsplash.com/photo-1569407228235-ab344a5cb904?q=80&w=2574&auto=format&fit=crop' },
      { name: '병원경영 컨설턴트 자격증', year: '2010', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop' }
    ],
    careerTimeline: [
      { year: '2010-현재', position: '대표 컨설턴트', company: '메디스타트업', description: '병원창업 및 경영 컨설팅 총괄' },
      { year: '2008-2010', position: '시니어 컨설턴트', company: '헬스케어 파트너스', description: '의료기관 재무분석 및 투자자문' },
      { year: '2005-2008', position: '전공의', company: '서울대학교병원', description: '내과 전공의 수료' }
    ],
    successCases: [
      { 
        title: '대전 365연합의원 창업 컨설팅',
        description: '처음 개원하는 내과 의사를 위한 종합 컨설팅으로, 입지선정부터 손익분기점 예측까지 지원. 개원 6개월 만에 흑자 전환 달성.',
        image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2071&auto=format&fit=crop',
        results: ['개원 6개월 만에 손익분기점 도달', '환자수 월 평균 1,200명 확보', '수익률 업계 평균 대비 18% 향상']
      },
      { 
        title: '서울 미소플러스치과 리모델링 및 재무구조 개선',
        description: '경영난을 겪던 치과의 공간활용도 개선 및 재무구조 재설계를 통해 수익성 회복.',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop',
        results: ['연간 운영비용 22% 절감', '신규 환자 유치율 35% 증가', '직원 만족도 상승으로 이직률 감소']
      },
      { 
        title: '부산 하나정형외과 확장 프로젝트',
        description: '단일 진료과에서 종합 메디컬센터로의 확장 전략 수립 및 실행 지원.',
        image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop',
        results: ['기존 대비 진료공간 3배 확장', '신규 의료장비 도입으로 진료 범위 확대', '환자 만족도 93점으로 지역 최고 수준 달성']
      }
    ],
    testimonials: [
      {
        name: '이지원 원장',
        position: '서울미소플러스치과 대표원장',
        content: '김태호 컨설턴트의 재무 분석은 정확했고, 제안한 해결책은 실용적이었습니다. 덕분에 우리 치과가 어려운 시기를 극복할 수 있었습니다.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        name: '박상현 원장',
        position: '대전365연합의원 원장',
        content: '처음 개원이라 불안했는데, 김 컨설턴트의 체계적인 재무계획 덕분에 안정적으로 병원을 운영하고 있습니다. 특히 초기 자금 조달 전략이 큰 도움이 되었습니다.',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 2,
    name: '박지연',
    role: '입지 분석가',
    specialty: '의료기관 최적 입지선정 및 상권분석',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2070&auto=format&fit=crop',
    experience: '12년+',
    projects: '280+',
    description: '빅데이터 기반 상권분석 전문가로 의료기관 특화 입지분석 모델을 개발했습니다. 대전/충남 지역 의료상권에 대한 깊은 이해를 갖고 있습니다.',
    regions: ['대전', '충남'],
    services: ['입지 분석'],
    keyAchievements: [
      '의료상권 빅데이터 분석 알고리즘 개발',
      '280개 이상의 의료기관 입지 선정',
      '평균 초기 환자유치 목표 130% 달성'
    ],
    education: [
      { degree: '도시공학 박사', institution: 'KAIST', year: '2010' },
      { degree: '통계학 석사', institution: '서울대학교', year: '2007' }
    ],
    certifications: [
      { name: '공인중개사', year: '2011', image: 'https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?q=80&w=2067&auto=format&fit=crop' },
      { name: '데이터 분석 전문가', year: '2013', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
      { name: 'GIS 전문가 자격증', year: '2012', image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=2070&auto=format&fit=crop' }
    ],
    careerTimeline: [
      { year: '2015-현재', position: '수석 분석가', company: '메디스타트업', description: '의료기관 입지 및 상권 분석 총괄' },
      { year: '2010-2015', position: '선임연구원', company: '도시연구소', description: '상권 분석 및 부동산 가치 평가' },
      { year: '2007-2010', position: '연구원', company: '한국도시계획연구원', description: '지역개발 및 도시계획 연구' }
    ],
    successCases: [
      { 
        title: '충남 아산 피부과 입지선정',
        description: '신도시 개발 지역 내 최적 입지 분석을 통해 개원 5개월 만에 목표 환자수 도달.',
        image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=2072&auto=format&fit=crop',
        results: ['개원 5개월 만에 일 평균 환자 40명 달성', '주변 경쟁업체 대비 30% 높은 환자 유입률', '환자 유치비용 절감으로 마케팅 효율성 증대']
      },
      { 
        title: '대전 둔산동 안과 최적 상권 분석',
        description: '고령인구 및 사무직 밀집 지역 분석을 통한 안과 특화 입지 선정.',
        image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2072&auto=format&fit=crop',
        results: ['개원 첫해 목표 환자수 140% 달성', '광고비 대비 환자 유치 효율 지역 평균 대비 2배', '인근 대형 주거단지 환자 점유율 45% 확보']
      },
      { 
        title: '세종시 소아청소년과 클러스터 분석',
        description: '신도시 인구 유입 패턴과 연령대별 분포를 분석하여 최적의 소아청소년과 입지 선정.',
        image: 'https://images.unsplash.com/photo-1632053001332-612e24fe8b62?q=80&w=2070&auto=format&fit=crop',
        results: ['주변 3km 내 유소아 인구 최대 밀집지역 선점', '접근성 개선으로 재방문률 85% 달성', '향후 5년간 안정적 환자 풀 확보']
      }
    ],
    testimonials: [
      {
        name: '김현우 원장',
        position: '아산미소피부과 원장',
        content: '박지연 님의 입지 분석이 없었다면 지금의 성공적인 개원은 불가능했을 것입니다. 데이터에 기반한 정확한 예측이 인상적이었습니다.',
        image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        name: '조은영 원장',
        position: '세종키즈소아과 원장',
        content: '단순히 부동산 관점이 아닌, 의료기관 특성과 환자 동선까지 고려한 분석이 큰 도움이 되었습니다. 개원 이후 예상보다 훨씬 빠르게 안정화되었습니다.',
        image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=2034&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 3,
    name: '이준호',
    role: '의료 인테리어 디자이너',
    specialty: '진료과목별 최적화 공간설계',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop',
    experience: '10년+',
    projects: '170+',
    description: '의료공간 특화 인테리어 디자이너로 환자 경험과 의료진 효율성을 모두 고려한 최적의 공간설계를 제안합니다. 다양한 진료과목별 맞춤 설계 경험이 풍부합니다.',
    regions: ['서울', '인천', '경기'],
    services: ['설계 및 인테리어'],
    keyAchievements: [
      '의료기관 170개 이상의 공간 설계 진행',
      '2023 대한민국 인테리어 대상 의료부문 수상',
      '평균 진료 효율성 27% 향상 기록'
    ],
    education: [
      { degree: '실내건축학 석사', institution: '홍익대학교', year: '2011' },
      { degree: '산업디자인학 학사', institution: '서울대학교', year: '2008' }
    ],
    certifications: [
      { name: '실내건축기사', year: '2012', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
      { name: 'EDAC 인증(증거기반디자인)', year: '2015', image: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2070&auto=format&fit=crop' },
      { name: '건축설비기사', year: '2013', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop' }
    ],
    careerTimeline: [
      { year: '2018-현재', position: '책임 디자이너', company: '메디스타트업', description: '의료공간 설계 및 인테리어 총괄' },
      { year: '2013-2018', position: '수석 디자이너', company: '힐링스페이스', description: '병원 및 의원 인테리어 설계' },
      { year: '2011-2013', position: '디자이너', company: '스페이스디자인연구소', description: '상업공간 및 의료공간 설계' }
    ],
    successCases: [
      { 
        title: '서울 강남 라인성형외과 리모델링',
        description: '환자 동선과 프라이버시를 모두 고려한 VIP 중심의 공간 설계로 고객 만족도 대폭 향상.',
        image: 'https://images.unsplash.com/photo-1629079834850-eb9ce0bc65fd?q=80&w=2070&auto=format&fit=crop',
        results: ['고객 만족도 평가 96점 달성', '수술실 회전율 35% 향상', 'VIP 고객 재방문율 22% 증가']
      },
      { 
        title: '인천 연수구 키즈플러스 소아과',
        description: '아이들이 진료를 두려워하지 않도록 테마파크형 인테리어로 설계하여 차별화.',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2067&auto=format&fit=crop',
        results: ['환자 경험 만족도 지역 최고 수준 달성', '인스타그램 해시태그 마케팅 효과 증대', '진료실 울음소리 감소로 의료진 스트레스 감소']
      },
      { 
        title: '분당 메디플러스 정형외과',
        description: '고령 환자와 재활 환자를 위한 무장애 설계와 효율적 동선 구성으로 환자 편의성 극대화.',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop',
        results: ['환자 이동 시간 평균 40% 단축', '의료사고 위험요소 제거로 안전성 증대', '층간 이동 없는 원스톱 진료 시스템 구축']
      }
    ],
    testimonials: [
      {
        name: '김주연 원장',
        position: '라인성형외과 대표원장',
        content: '이준호 디자이너님은 제가 말하지 않은 니즈까지 파악해 공간에 반영해주셨습니다. 환자들이 인테리어를 보고 신뢰감이 생긴다고 자주 말합니다.',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1974&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        name: '박원장 원장',
        position: '키즈플러스소아과 원장',
        content: '아이들이 병원에 오는 것을 즐거워합니다. 치료의 두려움을 감소시키는 디자인에 큰 감동을 받았습니다. 개원 후 입소문만으로도 환자가 꾸준히 늘고 있습니다.',
        image: 'https://images.unsplash.com/photo-1603778607817-3aaf99b7252e?q=80&w=2071&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 4,
    name: '최민서',
    role: '인허가 전문가',
    specialty: '의료기관 인허가 및 행정절차 대행',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    experience: '14년+',
    projects: '250+',
    description: '복잡한 의료기관 인허가 절차를 신속하고 정확하게 처리합니다. 각종 규제와 법률 변화에 즉각 대응하여 개원 지연 리스크를 최소화합니다.',
    regions: ['서울', '경기', '인천', '대전'],
    services: ['인허가 대행'],
    keyAchievements: [
      '평균 인허가 처리 기간 32일 단축',
      '250개 이상 의료기관 인허가 성공적 완료',
      '인허가 관련 행정처분 제로 기록'
    ],
    education: [
      { degree: '법학 석사', institution: '고려대학교', year: '2007' },
      { degree: '행정학 학사', institution: '연세대학교', year: '2004' }
    ],
    certifications: [
      { name: '변호사 자격증', year: '2009', image: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?q=80&w=2071&auto=format&fit=crop' },
      { name: '공인행정사', year: '2010', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop' },
      { name: '보건의료법 전문 자격', year: '2012', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop' }
    ],
    careerTimeline: [
      { year: '2016-현재', position: '수석 컨설턴트', company: '메디스타트업', description: '의료기관 인허가 및 규제 대응 총괄' },
      { year: '2009-2016', position: '변호사', company: '법무법인 헬스로', description: '의료법 전문 변호사' },
      { year: '2007-2009', position: '행정주사', company: '보건복지부', description: '의료기관 정책 및 관리 업무' }
    ],
    successCases: [
      { 
        title: '서울 강남구 종합검진센터 인허가',
        description: '특수의료장비 도입에 필요한 복잡한 인허가 절차를 조기에 완료하여 개원 일정 준수.',
        image: 'https://images.unsplash.com/photo-1631217868264-e6641e711e45?q=80&w=2091&auto=format&fit=crop',
        results: ['예정보다 45일 빠른 인허가 완료', '특수의료장비 5종 적법 설치 인증', '개원 초기 행정처분 리스크 제거']
      },
      { 
        title: '인천 요양병원 설립 인허가',
        description: '대규모 요양병원 설립을 위한 복합적 인허가 프로세스를 원스톱으로 처리.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
        results: ['100병상 규모 요양병원 성공적 인허가', '소방, 위생, 의료법 통합 인허가 일괄 처리', '시설 기준 완벽 충족으로 재검사 불필요']
      },
      { 
        title: '의정부시 재활의학과 개설',
        description: '특수재활치료실 설치 관련 까다로운 법적 요건을 충족시켜 차질 없이 개원.',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2232&auto=format&fit=crop',
        results: ['재활의학과 특수장비 12종 인허가 완료', '의료인력 자격 검증 및 등록 원스톱 처리', '치료실별 안전기준 100% 충족']
      }
    ],
    testimonials: [
      {
        name: '김준혁 원장',
        position: '강남에이스검진센터 대표원장',
        content: '최민서 변호사님의 전문성 덕분에 복잡한 인허가 과정을 생각보다 훨씬 수월하게 진행했습니다. 개원 일정을 앞당길 수 있어 큰 도움이 되었습니다.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        name: '이상철 이사장',
        position: '인천실버케어 요양병원장',
        content: '100병상 규모의 요양병원 인허가는 매우 복잡한 과정인데, 최 변호사님의 체계적인 프로세스 덕분에 예상보다 빠르게 모든 절차를 마칠 수 있었습니다.',
        image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 5,
    name: '정서연',
    role: '의료인력 채용 전문가',
    specialty: '병원 맞춤형 인력 구성 및 채용',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1529651737248-dad5e287768e?q=80&w=2001&auto=format&fit=crop',
    experience: '9년+',
    projects: '210+',
    description: '의료기관별 최적의 인력 구조를 설계하고 적합한 인재를 매칭합니다. 장기적인 인력 안정성과 팀워크를 고려한 채용 솔루션을 제공합니다.',
    regions: ['서울', '경기', '대전', '충남'],
    services: ['인력 채용'],
    keyAchievements: [
      '의료기관 210개 이상의 인력 구성 및 채용 지원',
      '간호사 이직률 업계 평균 대비 35% 감소',
      '채용 후 6개월 내 퇴직률 8% 이하 유지'
    ],
    education: [
      { degree: '인사관리 석사', institution: '경희대학교', year: '2012' },
      { degree: '간호학 학사', institution: '서울대학교', year: '2008' }
    ],
    certifications: [
      { name: 'PHR(전문인사관리자)', year: '2014', image: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?q=80&w=2070&auto=format&fit=crop' },
      { name: '간호사 면허증', year: '2008', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Healthcare Recruiter Certification', year: '2016', image: 'https://images.unsplash.com/photo-1462206092226-f46b3a9a4135?q=80&w=2073&auto=format&fit=crop' }
    ],
    careerTimeline: [
      { year: '2017-현재', position: '인력채용 총괄', company: '메디스타트업', description: '의료기관 인력 설계 및 채용 솔루션 제공' },
      { year: '2012-2017', position: 'HR 컨설턴트', company: '헬스케어 인재뱅크', description: '의료기관 특화 채용 및 인력 관리' },
      { year: '2008-2012', position: '수간호사', company: '서울아산병원', description: '중환자실 인력관리 및 교육 담당' }
    ],
    successCases: [
      { 
        title: '대전 유성 종합병원 간호인력 구성',
        description: '신설 종합병원의 최적 간호인력 비율 설계 및 채용을 통한 안정적 운영 지원.',
        image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2070&auto=format&fit=crop',
        results: ['간호인력 이직률 업계 평균 대비 47% 감소', '신규 간호사 조기 적응 프로그램으로 업무 숙련도 향상', '환자 만족도 조사 간호 부문 92점 달성']
      },
      { 
        title: '분당 라이프치과 인력 구조조정',
        description: '비효율적 인력구조 개선을 통한 인건비 절감 및 서비스 품질 향상.',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop',
        results: ['인건비 22% 절감하면서 서비스 품질 유지', '부서별 적정 인력 재배치로 효율성 증대', '직원 만족도 조사 점수 상승']
      },
      { 
        title: '서울 반도정형외과 전문 인력 채용',
        description: '희소성 높은 재활치료사 및 특수 간호인력 채용으로 차별화된 서비스 제공.',
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2087&auto=format&fit=crop',
        results: ['전문 재활치료사 8명 성공적 채용', '특수 간호 인력 정착률 90% 이상 달성', '환자별 맞춤 케어 시스템 구축으로 재방문율 증가']
      }
    ],
    testimonials: [
      {
        name: '김병철 원장',
        position: '유성종합병원 병원장',
        content: '정서연 매니저님은 단순히 인력을 소개하는 것이 아니라, 병원의 비전과 문화에 맞는 인재를 발굴해주셨습니다. 특히 간호인력의 장기근속률이 크게 향상되었습니다.',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        name: '이미경 실장',
        position: '라이프치과 실장',
        content: '인력 구조조정은 항상 어려운 과제인데, 정서연 전문가의 객관적인 분석과 단계적 접근으로 직원들의 저항 없이 성공적으로 변화할 수 있었습니다.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 6,
    name: '강현우',
    role: '의료 마케팅 전문가',
    specialty: '디지털 마케팅 및 환자 유치 전략',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop',
    experience: '11년+',
    projects: '190+',
    description: '의료기관 특화 디지털 마케팅 전략 수립 및 실행 전문가입니다. 지역 타겟팅과 진료과목별 특성을 고려한 효과적인 환자 유치 방안을 제시합니다.',
    regions: ['서울', '경기', '부산'],
    services: ['마케팅 전략'],
    keyAchievements: [
      '의료기관 190개 이상의 마케팅 전략 수립',
      '평균 신규환자 유입 38% 증가 달성',
      '온라인 예약 전환율 업계 평균 대비 2.4배 향상'
    ],
    education: [
      { degree: '경영학 석사(마케팅 전공)', institution: '서울대학교', year: '2011' },
      { degree: '디지털미디어학 학사', institution: '연세대학교', year: '2008' }
    ],
    certifications: [
      { name: 'Google 애널리틱스 공인전문가', year: '2013', image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2094&auto=format&fit=crop' },
      { name: '디지털마케팅 전문가', year: '2015', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
      { name: 'Facebook Blueprint 인증', year: '2016', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop' }
    ],
    careerTimeline: [
      { year: '2019-현재', position: '마케팅 총괄', company: '메디스타트업', description: '의료기관 디지털 마케팅 전략 수립 및 실행' },
      { year: '2014-2019', position: '디지털마케팅 이사', company: '헬스케어 마케팅 그룹', description: '의료분야 온라인 마케팅 및 브랜딩' },
      { year: '2011-2014', position: '마케팅 매니저', company: '구글 코리아', description: '헬스케어 산업 검색광고 및 분석 담당' }
    ],
    successCases: [
      { 
        title: '서울 압구정 에스라인 성형외과 브랜딩',
        description: '차별화된 디지털 콘텐츠 전략으로 국내외 고객 유치 성공.',
        image: 'https://images.unsplash.com/photo-1576091160550-bdfa8387fabb?q=80&w=2070&auto=format&fit=crop',
        results: ['해외 환자 예약 68% 증가', '인스타그램 팔로워 1년 내 15만 달성', '온라인 컨설팅 전환율 42% 향상']
      },
      { 
        title: '부산 해운대 연세치과 지역 마케팅',
        description: '지역 기반 타겟팅과 리마케팅을 활용한 효율적 환자 유치 전략.',
        image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2074&auto=format&fit=crop',
        results: ['신규 환자 월 평균 37% 증가', '광고비 대비 환자 유치 비용 28% 절감', '기존 환자 재방문율 45% 증가']
      },
      { 
        title: '분당 미소플러스 소아과 엄마 커뮤니티 마케팅',
        description: '엄마 커뮤니티 타겟팅과 교육 콘텐츠 마케팅으로 신뢰 기반 환자 유치.',
        image: 'https://images.unsplash.com/photo-1535615615570-11b13a12ffe8?q=80&w=1974&auto=format&fit=crop',
        results: ['블로그 교육 콘텐츠 월 평균 10만 뷰 달성', '지역 맘카페 인지도 1위 달성', '신규 환자의 68%가 온라인 추천을 통해 방문']
      }
    ],
    testimonials: [
      {
        name: '박서진 원장',
        position: '에스라인 성형외과 대표원장',
        content: '강현우 마케터님의 글로벌 디지털 마케팅 전략 덕분에 외국인 환자 비율이 크게 늘었습니다. 특히 데이터 기반의 접근방식이 인상적이었습니다.',
        image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        name: '김혜진 원장',
        position: '미소플러스 소아과 원장',
        content: '단순히 광고가 아닌, 부모들에게 실질적으로 도움이 되는 콘텐츠로 신뢰를 쌓는 전략이 매우 효과적이었습니다. 마케팅 비용 대비 효율이 훨씬 높았습니다.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 7,
    name: '윤재호',
    role: '의료기기 컨설턴트',
    specialty: '진료과목별 최적 장비 구성 및 설치',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop',
    experience: '13년+',
    projects: '230+',
    description: '의료기관별 최적의 의료장비 구성과 효율적인 도입 방안을 제시합니다. 비용 대비 성능을 고려한 장비 선정과 공간 효율적 배치 설계를 전문으로 합니다.',
    regions: ['서울', '경기', '대전', '부산'],
    services: ['의료기기 구입 및 설치'],
    keyAchievements: [
      '의료기관 230개 이상의 의료장비 컨설팅',
      '평균 장비 투자 대비 수익률 28% 향상',
      '의료장비 초기 투자비용 평균 15% 절감'
    ],
    education: [
      { degree: '의공학 석사', institution: 'KAIST', year: '2009' },
      { degree: '전자공학 학사', institution: '서울대학교', year: '2006' }
    ],
    certifications: [
      { name: '의료기기 RA 전문가', year: '2011', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop' },
      { name: '의료장비 관리사', year: '2013', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Healthcare Technology Manager', year: '2015', image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop' }
    ],
    careerTimeline: [
      { year: '2018-현재', position: '의료기기 컨설턴트', company: '메디스타트업', description: '의료장비 컨설팅 총괄' },
      { year: '2012-2018', position: '기술이사', company: '삼성메디슨', description: '의료영상장비 기술 및 영업 지원' },
      { year: '2009-2012', position: '임상응용 연구원', company: 'GE Healthcare', description: '의료장비 임상적용 및 사용자 교육' }
    ],
    successCases: [
      { 
        title: '서울 신사동 고려영상의학과 장비 구성',
        description: '공간 효율성과 진단 정확도를 모두 고려한 최적의 영상장비 구성 및 배치.',
        image: 'https://images.unsplash.com/photo-1516549655669-df0a58e1e03d?q=80&w=2070&auto=format&fit=crop',
        results: ['초기 장비 투자비용 18% 절감', 'MRI, CT 검사 회전율 40% 향상', '영상장비 유지보수 비용 연간 22% 절감']
      },
      { 
        title: '대전 한빛치과 디지털 장비 도입',
        description: '최신 디지털 치과장비 통합 시스템 구축으로 진료 효율성 극대화.',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop',
        results: ['환자 대기시간 평균 37% 단축', '디지털 장비 통합으로 진단 정확도 향상', '장비 교체 로드맵 수립으로 장기적 비용 최적화']
      },
      { 
        title: '분당 미래여성병원 산부인과 장비 구성',
        description: '산부인과 특화 의료장비 구성과 효율적 공간 배치로 환자 만족도 향상.',
        image: 'https://images.unsplash.com/photo-1588776814827-da3a53d8e444?q=80&w=2070&auto=format&fit=crop',
        results: ['4D 초음파 등 첨단장비 도입으로 환자 유치 증가', '진료실별 최적 장비 배치로 의료진 피로도 감소', '환자 동선 고려한 장비 배치로 만족도 향상']
      }
    ],
    testimonials: [
      {
        name: '김영철 원장',
        position: '고려영상의학과 대표원장',
        content: '윤재호 컨설턴트의 조언으로 최적의 장비를 효율적인 가격에 구매할 수 있었습니다. 특히 공간 제약 상황에서 최대 효율을 내는 장비 배치가 인상적이었습니다.',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1974&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        name: '박미영 원장',
        position: '미래여성병원 원장',
        content: '임신부 친화적인 장비 구성과 배치에 대한 전문적 조언이 매우 유용했습니다. 환자들의 만족도가 크게 향상되었고 불필요한 장비 투자를 줄일 수 있었습니다.',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 8,
    name: '한지민',
    role: '의료폐기물 관리 전문가',
    specialty: '의료폐기물 처리 및 수납 시스템 구축',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop',
    experience: '8년+',
    projects: '160+',
    description: '의료기관의 효율적인 수납 시스템 구축 및 의료폐기물 관리 솔루션을 제공합니다. 비용 절감과 환경 규제 준수를 모두 고려한 최적의 방안을 제시합니다.',
    regions: ['서울', '경기', '인천', '대전', '충남', '부산'],
    services: ['수납 및 의료폐기물 처리'],
    keyAchievements: [
      '의료기관 160개 이상의 폐기물 관리 시스템 구축',
      '폐기물 처리 비용 평균 24% 절감',
      '환경 규제 준수율 100% 달성'
    ],
    education: [
      { degree: '환경공학 석사', institution: '연세대학교', year: '2013' },
      { degree: '보건학 학사', institution: '고려대학교', year: '2010' }
    ],
    certifications: [
      { name: '의료폐기물 관리사', year: '2015', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop' },
      { name: '보건관리자', year: '2014', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop' },
      { name: '환경컨설턴트 자격증', year: '2016', image: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop' }
    ],
    careerTimeline: [
      { year: '2019-현재', position: '폐기물관리 전문가', company: '메디스타트업', description: '의료기관 폐기물 및 수납 시스템 컨설팅' },
      { year: '2015-2019', position: '매니저', company: '그린메디컬', description: '의료폐기물 수거 및 처리 관리' },
      { year: '2013-2015', position: '컨설턴트', company: '환경관리공단', description: '의료기관 환경규제 준수 자문' }
    ],
    successCases: [
      { 
        title: '서울 강남 세브란스병원 폐기물 관리 시스템 개선',
        description: '대형병원의 복잡한 의료폐기물 처리 프로세스 최적화 및 비용 절감.',
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2087&auto=format&fit=crop',
        results: ['폐기물 처리 비용 연간 3200만원 절감', '폐기물 분리수거 효율 38% 향상', '환경규제 위반 리스크 제로화']
      },
      { 
        title: '인천 나은병원 통합 수납 시스템 구축',
        description: '환자 편의성과 행정 효율성을 모두 고려한 통합 수납 시스템 설계.',
        image: 'https://images.unsplash.com/photo-1516549655669-df0a58e1e03d?q=80&w=2070&auto=format&fit=crop',
        results: ['환자 수납 대기시간 평균 64% 단축', '수납 오류율 95% 감소', '직원 업무 효율성 향상으로 인력비용 절감']
      },
      { 
        title: '대전 연합정형외과 친환경 폐기물 관리',
        description: '친환경적이면서 비용 효율적인 의료폐기물 처리 시스템 구축.',
        image: 'https://images.unsplash.com/photo-1592671748854-2e2bf1f8f6c3?q=80&w=2070&auto=format&fit=crop',
        results: ['폐기물 처리비용 연간 27% 절감', '탄소발자국 감소로 병원 이미지 향상', '재활용 비율 42% 향상으로 환경 기여']
      }
    ],
    testimonials: [
      {
        name: '김성준 부원장',
        position: '세브란스병원 부원장',
        content: '한지민 전문가의 체계적인 폐기물 관리 시스템 덕분에 비용 절감과 환경 규제 준수를 동시에 달성할 수 있었습니다. 특히 직원들의 참여도를 높이는 교육 프로그램이 효과적이었습니다.',
        image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        name: '이현우 원장',
        position: '나은병원 원장',
        content: '수납 시스템 개선으로 환자들의 대기시간이 크게 줄었고, 직원들의 업무 스트레스도 감소했습니다. 초기 투자비용 대비 효율성 향상 효과가 매우 컸습니다.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  }
];

const ExpertProfile = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    // In a real application, you would fetch the expert data from an API
    // For now, we'll simulate a fetch with setTimeout
    setIsLoading(true);
    setTimeout(() => {
      const foundExpert = expertsData.find(exp => exp.id === Number(id));
      setExpert(foundExpert);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">전문가를 찾을 수 없습니다</h1>
        <Link to="/" className="text-primary hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      {/* Hero Section with Cover Image */}
      <section className="relative h-[50vh] min-h-[300px] bg-gradient-to-r from-primary-700 to-primary-900 overflow-hidden">
        {expert.coverImage && (
          <div className="absolute inset-0 z-10">
            <img 
              src={expert.coverImage} 
              alt={expert.name} 
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70 z-20"></div>
        
        <div className="container mx-auto px-4 relative z-30 h-full flex flex-col justify-end pb-10">
          <Link to="/#experts" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            모든 전문가 보기
          </Link>
          
          <div className="flex items-end gap-6">
            <div className="hidden md:block relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={expert.image} 
                alt={expert.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {expert.services.map((service, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                    {service}
                  </Badge>
                ))}
              </div>
              
              <h1 className="font-pretendard font-bold text-3xl md:text-4xl text-white mb-1">
                {expert.name}
              </h1>
              
              <p className="font-noto text-white/90 text-lg mb-4">
                {expert.role} · {expert.specialty}
              </p>
              
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <span className="block font-pretendard font-bold text-white text-center">
                    {expert.experience}
                  </span>
                  <span className="text-xs text-white/80">경력</span>
                </div>
                
                <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <span className="block font-pretendard font-bold text-white text-center">
                    {expert.projects}
                  </span>
                  <span className="text-xs text-white/80">프로젝트</span>
                </div>
                
                <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <span className="block font-pretendard font-bold text-white text-center">
                    {expert.regions.join(', ')}
                  </span>
                  <span className="text-xs text-white/80">활동 지역</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Navigation */}
      <div className="sticky top-0 bg-white z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 md:gap-6">
            <button 
              onClick={() => setSelectedTab("overview")}
              className={`py-4 px-1 font-medium whitespace-nowrap border-b-2 transition-colors ${
                selectedTab === "overview" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              프로필 개요
            </button>
            
            <button 
              onClick={() => setSelectedTab("timeline")}
              className={`py-4 px-1 font-medium whitespace-nowrap border-b-2 transition-colors ${
                selectedTab === "timeline" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              경력 및 학위
            </button>
            
            <button 
              onClick={() => setSelectedTab("cases")}
              className={`py-4 px-1 font-medium whitespace-nowrap border-b-2 transition-colors ${
                selectedTab === "cases" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              성공 사례
            </button>
            
            <button 
              onClick={() => setSelectedTab("testimonials")}
              className={`py-4 px-1 font-medium whitespace-nowrap border-b-2 transition-colors ${
                selectedTab === "testimonials" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              추천사 및 후기
            </button>
            
            <button 
              onClick={() => setSelectedTab("contact")}
              className={`py-4 px-1 font-medium whitespace-nowrap border-b-2 transition-colors ${
                selectedTab === "contact" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              상담 및 예약
            </button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        {/* Overview Tab Content */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="font-pretendard font-bold text-2xl mb-4">전문가 소개</h2>
                <p className="font-noto text-neutral-700 leading-relaxed">
                  {expert.description}
                </p>
              </section>
              
              <section>
                <h2 className="font-pretendard font-bold text-2xl mb-4">핵심 성과</h2>
                <div className="space-y-3">
                  {expert.keyAchievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-noto text-neutral-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="font-pretendard font-bold text-2xl mb-4">자격증 및 인증</h2>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {expert.certifications.map((cert, idx) => (
                      <CarouselItem key={idx} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="rounded-xl overflow-hidden bg-white border border-neutral-200 h-full"
                        >
                          <div className="h-40 bg-neutral-100">
                            {cert.image && (
                              <img
                                src={cert.image}
                                alt={cert.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-pretendard font-medium text-lg mb-1">{cert.name}</h3>
                            <p className="text-neutral-500 text-sm">취득연도: {cert.year}</p>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-end gap-2 mt-4">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              </section>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-pretendard font-bold text-lg mb-4">상담 및 예약하기</h3>
                  <div className="space-y-4">
                    <CustomButton 
                      variant="primary" 
                      fullWidth
                      className="flex justify-center items-center gap-2"
                    >
                      <Calendar className="h-5 w-5" />
                      상담 예약하기
                    </CustomButton>
                    
                    <CustomButton 
                      variant="outline" 
                      fullWidth
                      className="flex justify-center items-center gap-2"
                    >
                      <Download className="h-5 w-5" />
                      전문가 소개서 다운로드
                    </CustomButton>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 px-6 py-4">
                  <h4 className="font-pretendard font-medium text-neutral-900 mb-4">
                    연락처 정보
                  </h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-neutral-500" />
                      <span>대전광역시 서구 둔산동 1363 메디컬타워 8층</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-neutral-500" />
                      <span>042-123-4567</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-neutral-500" />
                      <span>contact@medistartup.kr</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="font-pretendard font-bold text-lg mb-4">전문 분야</h3>
                <div className="space-y-3">
                  {expert.services.map((service, idx) => (
                    <Badge key={idx} className="mr-2 mb-2">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="font-pretendard font-bold text-lg mb-4">활동 지역</h3>
                <div className="space-y-3">
                  {expert.regions.map((region, idx) => (
                    <Badge key={idx} variant="outline" className="mr-2 mb-2">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Timeline Tab Content */}
        {selectedTab === "timeline" && (
          <div className="max-w-3xl mx-auto">
            <h2 className="font-pretendard font-bold text-2xl mb-6">경력 타임라인</h2>
            
            <div className="relative border-l-2 border-primary/30 pl-8 pb-8">
              {expert.careerTimeline.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="mb-10 relative"
                >
                  <div className="absolute -left-10 w-5 h-5 rounded-full bg-primary border-4 border-white"></div>
                  <div className="absolute -left-[2.8rem] top-0 h-full border-l-2 border-primary/30"></div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-pretendard font-bold text-xl mb-1">{item.position}</h3>
                    <p className="text-neutral-600 mb-3">{item.company}</p>
                    <p className="text-neutral-700">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <h2 className="font-pretendard font-bold text-2xl mb-6 mt-12">학력 및 자격</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="font-pretendard font-bold text-xl mb-4">학력</h3>
                <div className="space-y-4">
                  {expert.education.map((edu, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="border-l-2 border-secondary pl-4 py-1"
                    >
                      <p className="font-pretendard font-medium text-lg">{edu.degree}</p>
                      <p className="text-neutral-600">{edu.institution}, {edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="font-pretendard font-bold text-xl mb-4">자격증</h3>
                <div className="space-y-4">
                  {expert.certifications.map((cert, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="border-l-2 border-accent pl-4 py-1"
                    >
                      <p className="font-pretendard font-medium text-lg">{cert.name}</p>
                      <p className="text-neutral-600">취득연도: {cert.year}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Success Cases Tab Content */}
        {selectedTab === "cases" && (
          <div>
            <h2 className="font-pretendard font-bold text-2xl mb-6">성공 사례</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expert.successCases.map((caseItem, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-pretendard font-bold text-lg mb-2">{caseItem.title}</h3>
                    <p className="text-neutral-600 mb-4 flex-1">{caseItem.description}</p>
                    
                    <div>
                      <h4 className="font-pretendard font-medium text-sm text-neutral-500 mb-2">주요 성과:</h4>
                      <ul className="space-y-1">
                        {caseItem.results.map((result, resultIdx) => (
                          <li key={resultIdx} className="flex items-start gap-2 text-neutral-700 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-10">
              <CustomButton variant="outline">
                더 많은 성공 사례 보기
              </CustomButton>
            </div>
          </div>
        )}
        
        {/* Testimonials Tab Content */}
        {selectedTab === "testimonials" && (
          <div>
            <h2 className="font-pretendard font-bold text-2xl mb-6">고객 추천사 및 후기</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {expert.testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-pretendard font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-neutral-600 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-neutral-700 italic mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="aspect-video rounded-lg overflow-hidden bg-neutral-100">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={testimonial.video}
                      title={`${testimonial.name} 추천영상`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-primary-50 rounded-xl p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="font-pretendard font-bold text-xl md:text-2xl text-primary-900 mb-2">
                    다른 고객들의 후기 확인하기
                  </h3>
                  <p className="text-primary-800/80">
                    실제 고객들의 솔직한 후기를 통해 {expert.name} 전문가의 전문성과 서비스 품질을 확인해보세요.
                  </p>
                </div>
                
                <CustomButton variant="primary" className="md:flex-shrink-0">
                  모든 후기 보기 <ExternalLink className="h-4 w-4" />
                </CustomButton>
              </div>
            </div>
          </div>
        )}
        
        {/* Contact Tab Content */}
        {selectedTab === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="font-pretendard font-bold text-2xl mb-6">상담 예약하기</h2>
              
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-noto text-sm text-neutral-700 mb-1">
                        이름 *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        placeholder="홍길동"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block font-noto text-sm text-neutral-700 mb-1">
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        placeholder="010-1234-5678"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block font-noto text-sm text-neutral-700 mb-1">
                      이메일
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      placeholder="example@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-noto text-sm text-neutral-700 mb-1">
                      상담 희망 날짜 *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block font-noto text-sm text-neutral-700 mb-1">
                      상담 희망 시간 *
                    </label>
                    <select
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    >
                      <option value="">선택해주세요</option>
                      <option>오전 10:00</option>
                      <option>오전 11:00</option>
                      <option>오후 1:00</option>
                      <option>오후 2:00</option>
                      <option>오후 3:00</option>
                      <option>오후 4:00</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block font-noto text-sm text-neutral-700 mb-1">
                      상담 내용
                    </label>
                    <textarea
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 min-h-[120px]"
                      placeholder="상담 받고 싶으신 내용을 간략히 적어주세요."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary-300"
                        required
                      />
                    </div>
                    <label className="ml-2 font-noto text-sm text-neutral-600">
                      개인정보 수집 및 이용에 동의합니다. *
                    </label>
                  </div>
                  
                  <CustomButton 
                    type="submit" 
                    variant="accent" 
                    fullWidth
                  >
                    상담 예약하기
                  </CustomButton>
                </form>
              </div>
            </div>
            
            <div>
              <h2 className="font-pretendard font-bold text-2xl mb-6">전문가 정보</h2>
              
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={expert.image} 
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-pretendard font-bold text-xl">{expert.name}</h3>
                    <p className="text-neutral-600">{expert.role} · {expert.services.join(', ')}</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-neutral-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-neutral-900">오시는 길</p>
                      <p className="text-neutral-600 text-sm">대전광역시 서구 둔산동 1363 메디컬타워 8층</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-neutral-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-neutral-900">전화번호</p>
                      <p className="text-neutral-600 text-sm">042-123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-neutral-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-neutral-900">이메일</p>
                      <p className="text-neutral-600 text-sm">contact@medistartup.kr</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden h-[200px] bg-neutral-100">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Map+Image" 
                    alt="오시는 길" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="font-pretendard font-bold text-lg mb-4">자료 다운로드</h3>
                
                <div className="space-y-3">
                  <CustomButton variant="outline" fullWidth className="justify-start">
                    <Download className="h-5 w-5 mr-2" />
                    전문가 소개서.pdf
                  </CustomButton>
                  
                  <CustomButton variant="outline" fullWidth className="justify-start">
                    <Download className="h-5 w-5 mr-2" />
                    성공사례 모음집.pdf
                  </CustomButton>
                  
                  <CustomButton variant="outline" fullWidth className="justify-start">
                    <Download className="h-5 w-5 mr-2" />
                    전문 분야 소개자료.pdf
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpertProfile;
