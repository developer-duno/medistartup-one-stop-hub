
import React from 'react';
import { ArrowUp, ArrowDown, BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Service {
  name: string;
  consultations: number;
  change: string;
  trend: 'up' | 'down';
}

interface ServicesListProps {
  services: Service[];
  title: string;
}

const ServicesList = ({ services, title }: ServicesListProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pretendard font-semibold text-xl">{title}</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin?section=services')}>
          모두 보기
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-muted-foreground">서비스</th>
                <th className="text-center p-4 font-medium text-muted-foreground">상담 건수</th>
                <th className="text-right p-4 font-medium text-muted-foreground">변화율</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{service.name}</td>
                  <td className="p-4 text-center">{service.consultations}건</td>
                  <td className="p-4 text-right">
                    <span className={`flex items-center justify-end ${service.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {service.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {service.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4">
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/admin?section=simulator')}>
              <BarChart3 className="h-4 w-4 mr-2" />
              시뮬레이터 관리하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesList;
