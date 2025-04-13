
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { simulateFinancialCosts, simulateRevenue, simulateStaffing } from '@/components/simulator/SimulatorUtils';
import { Simulator, SimulatorTestParams } from './types';
import { useToast } from '@/components/ui/use-toast';

interface SimulatorTestProps {
  simulator: Simulator;
  onBack: () => void;
}

const SimulatorTest: React.FC<SimulatorTestProps> = ({ simulator, onBack }) => {
  const [params, setParams] = useState<SimulatorTestParams>({
    specialty: '내과',
    size: 100,
    location: '중형상가',
    patients: 30,
    region: '서울/경기',
    services: [],
  });
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleParamChange = (key: string, value: any) => {
    setParams({
      ...params,
      [key]: value
    });
  };

  const handleServiceToggle = (service: string) => {
    const newServices = params.services?.includes(service) 
      ? params.services.filter(s => s !== service)
      : [...(params.services || []), service];
    
    handleParamChange('services', newServices);
  };

  const runSimulation = () => {
    let simulationResult;
    
    if (simulator.type === 'financial') {
      simulationResult = simulateFinancialCosts({
        specialty: params.specialty || '내과',
        size: params.size || 100,
        location: params.location || '중형상가'
      });
    } else if (simulator.type === 'revenue') {
      simulationResult = simulateRevenue({
        specialty: params.specialty || '내과',
        patients: params.patients || 30,
        region: params.region || '서울/경기'
      });
    } else if (simulator.type === 'staffing') {
      simulationResult = simulateStaffing({
        specialty: params.specialty || '내과',
        size: params.size || 100,
        services: params.services || []
      });
    }

    setResult(simulationResult);
    
    // Increment the simulator views
    const storedSimulators = localStorage.getItem('simulators');
    if (storedSimulators) {
      try {
        const simulators = JSON.parse(storedSimulators);
        const updatedSimulators = simulators.map((s: Simulator) => 
          s.id === simulator.id ? {...s, views: (s.views || 0) + 1} : s
        );
        localStorage.setItem('simulators', JSON.stringify(updatedSimulators));
      } catch (error) {
        console.error('Error updating simulator views:', error);
      }
    }

    toast({
      title: '시뮬레이션 실행 완료',
      description: `${simulator.title} 시뮬레이션이 성공적으로 실행되었습니다.`,
    });
  };

  const renderInputs = () => {
    switch (simulator.type) {
      case 'financial':
        return (
          <>
            <div className="grid gap-3">
              <Label htmlFor="specialty">진료과목</Label>
              <Select value={params.specialty} onValueChange={(v) => handleParamChange('specialty', v)}>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="진료과목 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="내과">내과</SelectItem>
                  <SelectItem value="소아과">소아과</SelectItem>
                  <SelectItem value="외과">외과</SelectItem>
                  <SelectItem value="산부인과">산부인과</SelectItem>
                  <SelectItem value="피부과">피부과</SelectItem>
                  <SelectItem value="치과">치과</SelectItem>
                  <SelectItem value="정형외과">정형외과</SelectItem>
                  <SelectItem value="안과">안과</SelectItem>
                  <SelectItem value="한의원">한의원</SelectItem>
                  <SelectItem value="종합병원">종합병원</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="size">규모 (평)</Label>
              <Input 
                id="size" 
                type="number"
                value={params.size}
                onChange={(e) => handleParamChange('size', parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="location">위치 유형</Label>
              <Select value={params.location} onValueChange={(v) => handleParamChange('location', v)}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="위치 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="중형상가">중형상가</SelectItem>
                  <SelectItem value="대형상가">대형상가</SelectItem>
                  <SelectItem value="주택가">주택가</SelectItem>
                  <SelectItem value="오피스밀집지역">오피스밀집지역</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
        
      case 'revenue':
        return (
          <>
            <div className="grid gap-3">
              <Label htmlFor="specialty">진료과목</Label>
              <Select value={params.specialty} onValueChange={(v) => handleParamChange('specialty', v)}>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="진료과목 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="내과">내과</SelectItem>
                  <SelectItem value="피부과">피부과</SelectItem>
                  <SelectItem value="정형외과">정형외과</SelectItem>
                  <SelectItem value="안과">안과</SelectItem>
                  <SelectItem value="치과">치과</SelectItem>
                  <SelectItem value="한의원">한의원</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="patients">일일 예상 환자 수</Label>
              <Input 
                id="patients" 
                type="number" 
                value={params.patients}
                onChange={(e) => handleParamChange('patients', parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="region">지역</Label>
              <Select value={params.region} onValueChange={(v) => handleParamChange('region', v)}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="지역 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="서울/경기">서울/경기</SelectItem>
                  <SelectItem value="부산/경남">부산/경남</SelectItem>
                  <SelectItem value="대전/충남">대전/충남</SelectItem>
                  <SelectItem value="대구/경북">대구/경북</SelectItem>
                  <SelectItem value="광주/전라">광주/전라</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
        
      case 'staffing':
        return (
          <>
            <div className="grid gap-3">
              <Label htmlFor="specialty">진료과목</Label>
              <Select value={params.specialty} onValueChange={(v) => handleParamChange('specialty', v)}>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="진료과목 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="내과">내과</SelectItem>
                  <SelectItem value="치과">치과</SelectItem>
                  <SelectItem value="한의원">한의원</SelectItem>
                  <SelectItem value="종합병원">종합병원</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="size">규모 (평)</Label>
              <Input 
                id="size" 
                type="number"
                value={params.size}
                onChange={(e) => handleParamChange('size', parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid gap-3">
              <Label>제공 서비스</Label>
              <div className="flex flex-wrap gap-2">
                {['수술', '미용', '검진', '입원'].map(service => (
                  <Button 
                    key={service}
                    variant={params.services?.includes(service) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleServiceToggle(service)}
                  >
                    {service}
                  </Button>
                ))}
              </div>
            </div>
          </>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">알 수 없는 시뮬레이터 유형입니다.</p>
          </div>
        );
    }
  };

  const renderResults = () => {
    if (!result) return null;

    switch (simulator.type) {
      case 'financial':
        return (
          <div className="grid gap-4">
            <h3 className="font-bold text-xl">시뮬레이션 결과</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-500">내부 인테리어 비용</p>
                <p className="text-xl font-bold">{result.interiorCost}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-500">의료장비 비용</p>
                <p className="text-xl font-bold">{result.equipmentCost}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-500">인허가 비용</p>
                <p className="text-xl font-bold">{result.licenseCost}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-500">기타 비용</p>
                <p className="text-xl font-bold">{result.miscCost}</p>
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg mt-2">
              <p className="text-sm text-gray-500">총 예상 비용</p>
              <p className="text-2xl font-bold">{result.totalCost}</p>
            </div>
          </div>
        );
        
      case 'revenue':
        return (
          <div className="grid gap-4">
            <h3 className="font-bold text-xl">시뮬레이션 결과</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-500">월 예상 수익</p>
                <p className="text-xl font-bold">{result.revenue}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-500">월 예상 지출</p>
                <p className="text-xl font-bold">{result.expenses}</p>
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg mt-2">
              <p className="text-sm text-gray-500">월 예상 순이익</p>
              <p className="text-2xl font-bold">{result.profit}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">지역 평균 대비</p>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-2 bg-primary rounded-full" 
                  style={{ width: `${result.regionComparison}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
                <span>150%</span>
              </div>
            </div>
          </div>
        );
        
      case 'staffing':
        return (
          <div className="grid gap-4">
            <h3 className="font-bold text-xl">시뮬레이션 결과</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">직책</th>
                    <th className="border p-2 text-left">필요 인원</th>
                    <th className="border p-2 text-left">예상 월급 (1인)</th>
                    <th className="border p-2 text-left">총 비용</th>
                  </tr>
                </thead>
                <tbody>
                  {result.staffing.map((staff: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border p-2">{staff.role}</td>
                      <td className="border p-2">{staff.count}명</td>
                      <td className="border p-2">{staff.salary}만원</td>
                      <td className="border p-2">{staff.count * staff.salary}만원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg mt-2">
              <p className="text-sm text-gray-500">총 인건비 (월)</p>
              <p className="text-2xl font-bold">{result.monthlyCost}</p>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">결과를 표시할 수 없습니다.</p>
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{simulator.title} 테스트</CardTitle>
            <CardDescription>{simulator.description}</CardDescription>
          </div>
          <Button variant="outline" onClick={onBack}>
            뒤로 가기
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">시뮬레이션 설정</h3>
            <div className="grid gap-6">
              {renderInputs()}
            </div>
            <Button 
              className="mt-6 w-full"
              onClick={runSimulation}
              disabled={!simulator.active}
            >
              <Play className="h-4 w-4 mr-2" />
              시뮬레이션 실행
            </Button>
          </div>
          
          <div>
            {result ? (
              renderResults()
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <ArrowRight className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-muted-foreground">
                  시뮬레이션을 실행하면 여기에 결과가 표시됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Separator className="mb-4" />
        <div className="text-sm text-muted-foreground">
          <p>이 시뮬레이션은 현재까지 <strong>{simulator.views || 0}회</strong> 실행되었습니다.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SimulatorTest;
