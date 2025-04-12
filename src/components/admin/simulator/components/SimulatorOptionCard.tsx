
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SimulatorOption } from '../types';

interface SimulatorOptionCardProps {
  option: SimulatorOption;
  onEdit: (option: SimulatorOption) => void;
  onDelete: (optionId: string) => void;
}

const SimulatorOptionCard: React.FC<SimulatorOptionCardProps> = ({ option, onEdit, onDelete }) => {
  return (
    <Card key={option.id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between items-center">
          {option.title}
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(option)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(option.id)}>
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
  );
};

export default SimulatorOptionCard;
