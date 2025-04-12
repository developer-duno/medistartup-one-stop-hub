import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle, Map, PieChart, Clock, Users, Building, Calendar } from 'lucide-react';
import CustomButton from '../components/ui/CustomButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SuccessStories = () => {
  const storyCategories = ["전체", "내과", "외과", "정형외과", "피부과", "치과", "한의원"];
  
  const successStories = [
    {
      id: 1,
      title: "서울 강남 퍼스트의원 - 내과 특화 개원",
      category: "내과",
      location: "서울 강남구",
      date: "2024.01",
      image: "https://images.unsplash.com/photo-1631217868264-e6641e711e45?q=80&w=2091&auto=format&fit=crop",
      highlight: "개원 후 6개월 만에 월 매출 1억 달성, 목표 환자수 130% 달성",
      description: "강남 중심가에서 내과 특화 의원을 개원한 사례로, 최적의 입지선정부터 마케팅 전략까지 원스톱 솔루션 제공",
      experts: ["김태호 (재무 컨설팅)", "박지연 (입지 분석)", "강현우 (마케팅 전략)"],
      results: [
        "목표 매출 130% 달성",
        "월 내원 환자수 1,500명 돌파",
        "특화 클리닉을 통한 재방문율 40% 달성"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "부산 해운대 미소플러스치과 - 신규 개원",
      category: "치과",
      location: "부산 해운대구",
      date: "2023.09",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
      highlight: "구강스캐너 도입으로 디지털 진료 프로세스 구축, 개원 6개월 만에 단골 환자 500명 확보",
      description: "해운대 신규 주거단지 내 프리미엄 치과의원 개원 사례로, 디지털 장비 구성과 효율적인 인테리어 설계가 핵심",
      experts: ["이준호 (설계 및 인테리어)", "윤재호 (의료기기 구입 및 설치)", "강현우 (마케팅 전략)"],
      results: [
        "디지털 장비 도입으로 진료 시간 30% 단축",
        "개원 6개월 만에 손익분기점 도달",
        "지역 내 인지도 1위 달성"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "대전 둔산동 미래피부과 - 리모델링 및 재개원",
      category: "피부과",
      location: "대전 서구",
      date: "2023.11",
      image: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=2072&auto=format&fit=crop",
      highlight: "노후화된 기존 의원 리모델링 및 장비 교체로 월 매출 2배 성장, 신규 환자 유입 증가",
      description: "10년 이상 운영된 피부과의 리모델링 및 재개원 사례로, 최신 트렌드를 반영한 인테리어와 장비 업그레이드가 주효",
      experts: ["이준호 (설계 및 인테리어)", "윤재호 (의료기기 구입 및 설치)", "정서연 (인력 채용)"],
      results: [
        "리모델링 후 매출 120% 증가",
        "인스타그램 마케팅을 통한 20-30대 고객층 확보",
        "직원 만족도 향상으로 서비스 품질 개선"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 4,
      title: "경기 분당 연세정형외과 - 센터급 규모 개원",
      category: "정형외과",
      location: "경기 성남시 분당구",
      date: "2024.02",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop",
      highlight: "600평 규모의 정형외과 센터 성공적 오픈, 포괄적 인허가 솔루션으로 개원 일정 준수",
      description: "대형 정형외과 센터 개원 사례로, 복잡한 인허가 절차와 대규모 의료장비 도입이 주요 과제였음",
      experts: ["최민서 (인허가 대행)", "윤재호 (의료기기 구입 및 설치)", "김태호 (재무 컨설팅)"],
      results: [
        "예상 개원일정보다 20일 앞당긴 조기 개원 성공",
        "최첨단 MRI, CT 등 특수 의료장비 적기 도입",
        "첫 달 목표 환자수 150% 달성"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 5,
      title: "서울 광진구 행복한의원 - 특화 한의원 개원",
      category: "한의원",
      location: "서울 광진구",
      date: "2023.07",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop",
      highlight: "여성 특화 한의원으로 차별화, 입소문만으로도 예약 2주 대기 상태 유지",
      description: "여성 건강에 특화된 한의원 개원 사례로, 타겟 고객층에 맞춘 인테리어와 마케팅 전략이 성공 요인",
      experts: ["박지연 (입지 분석)", "이준호 (설계 및 인테리어)", "강현우 (마케팅 전략)"],
      results: [
        "개원 3개월 만에 여성고객 600명 확보",
        "미디어 인터뷰 및 지역 인지도 확보",
        "특화 프로그램 통한 재방문율 70% 달성"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 6,
      title: "인천 송도 굿모닝외과 - 신규 개원",
      category: "외과",
      location: "인천 연수구 송도동",
      date: "2023.12",
      image: "https://images.unsplash.com/photo-1516549655669-df0a58e1e03d?q=80&w=2070&auto=format&fit=crop",
      highlight: "송도 신도시 내 최적 입지 선정으로, 개원 초기부터 안정적인 환자 풀 확보",
      description: "송도 국제도시 내 외과 클리닉 개원 사례로, 외국인 환자를 위한 서비스 특화 전략이 주효",
      experts: ["박지연 (입지 분석)", "정서연 (인력 채용)", "한지민 (수납 및 의료폐기물 처리)"],
      results: [
        "외국인 환자 비중 35% 달성",
        "다국어 지원 인력 구성으로 서비스 차별화",
        "첫 해 목표 매출 110% 달성"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-secondary-100 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              병원창업 <span className="text-secondary">성공 스토리</span>
            </h1>
            <p className="font-noto text-neutral-600 mb-8">
              다양한 진료과목과 지역에서 성공적으로 개원한 병원들의 실제 사례를 통해
              병원창업의 노하우와 성공 비결을 확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
              메디스타트업의 <span className="text-secondary">창업 프로세스</span>
            </h2>
            <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
              병원 개원에 필요한 모든 과정을 체계적으로 관리하여 
              최단 기간 내 최적의 결과를 도출합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="h-12 mb-4 flex items-center">
                <Map className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-pretendard font-bold text-xl mb-3">상담 및 분석</h3>
              <p className="font-noto text-neutral-600 mb-4">
                초기 상담을 통해 요구사항을 파악하고, 빅데이터 기반 지역분석과 타당성 검토를 진행합니다.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">무료 초기 상담</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">지역 특성 및 경쟁 분석</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">예상 수익성 예측</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="h-12 mb-4 flex items-center">
                <PieChart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-pretendard font-bold text-xl mb-3">계획 수립 및 실행</h3>
              <p className="font-noto text-neutral-600 mb-4">
                최적의 전문가 팀을 구성하여 맞춤형 개원 계획을 수립하고 체계적으로 실행합니다.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">전문가 매칭 및 팀 구성</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">인테리어 및 장비 계획</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">인허가 및 행정 절차 대행</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="h-12 mb-4 flex items-center">
                <Building className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-pretendard font-bold text-xl mb-3">개원 및 사후관리</h3>
              <p className="font-noto text-neutral-600 mb-4">
                성공적인 개원 후에도 안정적인 운영을 위한 마케팅 전략과 지속적인 컨설팅을 제공합니다.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">오픈 마케팅 지원</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">운영 안정화 컨설팅</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 shrink-0" />
                  <span className="text-sm text-neutral-700">분기별 경영 분석 및 조언</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
              진료과목별 <span className="text-secondary">성공 사례</span>
            </h2>
            <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
              다양한 진료과목과 지역에서 메디스타트업과 함께 성공적으로 개원한 병원들의 실제 사례입니다.
            </p>
          </div>

          <Tabs defaultValue="전체" className="mb-8">
            <div className="overflow-x-auto pb-2">
              <TabsList className="h-auto p-1">
                {storyCategories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-4 py-2"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {storyCategories.map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {successStories
                    .filter(story => category === "전체" || story.category === category)
                    .map(story => (
                      <div 
                        key={story.id}
                        className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden group hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={story.image} 
                            alt={story.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded">
                              {story.category}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <div className="flex justify-between items-center text-xs text-white">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{story.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{story.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-pretendard font-bold text-lg text-neutral-900 mb-2">
                            {story.title}
                          </h3>
                          <p className="font-noto text-accent-700 text-sm font-medium mb-3">
                            {story.highlight}
                          </p>
                          <p className="font-noto text-neutral-600 text-sm mb-4 line-clamp-2">
                            {story.description}
                          </p>
                          
                          <div className="mb-4">
                            <p className="text-sm font-medium text-neutral-700 mb-1">참여 전문가:</p>
                            <div className="space-y-1">
                              {story.experts.map((expert, idx) => (
                                <div key={idx} className="flex items-center gap-1 text-xs text-neutral-500">
                                  <Users className="h-3 w-3" />
                                  <span>{expert}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Link
                            to={`/success-story/${story.id}`}
                            className="inline-flex items-center text-secondary hover:text-secondary-700 font-medium text-sm"
                          >
                            자세히 보기
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
                {(category === "전체" || successStories.filter(story => story.category === category).length > 3) && (
                  <div className="flex justify-center mt-8">
                    <CustomButton variant="outline">
                      더 많은 사례 보기
                    </CustomButton>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
              <span className="text-secondary">수치</span>로 보는 성공 결과
            </h2>
            <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
              메디스타트업과 함께한 병원들의 실제 성과를 확인하세요.
              데이터에 기반한 솔루션으로 가시적인 결과를 만들어냅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <p className="font-pretendard font-bold text-3xl text-secondary mb-2">32일</p>
              <p className="font-noto text-neutral-700">평균 개원기간 단축</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <p className="font-pretendard font-bold text-3xl text-secondary mb-2">1,420+</p>
              <p className="font-noto text-neutral-700">성공적인 개원 사례</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <p className="font-pretendard font-bold text-3xl text-secondary mb-2">98%</p>
              <p className="font-noto text-neutral-700">목표 대비 수익성 달성</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                <PieChart className="h-8 w-8 text-secondary" />
              </div>
              <p className="font-pretendard font-bold text-3xl text-secondary mb-2">97%</p>
              <p className="font-noto text-neutral-700">고객 만족도</p>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-200">
              <div className="md:flex justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <h3 className="font-pretendard font-bold text-xl mb-2">
                    당신의 병원이 다음 성공 사례가 될 수 있습니다
                  </h3>
                  <p className="font-noto text-neutral-600">
                    메디스타트업과 함께 성공적인 병원 창업을 시작해보세요.
                    무료 상담을 통해 첫 단계를 밟을 수 있습니다.
                  </p>
                </div>
                <div className="shrink-0">
                  <CustomButton 
                    variant="secondary" 
                    size="lg"
                    asChild
                  >
                    <Link to="/contact">무료 상담 신청하기</Link>
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;
