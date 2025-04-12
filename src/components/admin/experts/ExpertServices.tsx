
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface ExpertServicesProps {
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
}

const ExpertServices: React.FC<ExpertServicesProps> = ({ selectedServices, setSelectedServices }) => {
  const serviceOptions = [
    '입지 분석', '재무 컨설팅', '설계 및 인테리어', '인허가 대행', 
    '인력 채용', '마케팅 전략', '의료기기 구입 및 설치', '수납 및 의료폐기물 처리'
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  return (
    <div>
      <FormLabel>서비스 카테고리 (다중 선택)</FormLabel>
      <div className="grid grid-cols-1 gap-2 mt-2">
        {serviceOptions.map((service) => (
          <label key={service} className="flex items-center space-x-2">
            <Checkbox
              id={`service-${service}`}
              checked={selectedServices.includes(service)}
              onCheckedChange={() => handleServiceToggle(service)}
            />
            <span className="text-sm">{service}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ExpertServices;
