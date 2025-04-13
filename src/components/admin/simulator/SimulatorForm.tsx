
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';

interface Simulator {
  id: number;
  title: string;
  description: string;
  type: string;
  active: boolean;
  views: number;
}

interface SimulatorFormProps {
  simulator: Simulator;
  onSave: () => void;
  onCancel: () => void;
  onUpdate: (field: string, value: any) => void;
}

const SimulatorForm: React.FC<SimulatorFormProps> = ({
  simulator,
  onSave,
  onCancel,
  onUpdate
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {simulator.id ? '시뮬레이터 수정' : '새 시뮬레이터 추가'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">시뮬레이터 이름</Label>
            <Input 
              id="title"
              value={simulator.title}
              onChange={(e) => onUpdate('title', e.target.value)}
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="description">설명</Label>
            <Input 
              id="description"
              value={simulator.description}
              onChange={(e) => onUpdate('description', e.target.value)}
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="type">유형</Label>
            <Select 
              value={simulator.type}
              onValueChange={(value) => onUpdate('type', value)}
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
              checked={simulator.active}
              onCheckedChange={(checked) => onUpdate('active', checked)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          저장
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimulatorForm;
