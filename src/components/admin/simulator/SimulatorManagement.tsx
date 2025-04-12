
import React, { useState } from 'react';
import { Plus, Edit, Trash2, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface SimulatorOption {
  id: string;
  title: string;
  category: string;
  values: { name: string; cost: number }[];
}

const SimulatorManagement: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("options");
  const [simulatorOptions, setSimulatorOptions] = useState<SimulatorOption[]>([
    {
      id: "1",
      title: "내과 개원 비용",
      category: "재무 시뮬레이터",
      values: [
        { name: "인테리어 (30평 기준)", cost: 9000 },
        { name: "의료장비 (기본세트)", cost: 12000 },
        { name: "인허가 비용", cost: 500 },
        { name: "초기 운영비 (3개월)", cost: 4500 }
      ]
    },
    {
      id: "2",
      title: "치과 개원 비용",
      category: "재무 시뮬레이터",
      values: [
        { name: "인테리어 (25평 기준)", cost: 8000 },
        { name: "치과 장비 (유닛체어 4대)", cost: 20000 },
        { name: "인허가 비용", cost: 500 },
        { name: "초기 운영비 (3개월)", cost: 5000 }
      ]
    },
    {
      id: "3",
      title: "강남구 입지 분석",
      category: "입지 시뮬레이터",
      values: [
        { name: "유동인구 밀집도", cost: 95 },
        { name: "경쟁 의원 수", cost: 87 },
        { name: "임대료 수준", cost: 92 },
        { name: "접근성 지수", cost: 88 }
      ]
    }
  ]);

  const [editingOption, setEditingOption] = useState<SimulatorOption | null>(null);

  const handleAddOption = () => {
    const newOption: SimulatorOption = {
      id: Date.now().toString(),
      title: "새 시뮬레이터 옵션",
      category: "재무 시뮬레이터",
      values: [{ name: "항목 1", cost: 0 }]
    };
    
    setSimulatorOptions([...simulatorOptions, newOption]);
    toast({
      title: "옵션 추가됨",
      description: "새로운 시뮬레이터 옵션이 추가되었습니다.",
      variant: "success",
    });
  };

  const handleEditOption = (option: SimulatorOption) => {
    setEditingOption(option);
    setActiveTab("edit");
  };

  const handleDeleteOption = (optionId: string) => {
    setSimulatorOptions(simulatorOptions.filter(option => option.id !== optionId));
    toast({
      title: "옵션 삭제됨",
      description: "시뮬레이터 옵션이 삭제되었습니다.",
      variant: "success",
    });
  };

  const handleUpdateOption = () => {
    if (!editingOption) return;
    
    setSimulatorOptions(simulatorOptions.map(option => 
      option.id === editingOption.id ? editingOption : option
    ));
    
    toast({
      title: "옵션 업데이트됨",
      description: "시뮬레이터 옵션이 업데이트되었습니다.",
      variant: "success",
    });
    
    setActiveTab("options");
    setEditingOption(null);
  };

  const handleAddValue = () => {
    if (!editingOption) return;
    
    setEditingOption({
      ...editingOption,
      values: [...editingOption.values, { name: "새 항목", cost: 0 }]
    });
  };

  const handleValueChange = (index: number, field: 'name' | 'cost', value: string | number) => {
    if (!editingOption) return;
    
    const newValues = [...editingOption.values];
    newValues[index][field] = field === 'cost' ? Number(value) : value;
    
    setEditingOption({
      ...editingOption,
      values: newValues
    });
  };

  const handleDeleteValue = (index: number) => {
    if (!editingOption || editingOption.values.length <= 1) return;
    
    const newValues = editingOption.values.filter((_, i) => i !== index);
    
    setEditingOption({
      ...editingOption,
      values: newValues
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-pretendard font-bold text-2xl mb-6">시뮬레이터 관리</h2>
        <Button onClick={handleAddOption}>
          <Plus className="h-4 w-4 mr-2" />
          시뮬레이터 옵션 추가
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="options">
            <BarChart3 className="h-4 w-4 mr-2" />
            시뮬레이터 옵션
          </TabsTrigger>
          <TabsTrigger value="edit" disabled={!editingOption}>
            <Settings className="h-4 w-4 mr-2" />
            옵션 편집
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="options">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {simulatorOptions.map((option) => (
              <Card key={option.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex justify-between items-center">
                    {option.title}
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditOption(option)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteOption(option.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{option.category}</p>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-2">항목</th>
                        <th className="pb-2 text-right">{option.category.includes('재무') ? '비용 (만원)' : '점수'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {option.values.map((value, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2">{value.name}</td>
                          <td className="py-2 text-right font-medium">
                            {option.category.includes('재무') 
                              ? `${value.cost.toLocaleString()}만원` 
                              : `${value.cost}/100`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {option.category.includes('재무') && (
                      <tfoot>
                        <tr className="border-t">
                          <td className="py-2 font-bold">총 비용</td>
                          <td className="py-2 text-right font-bold">
                            {option.values.reduce((sum, item) => sum + item.cost, 0).toLocaleString()}만원
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="edit">
          {editingOption && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">시뮬레이터 옵션 편집</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="option-title">
                      시뮬레이터 제목
                    </label>
                    <input
                      id="option-title"
                      className="w-full p-2 border rounded"
                      value={editingOption.title}
                      onChange={(e) => setEditingOption({...editingOption, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="option-category">
                      카테고리
                    </label>
                    <select
                      id="option-category"
                      className="w-full p-2 border rounded"
                      value={editingOption.category}
                      onChange={(e) => setEditingOption({...editingOption, category: e.target.value})}
                    >
                      <option value="재무 시뮬레이터">재무 시뮬레이터</option>
                      <option value="입지 시뮬레이터">입지 시뮬레이터</option>
                      <option value="수익 시뮬레이터">수익 시뮬레이터</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">항목</label>
                    <Button size="sm" variant="outline" onClick={handleAddValue}>
                      <Plus className="h-4 w-4 mr-1" />
                      항목 추가
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {editingOption.values.map((value, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          className="flex-1 p-2 border rounded"
                          value={value.name}
                          onChange={(e) => handleValueChange(index, 'name', e.target.value)}
                        />
                        <input
                          className="w-32 p-2 border rounded"
                          type="number"
                          value={value.cost}
                          onChange={(e) => handleValueChange(index, 'cost', e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDeleteValue(index)}
                          disabled={editingOption.values.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => {
                    setActiveTab("options");
                    setEditingOption(null);
                  }}>
                    취소
                  </Button>
                  <Button onClick={handleUpdateOption}>
                    저장하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulatorManagement;
