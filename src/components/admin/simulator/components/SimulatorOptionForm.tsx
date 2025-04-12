
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SimulatorOption } from '../types';

interface SimulatorOptionFormProps {
  editingOption: SimulatorOption;
  setEditingOption: React.Dispatch<React.SetStateAction<SimulatorOption | null>>;
  onCancel: () => void;
  onSave: () => void;
}

const SimulatorOptionForm: React.FC<SimulatorOptionFormProps> = ({ 
  editingOption, 
  setEditingOption, 
  onCancel, 
  onSave 
}) => {
  const handleAddValue = () => {
    setEditingOption({
      ...editingOption,
      values: [...editingOption.values, { name: "새 항목", cost: 0 }]
    });
  };

  const handleValueChange = (index: number, field: 'name' | 'cost', value: string | number) => {
    const newValues = [...editingOption.values];
    if (field === 'name') {
      newValues[index].name = value as string;
    } else if (field === 'cost') {
      newValues[index].cost = Number(value);
    }
    
    setEditingOption({
      ...editingOption,
      values: newValues
    });
  };

  const handleDeleteValue = (index: number) => {
    if (editingOption.values.length <= 1) return;
    
    const newValues = editingOption.values.filter((_, i) => i !== index);
    
    setEditingOption({
      ...editingOption,
      values: newValues
    });
  };

  return (
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
          <Button variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button onClick={onSave}>
            저장하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatorOptionForm;
