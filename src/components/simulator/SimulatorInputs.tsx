
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { MEDICAL_SPECIALTIES, LOCATION_TYPES, STANDARDIZED_REGIONS, SERVICE_TYPES } from '../admin/simulator/types';

interface SimulatorInputsProps {
  simulatorType: 'financial' | 'revenue' | 'staffing';
  financialInputs: {
    specialty: string;
    size: number[];
    location: string;
  };
  setFinancialInputs: React.Dispatch<React.SetStateAction<{
    specialty: string;
    size: number[];
    location: string;
  }>>;
  revenueInputs: {
    specialty: string;
    patients: number[];
    region: string;
  };
  setRevenueInputs: React.Dispatch<React.SetStateAction<{
    specialty: string;
    patients: number[];
    region: string;
  }>>;
  staffingInputs: {
    specialty: string;
    size: number[];
    services: string[];
  };
  setStaffingInputs: React.Dispatch<React.SetStateAction<{
    specialty: string;
    size: number[];
    services: string[];
  }>>;
}

const SimulatorInputs: React.FC<SimulatorInputsProps> = ({
  simulatorType,
  financialInputs,
  setFinancialInputs,
  revenueInputs,
  setRevenueInputs,
  staffingInputs,
  setStaffingInputs,
}) => {
  // Filter specialties by simulator type
  const getFilteredSpecialties = (type: string) => {
    switch(type) {
      case 'financial':
        return MEDICAL_SPECIALTIES;
      case 'revenue':
        return MEDICAL_SPECIALTIES.filter(specialty => 
          ['내과', '피부과', '정형외과', '안과', '치과', '한의원'].includes(specialty));
      case 'staffing':
        return MEDICAL_SPECIALTIES.filter(specialty => 
          ['내과', '치과', '한의원', '종합병원'].includes(specialty));
      default:
        return MEDICAL_SPECIALTIES;
    }
  };

  const renderFinancialInputs = () => {
    const specialties = getFilteredSpecialties('financial');
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">진료과목</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={financialInputs.specialty}
            onChange={(e) => setFinancialInputs({...financialInputs, specialty: e.target.value})}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">규모 (평수)</label>
          <div className="flex items-center gap-3">
            <Slider
              value={financialInputs.size}
              min={30}
              max={200}
              step={10}
              onValueChange={(value) => setFinancialInputs({...financialInputs, size: value})}
              className="flex-grow"
            />
            <span className="text-sm font-medium w-12 text-right">
              {financialInputs.size}평
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">위치</label>
          <select
            className="w-full p-2 border rounded-md"
            value={financialInputs.location}
            onChange={(e) => setFinancialInputs({...financialInputs, location: e.target.value})}
          >
            {LOCATION_TYPES.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  const renderRevenueInputs = () => {
    const specialties = getFilteredSpecialties('revenue');
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">진료과목</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={revenueInputs.specialty}
            onChange={(e) => setRevenueInputs({...revenueInputs, specialty: e.target.value})}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">일평균 환자수</label>
          <div className="flex items-center gap-3">
            <Slider
              value={revenueInputs.patients}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) => setRevenueInputs({...revenueInputs, patients: value})}
              className="flex-grow"
            />
            <span className="text-sm font-medium w-12 text-right">
              {revenueInputs.patients}명
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">지역</label>
          <select
            className="w-full p-2 border rounded-md"
            value={revenueInputs.region}
            onChange={(e) => setRevenueInputs({...revenueInputs, region: e.target.value})}
          >
            {STANDARDIZED_REGIONS.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  const renderStaffingInputs = () => {
    const specialties = getFilteredSpecialties('staffing');
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">진료과목</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={staffingInputs.specialty}
            onChange={(e) => setStaffingInputs({...staffingInputs, specialty: e.target.value})}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">규모 (평수)</label>
          <div className="flex items-center gap-3">
            <Slider
              value={staffingInputs.size}
              min={30}
              max={300}
              step={10}
              onValueChange={(value) => setStaffingInputs({...staffingInputs, size: value})}
              className="flex-grow"
            />
            <span className="text-sm font-medium w-12 text-right">
              {staffingInputs.size}평
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">제공 서비스</label>
          <div className="space-y-1">
            {SERVICE_TYPES.map((service) => (
              <label key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={staffingInputs.services.includes(service)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStaffingInputs({
                        ...staffingInputs,
                        services: [...staffingInputs.services, service]
                      });
                    } else {
                      setStaffingInputs({
                        ...staffingInputs,
                        services: staffingInputs.services.filter(s => s !== service)
                      });
                    }
                  }}
                  className="mr-2"
                />
                {service}
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  switch(simulatorType) {
    case 'financial':
      return renderFinancialInputs();
    case 'revenue':
      return renderRevenueInputs();
    case 'staffing':
      return renderStaffingInputs();
    default:
      return null;
  }
};

export default SimulatorInputs;
