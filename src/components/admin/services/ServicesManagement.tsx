
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Eye, Edit, MapPin, BarChart3, Building2, FileCheck, Users, Briefcase, Package, Trash2 } from 'lucide-react';

const ServicesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      id: 1,
      title: '입지 분석',
      description: '유동인구, 경쟁 의료기관, 임대료 등을 고려한 최적 입지 선정',
      icon: <MapPin className="h-5 w-5 text-primary" />,
      path: '/services/location-analysis',
      category: 'planning'
    },
    {
      id: 2,
      title: '재무 컨설팅',
      description: '초기 투자비용 산정부터 손익분기점 예측까지 맞춤형 재무 계획',
      icon: <BarChart3 className="h-5 w-5 text-secondary" />,
      path: '/services/financial-consulting',
      category: 'planning'
    },
    {
      id: 3,
      title: '설계 및 인테리어',
      description: '진료과목별 최적 동선 설계 및 브랜드 아이덴티티를 반영한 인테리어',
      icon: <Building2 className="h-5 w-5 text-accent" />,
      path: '/services/design-interior',
      category: 'implementation'
    },
    {
      id: 4,
      title: '인허가 대행',
      description: '복잡한 행정 절차를 원스톱으로 처리하는 인허가 대행 서비스',
      icon: <FileCheck className="h-5 w-5 text-primary" />,
      path: '/services/licensing',
      category: 'implementation'
    },
    {
      id: 5,
      title: '인력 채용',
      description: '전문 의료인력 채용 및 교육 프로그램 지원',
      icon: <Users className="h-5 w-5 text-secondary" />,
      path: '/services/recruitment',
      category: 'operation'
    },
    {
      id: 6,
      title: '마케팅 전략',
      description: '개원 초기 인지도 확보부터 지속 가능한 환자 유치 전략 수립',
      icon: <Briefcase className="h-5 w-5 text-accent" />,
      path: '/services/marketing-strategy',
      category: 'operation'
    },
    {
      id: 7,
      title: '의료기기 구입 및 설치',
      description: '최적의 의료장비 선정부터 설치, A/S까지 원스톱 제공',
      icon: <Package className="h-5 w-5 text-primary" />,
      path: '/services/medical-equipment',
      category: 'equipment'
    },
    {
      id: 8,
      title: '수납 및 의료폐기물 처리',
      description: '의료폐기물 처리 계약부터 효율적인 수납 시스템 구축까지',
      icon: <Trash2 className="h-5 w-5 text-secondary" />,
      path: '/services/waste-management',
      category: 'equipment'
    }
  ];

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(service => service.category === activeTab);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">서비스 관리</h2>
        <Button variant="default">새 서비스 추가</Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="planning">계획 단계</TabsTrigger>
          <TabsTrigger value="implementation">개원 단계</TabsTrigger>
          <TabsTrigger value="operation">운영 단계</TabsTrigger>
          <TabsTrigger value="equipment">설비 및 장비</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {service.icon}
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 h-10">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground">
                    {service.category === 'planning' && '계획 단계'}
                    {service.category === 'implementation' && '개원 단계'}
                    {service.category === 'operation' && '운영 단계'}
                    {service.category === 'equipment' && '설비 및 장비'}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={service.path} target="_blank">
                      <Eye className="h-4 w-4 mr-1" />
                      보기
                    </Link>
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    수정
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesManagement;
