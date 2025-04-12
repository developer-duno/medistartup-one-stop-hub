
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Edit, Plus, Save, Trash2, BarChart3 } from 'lucide-react';

// Mock simulator data
const mockSimulators = [
  {
    id: 1,
    title: '개원 비용 시뮬레이터',
    description: '진료과목별 평균 개원 비용 시뮬레이션',
    type: 'financial',
    active: true,
    views: 1240
  },
  {
    id: 2,
    title: '수익성 분석 시뮬레이터',
    description: '지역 및 진료과목별 예상 수익 시뮬레이션',
    type: 'revenue',
    active: true,
    views: 890
  },
  {
    id: 3,
    title: '인력 구성 시뮬레이터',
    description: '병원 규모별 최적 인력 구성 시뮬레이션',
    type: 'staffing',
    active: false,
    views: 560
  }
];

// Mock simulator usage data
const mockUsageData = [
  { date: '2023-01', views: 120 },
  { date: '2023-02', views: 150 },
  { date: '2023-03', views: 200 },
  { date: '2023-04', views: 180 },
  { date: '2023-05', views: 220 },
  { date: '2023-06', views: 250 }
];

const SimulatorManagement: React.FC = () => {
  const [simulators, setSimulators] = useState(mockSimulators);
  const [editingSimulator, setEditingSimulator] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('list');

  const handleEditSimulator = (simulator: any) => {
    setEditingSimulator({...simulator});
    setActiveTab('edit');
  };

  const handleCreateSimulator = () => {
    setEditingSimulator({
      id: Math.max(...simulators.map(s => s.id)) + 1,
      title: '',
      description: '',
      type: 'financial',
      active: true,
      views: 0
    });
    setActiveTab('edit');
  };

  const handleSaveSimulator = () => {
    if (!editingSimulator) return;
    
    const updatedSimulators = editingSimulator.id 
      ? simulators.map(s => s.id === editingSimulator.id ? editingSimulator : s)
      : [...simulators, editingSimulator];
    
    setSimulators(updatedSimulators);
    setEditingSimulator(null);
    setActiveTab('list');
  };

  const handleDeleteSimulator = (id: number) => {
    setSimulators(simulators.filter(s => s.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setSimulators(simulators.map(s => 
      s.id === id ? {...s, active: !s.active} : s
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">시뮬레이터 관리</h2>
        {activeTab === 'list' && (
          <Button onClick={handleCreateSimulator}>
            <Plus className="h-4 w-4 mr-2" />
            시뮬레이터 추가
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list">시뮬레이터 목록</TabsTrigger>
          <TabsTrigger value="usage">사용 통계</TabsTrigger>
          <TabsTrigger value="edit" disabled={!editingSimulator}>
            {editingSimulator?.id ? '시뮬레이터 수정' : '시뮬레이터 추가'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시뮬레이터 이름</TableHead>
                <TableHead>설명</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>조회수</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {simulators.map((simulator) => (
                <TableRow key={simulator.id}>
                  <TableCell className="font-medium">{simulator.title}</TableCell>
                  <TableCell>{simulator.description}</TableCell>
                  <TableCell>
                    {simulator.type === 'financial' && '재무'}
                    {simulator.type === 'revenue' && '수익'}
                    {simulator.type === 'staffing' && '인력'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Switch 
                        checked={simulator.active} 
                        onCheckedChange={() => handleToggleActive(simulator.id)}
                        className="mr-2"
                      />
                      <span className={simulator.active ? "text-green-600" : "text-gray-400"}>
                        {simulator.active ? "활성" : "비활성"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{simulator.views}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditSimulator(simulator)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteSimulator(simulator.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>시뮬레이터 사용 통계</CardTitle>
              <CardDescription>지난 6개월간 시뮬레이터 사용량</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center flex flex-col items-center">
                    <BarChart3 className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-muted-foreground">통계 차트는 개발 중입니다.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {mockUsageData.reduce((total, d) => total + d.views, 0)} 총 조회수
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          {editingSimulator && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingSimulator.id ? '시뮬레이터 수정' : '새 시뮬레이터 추가'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="title">시뮬레이터 이름</Label>
                    <Input 
                      id="title"
                      value={editingSimulator.title}
                      onChange={(e) => setEditingSimulator({...editingSimulator, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="description">설명</Label>
                    <Input 
                      id="description"
                      value={editingSimulator.description}
                      onChange={(e) => setEditingSimulator({...editingSimulator, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="type">유형</Label>
                    <Select 
                      value={editingSimulator.type}
                      onValueChange={(value) => setEditingSimulator({...editingSimulator, type: value})}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="유형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">재무</SelectItem>
                        <SelectItem value="revenue">수익</SelectItem>
                        <SelectItem value="staffing">인력</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Label htmlFor="active">활성화</Label>
                    <Switch 
                      id="active"
                      checked={editingSimulator.active}
                      onCheckedChange={(checked) => setEditingSimulator({...editingSimulator, active: checked})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setEditingSimulator(null);
                  setActiveTab('list');
                }}>
                  취소
                </Button>
                <Button onClick={handleSaveSimulator}>
                  <Save className="h-4 w-4 mr-2" />
                  저장
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulatorManagement;
