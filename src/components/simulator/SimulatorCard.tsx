
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export interface SimulatorCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  simulatorType: 'financial' | 'revenue' | 'staffing';
  onSimulate: (data: any) => any;
}

const SimulatorCard: React.FC<SimulatorCardProps> = ({
  id,
  title,
  description,
  icon,
  simulatorType,
  onSimulate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  // Form state based on simulator type
  const [financialInputs, setFinancialInputs] = useState({
    specialty: '내과',
    size: [50], // square meters
    location: '중형상가',
  });
  
  const [revenueInputs, setRevenueInputs] = useState({
    specialty: '피부과',
    patients: [30], // daily patients
    region: '서울/경기',
  });
  
  const [staffingInputs, setStaffingInputs] = useState({
    specialty: '치과',
    size: [100], // square meters
    services: ['일반진료', '미용'],
  });

  const handleSimulate = () => {
    let simulationData;
    let result;
    
    switch(simulatorType) {
      case 'financial':
        simulationData = financialInputs;
        result = onSimulate({
          ...financialInputs,
          size: financialInputs.size[0],
        });
        break;
      case 'revenue':
        simulationData = revenueInputs;
        result = onSimulate({
          ...revenueInputs,
          patients: revenueInputs.patients[0],
        });
        break;
      case 'staffing':
        simulationData = staffingInputs;
        result = onSimulate({
          ...staffingInputs,
          size: staffingInputs.size[0],
        });
        break;
    }
    
    setResult(result);
    
    toast({
      title: "시뮬레이션 완료",
      description: "결과가 생성되었습니다.",
    });
  };

  const renderInputs = () => {
    switch(simulatorType) {
      case 'financial':
        return (
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
        
      case 'revenue':
        return (
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
        
      case 'staffing':
        return (
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
    }
  };

  const renderResults = () => {
    if (!result) return null;
    
    switch(simulatorType) {
      case 'financial':
        return (
          <div className="space-y-4 bg-primary-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold">예상 초기 개원 비용</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm">인테리어 비용</p>
                <p className="font-semibold">{result.interiorCost}</p>
              </div>
              <div>
                <p className="text-sm">장비 비용</p>
                <p className="font-semibold">{result.equipmentCost}</p>
              </div>
              <div>
                <p className="text-sm">인허가 비용</p>
                <p className="font-semibold">{result.licenseCost}</p>
              </div>
              <div>
                <p className="text-sm">기타 비용</p>
                <p className="font-semibold">{result.miscCost}</p>
              </div>
              <div className="col-span-2 pt-2 border-t">
                <p className="text-sm">총 예상 초기 비용</p>
                <p className="font-bold text-xl text-primary">{result.totalCost}</p>
              </div>
            </div>
          </div>
        );
        
      case 'revenue':
        return (
          <div className="space-y-4 bg-primary-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold">예상 월 수익</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm">예상 월 매출</p>
                <p className="font-semibold">{result.revenue}</p>
              </div>
              <div>
                <p className="text-sm">예상 월 지출</p>
                <p className="font-semibold">{result.expenses}</p>
              </div>
              <div className="col-span-2 pt-2 border-t">
                <p className="text-sm">예상 월 순이익</p>
                <p className="font-bold text-xl text-primary">{result.profit}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mt-2">지역 평균 대비</p>
              <div className="h-2 w-full bg-neutral-200 rounded-full mt-1">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{width: `${result.regionComparison}%`}}
                ></div>
              </div>
              <p className="text-right text-xs text-muted-foreground mt-1">
                지역 평균 대비 {result.regionComparison}%
              </p>
            </div>
          </div>
        );
        
      case 'staffing':
        return (
          <div className="space-y-4 bg-primary-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold">추천 인력 구성</h3>
            <ul className="space-y-2">
              {result.staffing.map((staff: any, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">{staff.role}</p>
                    <p className="text-sm text-muted-foreground">{staff.count}명 권장</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t">
              <p className="text-sm">예상 월 인건비</p>
              <p className="font-bold text-xl text-primary">{result.monthlyCost}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className={`transition-all duration-300 ${isExpanded ? 'border-primary shadow-md' : 'hover:border-primary/50'}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-2.5 rounded-full">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Button 
            variant={isExpanded ? "outline" : "ghost"} 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1"
          >
            {isExpanded ? '접기' : '시작하기'} 
            <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <>
          <CardContent className="pt-0 pb-0">
            {renderInputs()}
            {result && (
              <div className="mt-6">
                {renderResults()}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-4 mt-4">
            {!result ? (
              <Button onClick={handleSimulate} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                시뮬레이션 실행
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setResult(null)} className="w-full">
                다시 시뮬레이션하기
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default SimulatorCard;
