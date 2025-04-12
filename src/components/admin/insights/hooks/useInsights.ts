
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Insight } from '../types';

export function useInsights() {
  const { toast } = useToast();
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: 1,
      title: "2025년 병원창업 트렌드 보고서 - 의료정책 변화와 대응방안",
      category: "트렌드 리포트",
      date: "2025.03.15",
      image: "https://images.unsplash.com/photo-1576091160550-bdfa8387f952?q=80&w=2070&auto=format&fit=crop",
      excerpt: "2025년 1월부터 시행된 '의료기관 개설 허가 간소화법'의 핵심 내용과 개원의가 알아야 할 대응 방안을 소개합니다."
    },
    {
      id: 2,
      title: "디지털 헬스케어 시대의 병원 공간 설계 - 효율과 환자경험의 균형",
      category: "설계 & 인테리어",
      date: "2025.02.28",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      excerpt: "디지털 장비와 전통적 의료공간의 조화로운 설계로 환자 만족도와 진료 효율성을 모두 높이는 방법을 알아봅니다."
    },
    {
      id: 3,
      title: "빅데이터로 보는 2025년 입지 분석 - 지역별 의료수요 예측",
      category: "입지 분석",
      date: "2025.02.10",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      excerpt: "최신 인구통계와 의료이용 패턴 데이터를 기반으로 2025년 지역별 의료수요 변화를 예측하고 분석합니다."
    }
  ]);
  
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const categories = ["트렌드 리포트", "설계 & 인테리어", "입지 분석", "재무", "인허가", "마케팅", "인력 채용", "의료기기", "의료폐기물"];

  const handleAddInsight = () => {
    const newInsight: Insight = {
      id: Date.now(),
      title: "",
      category: categories[0],
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      image: "https://images.unsplash.com/photo-1576091160550-bdfa8387f952?q=80&w=2070&auto=format&fit=crop",
      excerpt: ""
    };
    
    setEditingInsight(newInsight);
    return newInsight;
  };

  const handleEditInsight = (insight: Insight) => {
    setEditingInsight({...insight});
    return {...insight};
  };

  const handleDeleteInsight = (id: number) => {
    setInsights(insights.filter(insight => insight.id !== id));
    toast({
      title: "인사이트 삭제됨",
      description: "선택한 인사이트가 삭제되었습니다.",
      variant: "success",
    });
  };

  const handleSaveInsight = () => {
    if (!editingInsight) return false;
    
    if (!editingInsight.title.trim()) {
      toast({
        title: "제목을 입력해주세요",
        variant: "destructive",
      });
      return false;
    }
    
    if (!editingInsight.excerpt.trim()) {
      toast({
        title: "요약을 입력해주세요",
        variant: "destructive",
      });
      return false;
    }
    
    const existingIndex = insights.findIndex(i => i.id === editingInsight.id);
    
    if (existingIndex >= 0) {
      // Update existing insight
      const updatedInsights = [...insights];
      updatedInsights[existingIndex] = editingInsight;
      setInsights(updatedInsights);
      
      toast({
        title: "인사이트 업데이트됨",
        description: "인사이트가 성공적으로 업데이트되었습니다.",
        variant: "success",
      });
    } else {
      // Add new insight
      setInsights([...insights, editingInsight]);
      
      toast({
        title: "인사이트 추가됨",
        description: "새로운 인사이트가 추가되었습니다.",
        variant: "success",
      });
    }
    
    setEditingInsight(null);
    return true;
  };

  return {
    insights,
    editingInsight,
    setEditingInsight,
    categories,
    handleAddInsight,
    handleEditInsight,
    handleDeleteInsight,
    handleSaveInsight
  };
}
