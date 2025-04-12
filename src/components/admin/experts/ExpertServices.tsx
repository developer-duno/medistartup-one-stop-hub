
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

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
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
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
            <div className="flex items-center">
              <span className="text-sm">{service}</span>
              {selectedServices.includes(service) && (
                <Badge className="ml-2 text-xs bg-green-100 text-green-800 hover:bg-green-200">선택됨</Badge>
              )}
            </div>
          </label>
        ))}
      </div>
      
      {selectedServices.length > 0 && (
        <div className="mt-3 p-2 bg-blue-50 rounded-md">
          <p className="text-xs text-blue-700">
            선택된 서비스: <span className="font-medium">{selectedServices.length}개</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpertServices;
