import React from 'react';
import { Slider } from '@/components/ui/slider';
import { MEDICAL_SPECIALTIES, SERVICE_TYPES } from '../../../admin/simulator/types';
import { StaffingInputs } from '../../types/simulatorTypes';

interface StaffingInputFormProps {
  staffingInputs: StaffingInputs;
  setStaffingInputs: React.Dispatch<React.SetStateAction<StaffingInputs>>;
}

const StaffingInputForm: React.FC<StaffingInputFormProps> = ({ 
  staffingInputs, 
  setStaffingInputs 
}) => {
  const specialties = MEDICAL_SPECIALTIES.filter(specialty => 
    ['내과', '치과', '한의원', '종합병원'].includes(specialty));

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

export default StaffingInputForm;
