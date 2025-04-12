
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SimulatorOption } from '../types';

export function useSimulatorOptions() {
  const { toast } = useToast();
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
    
    setEditingOption(null);
  };

  return {
    simulatorOptions,
    editingOption,
    setEditingOption,
    handleAddOption,
    handleEditOption,
    handleDeleteOption,
    handleUpdateOption
  };
}
