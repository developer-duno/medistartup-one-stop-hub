
import React, { useState } from 'react';
import { 
  Users, Settings, FileText, BarChart3, Lock,
  UserPlus, Save, X, Edit, Trash, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("experts");
  const [isAddingExpert, setIsAddingExpert] = useState(false);
  const form = useForm({
    defaultValues: {
      name: '',
      role: '',
      specialty: '',
      image: '',
      experience: '',
      projects: '',
      description: '',
      regions: [],
      serviceCategories: []
    }
  });

  const sidebarItems = [
    { id: 'experts', label: '전문가 관리', icon: <Users className="h-5 w-5" /> },
    { id: 'services', label: '서비스 관리', icon: <Settings className="h-5 w-5" /> },
    { id: 'insights', label: '뉴스 & 인사이트', icon: <FileText className="h-5 w-5" /> },
    { id: 'simulator', label: '시뮬레이터 관리', icon: <BarChart3 className="h-5 w-5" /> },
  ];

  const mockExperts = [
    {
      id: 1,
      name: '김태호',
      role: '재무 컨설턴트',
      specialty: '병원 재무설계 및 투자계획 전문',
      image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
      regions: ['서울', '경기'],
      services: ['재무 컨설팅', '마케팅 전략']
    },
    {
      id: 2,
      name: '박지연',
      role: '입지 분석가',
      specialty: '의료기관 최적 입지선정 및 상권분석',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
      regions: ['대전', '충남'],
      services: ['입지 분석']
    },
    {
      id: 3,
      name: '이준호',
      role: '의료 인테리어 디자이너',
      specialty: '진료과목별 최적화 공간설계',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop',
      regions: ['서울', '인천', '경기'],
      services: ['설계 및 인테리어']
    }
  ];

  const regionOptions = ['서울', '경기', '인천', '대전', '충남', '충북', '부산', '대구', '광주', '제주'];
  
  const serviceOptions = [
    '입지 분석', '재무 컨설팅', '설계 및 인테리어', '인허가 대행', 
    '인력 채용', '마케팅 전략', '의료기기 구입 및 설치', '수납 및 의료폐기물 처리'
  ];

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setIsAddingExpert(false);
    // Here you would typically add the expert to your database
  };

  const renderExpertsSection = () => {
    if (isAddingExpert) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-pretendard font-bold text-xl">전문가 추가</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsAddingExpert(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>직책</FormLabel>
                      <FormControl>
                        <Input placeholder="재무 컨설턴트" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전문 분야</FormLabel>
                      <FormControl>
                        <Input placeholder="병원 재무설계 및 투자계획 전문" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>프로필 이미지 URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>경력 (년)</FormLabel>
                      <FormControl>
                        <Input placeholder="10" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="projects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>프로젝트 수</FormLabel>
                      <FormControl>
                        <Input placeholder="150" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>소개</FormLabel>
                    <FormControl>
                      <textarea 
                        className="w-full p-2 border border-input rounded-md"
                        rows={4}
                        placeholder="전문가 소개를 입력하세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>지역 선택 (다중 선택)</FormLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {regionOptions.map((region) => (
                      <label key={region} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          value={region}
                          onChange={(e) => {
                            const currentRegions = form.getValues("regions") as string[] || [];
                            if (e.target.checked) {
                              form.setValue("regions", [...currentRegions, region]);
                            } else {
                              form.setValue("regions", currentRegions.filter((r) => r !== region));
                            }
                          }}
                        />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <FormLabel>서비스 카테고리 (다중 선택)</FormLabel>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          value={service}
                          onChange={(e) => {
                            const currentServices = form.getValues("serviceCategories") as string[] || [];
                            if (e.target.checked) {
                              form.setValue("serviceCategories", [...currentServices, service]);
                            } else {
                              form.setValue("serviceCategories", currentServices.filter((s) => s !== service));
                            }
                          }}
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddingExpert(false)}
                >
                  취소
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  저장하기
                </Button>
              </div>
            </form>
          </Form>
        </div>
      );
    }
    
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-pretendard font-bold text-2xl">전문가 관리</h2>
          <Button onClick={() => setIsAddingExpert(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            전문가 추가
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    전문가
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    직책
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    지역
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    서비스
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockExperts.map((expert) => (
                  <tr key={expert.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={expert.image} 
                            alt={expert.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{expert.name}</div>
                          <div className="text-sm text-gray-500">{expert.specialty}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expert.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {expert.regions.map((region) => (
                          <span 
                            key={region} 
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                          >
                            {region}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {expert.services.map((service) => (
                          <span 
                            key={service} 
                            className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-pretendard font-bold text-xl">관리자 대시보드</h1>
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm" asChild>
              <Link to="/">
                사이트로 이동
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <Lock className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-64 bg-white rounded-lg shadow-md p-4">
            <nav>
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          
          <main className="flex-1">
            {activeSection === "experts" && renderExpertsSection()}
            
            {activeSection === "services" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-pretendard font-bold text-2xl mb-6">서비스 관리</h2>
                <p className="text-gray-500">서비스 관리 기능은 개발 중입니다.</p>
              </div>
            )}
            
            {activeSection === "insights" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-pretendard font-bold text-2xl mb-6">뉴스 & 인사이트 관리</h2>
                <p className="text-gray-500">뉴스 & 인사이트 관리 기능은 개발 중입니다.</p>
              </div>
            )}
            
            {activeSection === "simulator" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-pretendard font-bold text-2xl mb-6">시뮬레이터 관리</h2>
                <p className="text-gray-500">시뮬레이터 관리 기능은 개발 중입니다.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
