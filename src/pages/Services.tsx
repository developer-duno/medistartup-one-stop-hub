import React, { useState, useEffect } from 'react';
import { useServices } from '@/contexts/ServicesContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ServiceCategory } from '@/types/service';
import { RunwareService } from '@/services/RunwareService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimulatorSection from '@/components/simulator/SimulatorSection';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const runwareService = new RunwareService('6PtVhh4UUUKazd3Uv8K0l7njZsxeaOxQ');

const Services = () => {
  const { getServicesByCategory } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const categories: { id: ServiceCategory | 'all'; name: string; description: string }[] = [
    { id: 'all', name: '전체', description: '병원 창업을 위한 모든 서비스를 한눈에 확인하세요.' },
    { id: 'planning', name: '계획 단계', description: '성공적인 병원 창업을 위한 초기 계획 단계의 필수 서비스입니다.' },
    { id: 'implementation', name: '실행 단계', description: '계획을 실행에 옮기는 과정에서 필요한 전문 서비스를 제공합니다.' },
    { id: 'equipment', name: '장비 설치', description: '최신 의료장비 제안부터 설치까지 전문적인 서비스를 지원합니다.' },
    { id: 'operation', name: '운영 단계', description: '병원 운영을 성공적으로 이끌기 위한 전문적인 컨설팅 서비스입니다.' }
  ];

  const generateCategoryImage = async (category: ServiceCategory | 'all') => {
    if (categoryImages[category]) return;
    
    setLoading(true);
    try {
      const prompts = {
        all: "Modern hospital services overview, professional healthcare services collage, medical facility services",
        planning: "Hospital planning phase, medical facility blueprints, healthcare strategic planning, hospital location analysis",
        implementation: "Hospital construction and implementation phase, medical facility building process, healthcare facility development",
        equipment: "Modern hospital medical equipment installation, healthcare technology setup, medical machinery arrangement",
        operation: "Hospital operations management, healthcare facility daily operations, medical staff working in modern hospital"
      };
      
      const response = await runwareService.generateImage({
        positivePrompt: prompts[category],
        width: 800,
        height: 450,
        outputFormat: "WEBP"
      });
      
      setCategoryImages(prev => ({
        ...prev,
        [category]: response.imageURL
      }));
    } catch (error) {
      console.error("Failed to generate category image", error);
      setCategoryImages(prev => ({
        ...prev,
        [category]: `https://placehold.co/800x450/e2e8f0/1e293b?text=${category.toUpperCase()}`
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateCategoryImage('all');
  }, []);

  const displayServices = getServicesByCategory(selectedCategory);

  const handleCategoryChange = (category: ServiceCategory | 'all') => {
    setSelectedCategory(category);
    generateCategoryImage(category);
  };

  return (
    <div className="theme-services min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 theme-page-header">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
              병원창업 <span className="theme-text">서비스</span>
            </h1>
            <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
              의료기관 설립의 모든 단계를 위한 전문 서비스입니다. 병원 창업의 계획부터 운영까지 필요한 모든 솔루션을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      <Tabs
        defaultValue="all"
        className="w-full mb-12"
        onValueChange={(value) => handleCategoryChange(value as ServiceCategory | 'all')}
      >
        <TabsList className="w-full flex justify-center flex-wrap mb-6">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-6 py-2 font-noto data-[state=active]:theme-bg-light data-[state=active]:theme-text"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-md aspect-video max-w-4xl mx-auto">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <img 
                src={categoryImages[selectedCategory] || `https://placehold.co/800x450/e2e8f0/1e293b?text=${selectedCategory.toUpperCase()}`}
                alt={`${categories.find(c => c.id === selectedCategory)?.name} 서비스`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="font-pretendard font-bold text-2xl text-white mb-2">
                  {categories.find(c => c.id === selectedCategory)?.name} 서비스
                </h2>
                <p className="font-noto text-white/90">
                  {categories.find(c => c.id === selectedCategory)?.description}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="theme-bg-light rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="theme-text"
                    >
                      {service.icon === 'MapPin' && <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />}
                      {service.icon === 'MapPin' && <circle cx="12" cy="10" r="3" />}
                      {service.icon === 'BarChart3' && <path d="M3 3v18h18" />}
                      {service.icon === 'BarChart3' && <path d="M18 17V9" />}
                      {service.icon === 'BarChart3' && <path d="M13 17V5" />}
                      {service.icon === 'BarChart3' && <path d="M8 17v-3" />}
                      {service.icon === 'Building2' && <path d="M6 22V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v19" />}
                      {service.icon === 'Building2' && <path d="M6 12h14" />}
                      {service.icon === 'Building2' && <path d="M6 22h14" />}
                      {service.icon === 'FileCheck' && <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />}
                      {service.icon === 'FileCheck' && <polyline points="14 2 14 8 20 8" />}
                      {service.icon === 'FileCheck' && <path d="m9 15 2 2 4-4" />}
                      {service.icon === 'Users' && <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />}
                      {service.icon === 'Users' && <circle cx="9" cy="7" r="4" />}
                      {service.icon === 'Users' && <path d="M22 21v-2a4 4 0 0 1 0 7.75" />}
                      {service.icon === 'Users' && <path d="M16 3.13a4 4 0 0 1 0 7.75" />}
                      {service.icon === 'Briefcase' && <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />}
                      {service.icon === 'Briefcase' && <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />}
                      {service.icon === 'Package' && <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />}
                      {service.icon === 'Package' && <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />}
                      {service.icon === 'Package' && <path d="M12 3v6" />}
                      {service.icon === 'Trash2' && <path d="M3 6h18" />}
                      {service.icon === 'Trash2' && <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />}
                      {service.icon === 'Trash2' && <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />}
                      {service.icon === 'Trash2' && <path d="M10 11v6" />}
                      {service.icon === 'Trash2' && <path d="M14 11v6" />}
                    </svg>
                  </div>
                  <h3 className="font-pretendard font-bold text-xl text-neutral-900">{service.title}</h3>
                </div>
                <p className="font-noto text-neutral-600 mb-4">{service.description}</p>
              </div>
              <div className="p-4 bg-neutral-50 group-hover:theme-bg-light transition-colors">
                <span className="font-pretendard font-medium theme-text inline-flex items-center">
                  자세히 보기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Tabs>

      <SimulatorSection />
      
      <Footer />
    </div>
  );
};

export default Services;
