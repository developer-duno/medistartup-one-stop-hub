
import React from 'react';
import { Slider } from '@/components/ui/slider';

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
  const renderFinancialInputs = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">진료과목</label>
        <select 
          className="w-full p-2 border rounded-md"
          value={financialInputs.specialty}
          onChange={(e) => setFinancialInputs({...financialInputs, specialty: e.target.value})}
        >
          <option value="내과">내과</option>
          <option value="외과">외과</option>
          <option value="소아과">소아과</option>
          <option value="산부인과">산부인과</option>
          <option value="피부과">피부과</option>
          <option value="치과">치과</option>
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
          <option value="중형상가">중형상가</option>
          <option value="대형상가">대형상가</option>
          <option value="주택가">주택가</option>
          <option value="오피스밀집지역">오피스밀집지역</option>
        </select>
      </div>
    </div>
  );
  
  const renderRevenueInputs = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">진료과목</label>
        <select 
          className="w-full p-2 border rounded-md"
          value={revenueInputs.specialty}
          onChange={(e) => setRevenueInputs({...revenueInputs, specialty: e.target.value})}
        >
          <option value="내과">내과</option>
          <option value="피부과">피부과</option>
          <option value="정형외과">정형외과</option>
          <option value="안과">안과</option>
          <option value="치과">치과</option>
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
          <option value="서울/경기">서울/경기</option>
          <option value="부산/경남">부산/경남</option>
          <option value="대전/충남">대전/충남</option>
          <option value="대구/경북">대구/경북</option>
          <option value="광주/전라">광주/전라</option>
        </select>
      </div>
    </div>
  );
  
  const renderStaffingInputs = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">진료과목</label>
        <select 
          className="w-full p-2 border rounded-md"
          value={staffingInputs.specialty}
          onChange={(e) => setStaffingInputs({...staffingInputs, specialty: e.target.value})}
        >
          <option value="내과">내과</option>
          <option value="치과">치과</option>
          <option value="한의원">한의원</option>
          <option value="종합병원">종합병원</option>
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
          {['일반진료', '미용', '수술', '검사'].map((service) => (
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
