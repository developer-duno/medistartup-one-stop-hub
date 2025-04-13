
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2 } from 'lucide-react';

interface Simulator {
  id: number;
  title: string;
  description: string;
  type: string;
  active: boolean;
  views: number;
}

interface SimulatorListProps {
  simulators: Simulator[];
  onEdit: (simulator: Simulator) => void;
  onToggleActive: (id: number) => void;
  onDelete: (id: number) => void;
}

const SimulatorList: React.FC<SimulatorListProps> = ({
  simulators,
  onEdit,
  onToggleActive,
  onDelete
}) => {
  return (
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
                  onCheckedChange={() => onToggleActive(simulator.id)}
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
                <Button variant="outline" size="sm" onClick={() => onEdit(simulator)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(simulator.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SimulatorList;
