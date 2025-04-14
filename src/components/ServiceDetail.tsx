
import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceDetailProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const getServiceUrlName = (title: string): string => {
  const serviceMap: Record<string, string> = {
    '입지 분석': 'location-analysis',
    '재무 컨설팅': 'financial-consulting',
    '설계 및 인테리어': 'design-interior',
    '인허가 대행': 'licensing',
    '인력 채용': 'recruitment',
    '마케팅 전략': 'marketing-strategy',
    '의료기기 구입 및 설치': 'medical-equipment',
    '수납 및 의료폐기물 처리': 'waste-management'
  };
  
  return serviceMap[title] || '';
};

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  title,
  description,
  icon,
  color,
  features,
  benefits,
  process,
  faqs,
}) => {
  const serviceUrlName = getServiceUrlName(title);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white">
      <div className={`bg-gradient-to-r ${color} py-12 md:py-24`}>
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-md">
              {icon}
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="font-pretendard font-bold text-2xl md:text-5xl text-neutral-900 mb-2 md:mb-4">
                {title}
              </h1>
              <p className="font-noto text-base md:text-lg text-neutral-700 max-w-2xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {isMobile && (
          <div className="mb-8 bg-neutral-50 rounded-xl shadow-sm border border-neutral-100 p-4">
            <h3 className="font-pretendard font-bold text-xl text-neutral-900 mb-3">
              서비스 혜택
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start font-noto text-neutral-700 text-sm">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5 mr-2" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <CustomButton 
                variant="primary" 
                fullWidth 
                size={isMobile ? "sm" : "md"}
                asChild
              >
                <Link to={`/experts?service=${serviceUrlName}`}>
                  {title} 전문가 만나기
                </Link>
              </CustomButton>
              <CustomButton 
                variant="accent" 
                fullWidth 
                size={isMobile ? "sm" : "md"}
                asChild
              >
                <Link to={`/experts?service=${serviceUrlName}&consultation=true`}>
                  전문 상담 신청하기
                </Link>
              </CustomButton>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-2/3">
            <section className="mb-10 md:mb-16">
              <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-4 md:mb-6">
                주요 기능
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 md:p-6">
                    <h3 className="font-pretendard font-bold text-lg md:text-xl text-neutral-900 mb-2 md:mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-noto text-sm md:text-base text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10 md:mb-16">
              <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-4 md:mb-6">
                서비스 프로세스
              </h2>
              <div className="relative">
                <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-neutral-200"></div>
                <div className="space-y-6 md:space-y-8">
                  {process.map((step) => (
                    <div key={step.step} className="relative pl-12 md:pl-16">
                      <div className="absolute left-0 rounded-full w-8 h-8 md:w-12 md:h-12 bg-primary flex items-center justify-center text-white font-pretendard font-bold text-sm md:text-base">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-pretendard font-bold text-lg md:text-xl text-neutral-900 mb-1 md:mb-2">
                          {step.title}
                        </h3>
                        <p className="font-noto text-sm md:text-base text-neutral-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-10 md:mb-16">
              <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-4 md:mb-6">
                자주 묻는 질문
              </h2>
              <div className="space-y-4 md:space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 md:p-6">
                    <h3 className="font-pretendard font-bold text-base md:text-lg text-neutral-900 mb-2 md:mb-3">
                      Q. {faq.question}
                    </h3>
                    <p className="font-noto text-sm md:text-base text-neutral-600">
                      A. {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {!isMobile && (
            <div className="md:w-1/3">
              <div className="bg-neutral-50 rounded-xl shadow-sm border border-neutral-100 p-6 sticky top-8">
                <h3 className="font-pretendard font-bold text-xl text-neutral-900 mb-4">
                  서비스 혜택
                </h3>
                <ul className="space-y-3 mb-6">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start font-noto text-neutral-700">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <CustomButton 
                    variant="primary" 
                    fullWidth 
                    asChild
                    size="md"
                  >
                    <Link to={`/experts?service=${serviceUrlName}`}>
                      {title} 전문가 만나기
                    </Link>
                  </CustomButton>
                  <CustomButton 
                    variant="accent" 
                    fullWidth 
                    asChild
                    size="md"
                  >
                    <Link to={`/experts?service=${serviceUrlName}&consultation=true`}>
                      전문 상담 신청하기
                    </Link>
                  </CustomButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
