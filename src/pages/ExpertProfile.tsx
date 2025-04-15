
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, Award, CheckCircle, Calendar, Download, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import CustomButton from '../components/ui/CustomButton';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useExperts } from '@/contexts/ExpertsContext';
import { useToast } from '@/components/ui/use-toast';

const ExpertProfile = () => {
  const { id } = useParams();
  const { getExpertById } = useExperts();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expert, setExpert] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    setIsLoading(true);
    
    const expertId = Number(id);
    if (isNaN(expertId)) {
      toast({
        title: "오류",
        description: "잘못된 전문가 ID입니다.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    const expertData = getExpertById(expertId);
    
    if (expertData) {
      setExpert(expertData);
    } else {
      toast({
        title: "전문가를 찾을 수 없습니다",
        description: "요청하신 전문가 정보를 찾을 수 없습니다.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  }, [id, getExpertById, navigate, toast]);

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

  // Convert string achievements to array if needed
  const keyAchievements = expert.keyAchievements || 
    (expert.achievements ? expert.achievements.split('\n').filter(Boolean) : []);

  // Default placeholders for missing data
  const defaultEducation = expert.educationHistory || 
    (expert.education ? [{ degree: expert.education, institution: '', year: '' }] : []);

  const defaultCareerTimeline = expert.careerTimeline || 
    [{ year: expert.experience, position: expert.role, company: '', description: expert.specialty }];

  const defaultSuccessCases = expert.successCases || [];
  
  const defaultTestimonials = expert.testimonials || [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      {/* Hero Section with Cover Image */}
      <section className="relative h-[50vh] min-h-[300px] bg-gradient-to-r from-primary-700 to-primary-900 overflow-hidden">
        {expert.coverImage ? (
          <div className="absolute inset-0 z-10">
            <img 
              src={expert.coverImage} 
              alt={expert.name} 
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 z-10"></div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70 z-20"></div>
        
        <div className="container mx-auto px-4 relative z-30 h-full flex flex-col justify-end pb-10">
          <Link to="/experts" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            모든 전문가 보기
          </Link>
          
          <div className="flex items-end gap-6">
            <div className="hidden md:block relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={expert.image || "/placeholder.svg"} 
                alt={expert.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {expert.services && expert.services.map((service: string, idx: number) => (
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
                    {expert.regions ? expert.regions.join(', ') : '전국'}
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
            
            {defaultSuccessCases.length > 0 && (
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
            )}
            
            {defaultTestimonials.length > 0 && (
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
            )}
            
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
                <p className="font-noto text-neutral-700 leading-relaxed whitespace-pre-line">
                  {expert.description}
                </p>
              </section>
              
              {keyAchievements.length > 0 && (
                <section>
                  <h2 className="font-pretendard font-bold text-2xl mb-4">핵심 성과</h2>
                  <div className="space-y-3">
                    {keyAchievements.map((achievement: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1.5">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-noto text-neutral-700">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {expert.certifications && expert.certifications.length > 0 && (
                <section>
                  <h2 className="font-pretendard font-bold text-2xl mb-4">자격증 및 인증</h2>
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {expert.certifications.map((cert: any, idx: number) => {
                        // Handle both string and object certifications
                        const certName = typeof cert === 'string' ? cert : cert.name;
                        const certYear = typeof cert === 'string' ? '' : cert.year;
                        const certImage = typeof cert === 'string' ? '' : cert.image;
                        
                        return (
                          <CarouselItem key={idx} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                            <motion.div 
                              whileHover={{ y: -5 }}
                              className="rounded-xl overflow-hidden bg-white border border-neutral-200 h-full"
                            >
                              {certImage ? (
                                <div className="h-40 bg-neutral-100">
                                  <img
                                    src={certImage}
                                    alt={certName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-40 bg-neutral-100 flex items-center justify-center">
                                  <Award className="h-16 w-16 text-neutral-300" />
                                </div>
                              )}
                              <div className="p-4">
                                <h3 className="font-pretendard font-medium text-lg mb-1">{certName}</h3>
                                {certYear && (
                                  <p className="text-neutral-500 text-sm">취득연도: {certYear}</p>
                                )}
                              </div>
                            </motion.div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <div className="flex justify-end gap-2 mt-4">
                      <CarouselPrevious />
                      <CarouselNext />
                    </div>
                  </Carousel>
                </section>
              )}
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="md:hidden w-16 h-16 rounded-full overflow-hidden border-2 border-primary-50">
                    <img 
                      src={expert.image || "/placeholder.svg"} 
                      alt={expert.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-pretendard font-bold text-xl text-neutral-900 md:hidden">
                      {expert.name}
                    </h3>
                    <p className="text-neutral-500 md:text-lg">
                      상담 문의
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {expert.contact && (
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-50 p-2 rounded-md">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{expert.contact}</span>
                    </div>
                  )}
                  
                  {expert.email && (
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-50 p-2 rounded-md">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{expert.email}</span>
                    </div>
                  )}
                  
                  {expert.regions && expert.regions.length > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-50 p-2 rounded-md">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium block mb-1">활동 지역</span>
                        <div className="flex flex-wrap gap-1">
                          {expert.regions.map((region: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="bg-neutral-50">
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <CustomButton variant="primary" className="w-full" asChild>
                    <Link to="/contact">
                      상담 신청하기
                    </Link>
                  </CustomButton>
                  
                  <CustomButton variant="outline" className="w-full" asChild>
                    <Link to="/contact">
                      상세 정보 요청
                    </Link>
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Timeline Tab Content */}
        {selectedTab === "timeline" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Career Timeline */}
              <section>
                <h2 className="font-pretendard font-bold text-2xl mb-6">경력</h2>
                <div className="relative border-l-2 border-neutral-200 pl-8 pb-2 space-y-8">
                  {defaultCareerTimeline.map((career: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-10 w-6 h-6 rounded-full bg-primary-50 border-4 border-primary flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      </div>
                      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                        <span className="inline-block px-3 py-1 bg-primary-50 text-primary rounded-full text-sm font-medium mb-3">
                          {career.year}
                        </span>
                        <h3 className="font-pretendard font-bold text-lg text-neutral-900 mb-1">
                          {career.position}
                        </h3>
                        <p className="text-neutral-500 mb-3">{career.company}</p>
                        <p className="text-neutral-600 text-sm">
                          {career.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Education */}
              {defaultEducation.length > 0 && (
                <section>
                  <h2 className="font-pretendard font-bold text-2xl mb-6">학력</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {defaultEducation.map((education: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <span className="inline-block px-3 py-1 bg-primary-50 text-primary rounded-full text-sm font-medium">
                            {education.year || ''}
                          </span>
                          {idx === 0 && (
                            <Award className="h-6 w-6 text-secondary" />
                          )}
                        </div>
                        <h3 className="font-pretendard font-bold text-lg text-neutral-900 mb-1">
                          {education.degree || education}
                        </h3>
                        {education.institution && (
                          <p className="text-neutral-500">{education.institution}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 sticky top-24">
                <h3 className="font-pretendard font-bold text-lg text-neutral-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  전문가 상담 예약
                </h3>
                
                <p className="text-neutral-600 text-sm mb-6">
                  {expert.name} 전문가와 상담을 예약하시려면 아래 버튼을 클릭해주세요.
                </p>
                
                <div className="space-y-3">
                  <CustomButton variant="primary" className="w-full" asChild>
                    <Link to="/contact">
                      상담 신청하기
                    </Link>
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Success Cases Tab Content */}
        {selectedTab === "cases" && defaultSuccessCases.length > 0 && (
          <div className="space-y-8">
            <h2 className="font-pretendard font-bold text-2xl mb-2">성공 사례</h2>
            <p className="font-noto text-neutral-700 mb-6">
              {expert.name} 전문가가 성공적으로 완료한 프로젝트 사례입니다.
            </p>
            
            <div className="space-y-8">
              {defaultSuccessCases.map((caseItem: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-100">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {caseItem.image && (
                      <div className="h-64 lg:h-auto">
                        <img 
                          src={caseItem.image} 
                          alt={caseItem.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={`p-6 ${caseItem.image ? 'lg:col-span-2' : ''}`}>
                      <h3 className="font-pretendard font-bold text-xl text-neutral-900 mb-3">
                        {caseItem.title}
                      </h3>
                      <p className="font-noto text-neutral-700 mb-4">
                        {caseItem.description}
                      </p>
                      
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <h4 className="font-medium text-neutral-900 mb-3">성과</h4>
                        <ul className="space-y-2">
                          {caseItem.results.map((result: string, resultIdx: number) => (
                            <li key={resultIdx} className="flex items-start gap-2">
                              <div className="mt-1">
                                <CheckCircle className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-neutral-700 text-sm">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Testimonials Tab Content */}
        {selectedTab === "testimonials" && defaultTestimonials.length > 0 && (
          <div className="space-y-8">
            <h2 className="font-pretendard font-bold text-2xl mb-2">고객 추천사</h2>
            <p className="font-noto text-neutral-700 mb-6">
              {expert.name} 전문가와 함께 일했던 고객들의 소중한 추천사입니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {defaultTestimonials.map((testimonial: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
                  <blockquote className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200">
                        {testimonial.image ? (
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                            <span className="text-neutral-400 font-medium">
                              {testimonial.name?.substring(0, 1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-pretendard font-bold text-neutral-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-neutral-500">{testimonial.position}</p>
                      </div>
                    </div>
                    
                    <p className="font-noto text-neutral-700 italic leading-relaxed mb-4">
                      "{testimonial.content}"
                    </p>
                    
                    {testimonial.video && (
                      <div className="mt-4 pt-4 border-t">
                        <a 
                          href={testimonial.video} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          영상 후기 보기
                        </a>
                      </div>
                    )}
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Contact Tab Content */}
        {selectedTab === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-pretendard font-bold text-2xl mb-4">상담 및 예약</h2>
              <p className="font-noto text-neutral-700">
                {expert.name} 전문가와 상담을 원하시면 아래 정보를 참고하거나 오른쪽의 상담 신청 양식을 작성해주세요.
              </p>
              
              {expert.regions && expert.regions.length > 0 && (
                <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="font-pretendard font-bold text-lg flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    활동 지역
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.regions.map((region: string, idx: number) => (
                      <Badge key={idx} className="bg-primary-50 text-primary border-none text-sm py-1 px-3">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {expert.services && expert.services.length > 0 && (
                <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
                  <h3 className="font-pretendard font-bold text-lg flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    전문 서비스
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.services.map((service: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="bg-white text-sm py-1 px-3">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-6 bg-primary-50 rounded-xl">
                <h3 className="font-pretendard font-bold text-lg text-primary mb-4">
                  전문가에게 문의하기
                </h3>
                <p className="font-noto text-neutral-700 mb-4">
                  아래 연락처로 직접 문의하시거나 오른쪽의 상담 신청 양식을 작성해주세요.
                </p>
                <div className="space-y-3">
                  {expert.contact && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="font-medium">{expert.contact}</span>
                    </div>
                  )}
                  
                  {expert.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-medium">{expert.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 sticky top-24">
                <h3 className="font-pretendard font-bold text-lg text-neutral-900 mb-6">
                  상담 신청하기
                </h3>
                
                <p className="text-center text-neutral-500 my-8">
                  현재 상담 신청 양식은 준비 중입니다.
                  <br />빠른 시일 내에 서비스를 제공해드리겠습니다.
                </p>
                
                <CustomButton variant="primary" className="w-full" asChild>
                  <Link to="/contact">
                    문의하기
                  </Link>
                </CustomButton>
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
