
import React from 'react';
import { useServices } from '@/contexts/ServicesContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ServiceCategory } from '@/types/service';

const Services = () => {
  const { getServicesByCategory } = useServices();

  // Define service categories with their Korean names
  const categories: { id: ServiceCategory | 'all'; name: string }[] = [
    { id: 'all', name: '전체' },
    { id: 'planning', name: '계획 단계' },
    { id: 'implementation', name: '실행 단계' },
    { id: 'equipment', name: '장비 설치' },
    { id: 'operation', name: '운영 단계' }
  ];

  // Get all services initially
  const allServices = getServicesByCategory('all');

  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-pretendard font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4">
              병원창업 <span className="text-primary">서비스</span>
            </h1>
            <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
              의료기관 설립의 모든 단계를 위한 전문 서비스입니다. 병원 창업의 계획부터 운영까지 필요한 모든 솔루션을 제공합니다.
            </p>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-2 font-noto bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
                onClick={() => {
                  const element = document.getElementById(category.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="space-y-20">
            {/* All Services Section */}
            <div id="all" className="scroll-mt-20">
              <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-8 border-l-4 border-primary pl-4">
                전체 서비스
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allServices.map((service) => (
                  <Link
                    key={service.id}
                    to={service.path}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6 border-b border-neutral-100">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Icon based on service.icon string */}
                        <div className="bg-primary-100 rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
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
                            className="text-primary"
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
                            {service.icon === 'Users' && <path d="M22 21v-2a4 4 0 0 0-3-3.87" />}
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
                    <div className="p-4 bg-neutral-50 group-hover:bg-primary-50 transition-colors">
                      <span className="font-pretendard font-medium text-primary inline-flex items-center">
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
            </div>

            {/* Planning Services */}
            <div id="planning" className="scroll-mt-20">
              <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-8 border-l-4 border-primary pl-4">
                계획 단계 서비스
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getServicesByCategory('planning').map((service) => (
                  <Link
                    key={service.id}
                    to={service.path}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Same content structure as all services */}
                    <div className="p-6 border-b border-neutral-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary-100 rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
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
                            className="text-primary"
                          >
                            {/* Same SVG paths as above */}
                            {service.icon === 'MapPin' && <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />}
                            {service.icon === 'MapPin' && <circle cx="12" cy="10" r="3" />}
                            {service.icon === 'BarChart3' && <path d="M3 3v18h18" />}
                            {service.icon === 'BarChart3' && <path d="M18 17V9" />}
                            {service.icon === 'BarChart3' && <path d="M13 17V5" />}
                            {service.icon === 'BarChart3' && <path d="M8 17v-3" />}
                          </svg>
                        </div>
                        <h3 className="font-pretendard font-bold text-xl text-neutral-900">{service.title}</h3>
                      </div>
                      <p className="font-noto text-neutral-600 mb-4">{service.description}</p>
                    </div>
                    <div className="p-4 bg-neutral-50 group-hover:bg-primary-50 transition-colors">
                      <span className="font-pretendard font-medium text-primary inline-flex items-center">
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
            </div>

            {/* Implementation Services */}
            <div id="implementation" className="scroll-mt-20">
              <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-8 border-l-4 border-primary pl-4">
                실행 단계 서비스
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getServicesByCategory('implementation').map((service) => (
                  <Link
                    key={service.id}
                    to={service.path}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Same structure as above */}
                    <div className="p-6 border-b border-neutral-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary-100 rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
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
                            className="text-primary"
                          >
                            {service.icon === 'Building2' && <path d="M6 22V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v19" />}
                            {service.icon === 'Building2' && <path d="M6 12h14" />}
                            {service.icon === 'Building2' && <path d="M6 22h14" />}
                            {service.icon === 'FileCheck' && <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />}
                            {service.icon === 'FileCheck' && <polyline points="14 2 14 8 20 8" />}
                            {service.icon === 'FileCheck' && <path d="m9 15 2 2 4-4" />}
                          </svg>
                        </div>
                        <h3 className="font-pretendard font-bold text-xl text-neutral-900">{service.title}</h3>
                      </div>
                      <p className="font-noto text-neutral-600 mb-4">{service.description}</p>
                    </div>
                    <div className="p-4 bg-neutral-50 group-hover:bg-primary-50 transition-colors">
                      <span className="font-pretendard font-medium text-primary inline-flex items-center">
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
            </div>

            {/* Equipment Services */}
            <div id="equipment" className="scroll-mt-20">
              <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-8 border-l-4 border-primary pl-4">
                장비 설치 서비스
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getServicesByCategory('equipment').map((service) => (
                  <Link
                    key={service.id}
                    to={service.path}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Same structure as above */}
                    <div className="p-6 border-b border-neutral-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary-100 rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
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
                            className="text-primary"
                          >
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
                    <div className="p-4 bg-neutral-50 group-hover:bg-primary-50 transition-colors">
                      <span className="font-pretendard font-medium text-primary inline-flex items-center">
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
            </div>

            {/* Operation Services */}
            <div id="operation" className="scroll-mt-20">
              <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-8 border-l-4 border-primary pl-4">
                운영 단계 서비스
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getServicesByCategory('operation').map((service) => (
                  <Link
                    key={service.id}
                    to={service.path}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Same structure as above */}
                    <div className="p-6 border-b border-neutral-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary-100 rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
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
                            className="text-primary"
                          >
                            {service.icon === 'Users' && <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />}
                            {service.icon === 'Users' && <circle cx="9" cy="7" r="4" />}
                            {service.icon === 'Users' && <path d="M22 21v-2a4 4 0 0 0-3-3.87" />}
                            {service.icon === 'Users' && <path d="M16 3.13a4 4 0 0 1 0 7.75" />}
                            {service.icon === 'Briefcase' && <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />}
                            {service.icon === 'Briefcase' && <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />}
                          </svg>
                        </div>
                        <h3 className="font-pretendard font-bold text-xl text-neutral-900">{service.title}</h3>
                      </div>
                      <p className="font-noto text-neutral-600 mb-4">{service.description}</p>
                    </div>
                    <div className="p-4 bg-neutral-50 group-hover:bg-primary-50 transition-colors">
                      <span className="font-pretendard font-medium text-primary inline-flex items-center">
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
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
