
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockInsights } from '@/components/admin/insights/insightData';
import { InsightType } from '@/components/admin/insights/types';
import { useToast } from '@/hooks/use-toast';

interface InsightsContextType {
  insights: InsightType[];
  addInsight: (insight: InsightType) => void;
  updateInsight: (insight: InsightType) => void;
  deleteInsight: (id: number) => void;
  getInsightsByCategory: (category: string) => InsightType[];
  fetchExternalInsights: (apiUrl: string) => Promise<void>;
}

const InsightsContext = createContext<InsightsContextType | undefined>(undefined);

export const useInsights = () => {
  const context = useContext(InsightsContext);
  if (!context) {
    throw new Error('useInsights must be used within an InsightsProvider');
  }
  return context;
};

export const InsightsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [insights, setInsights] = useState<InsightType[]>(mockInsights);
  const { toast } = useToast();

  // Load insights from localStorage on initialization
  useEffect(() => {
    const storedInsights = localStorage.getItem('insights');
    if (storedInsights) {
      try {
        setInsights(JSON.parse(storedInsights));
      } catch (error) {
        console.error('Error parsing stored insights:', error);
      }
    }
  }, []);

  // Save insights to localStorage when they change
  useEffect(() => {
    localStorage.setItem('insights', JSON.stringify(insights));
  }, [insights]);

  const addInsight = (insight: InsightType) => {
    const newInsight = {
      ...insight,
      id: insights.length > 0 ? Math.max(...insights.map(i => i.id)) + 1 : 1,
    };
    setInsights([...insights, newInsight]);
    toast({
      title: "인사이트 추가 완료",
      description: "새로운 인사이트가 성공적으로 추가되었습니다.",
    });
  };

  const updateInsight = (insight: InsightType) => {
    setInsights(insights.map(i => (i.id === insight.id ? insight : i)));
    toast({
      title: "인사이트 업데이트 완료",
      description: "인사이트가 성공적으로 업데이트되었습니다.",
    });
  };

  const deleteInsight = (id: number) => {
    setInsights(insights.filter(i => i.id !== id));
    toast({
      title: "인사이트 삭제 완료",
      description: "인사이트가 성공적으로 삭제되었습니다.",
    });
  };

  const getInsightsByCategory = (category: string) => {
    return category === 'all' ? insights : insights.filter(i => i.category === category);
  };

  // External API integration for insights
  const fetchExternalInsights = async (apiUrl: string) => {
    try {
      toast({
        title: "데이터 불러오는 중",
        description: "외부 API에서 인사이트를 불러오는 중입니다.",
      });

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process and format the data according to our InsightType
      const formattedInsights: InsightType[] = data.map((item: any, index: number) => ({
        id: insights.length > 0 ? Math.max(...insights.map(i => i.id)) + 1 + index : 1 + index,
        title: item.title || '제목 없음',
        excerpt: item.excerpt || item.description || item.summary || '요약 없음',
        content: item.content || item.body || item.text || '내용 없음',
        category: item.category || 'trend',
        author: item.author || item.writer || '작성자 미상',
        date: item.date || item.publishedAt || new Date().toISOString().split('T')[0],
        image: item.image || item.thumbnail || item.imageUrl || 'https://placehold.co/600x400?text=No+Image',
        views: item.views || 0
      }));
      
      // Add the new insights
      setInsights(prev => [...prev, ...formattedInsights]);
      
      toast({
        title: "데이터 불러오기 성공",
        description: `${formattedInsights.length}개의 새로운 인사이트를 성공적으로 불러왔습니다.`,
      });
    } catch (error) {
      console.error('인사이트 불러오기 에러:', error);
      toast({
        title: "데이터 불러오기 실패",
        description: `외부 API에서 인사이트를 불러오는 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        variant: "destructive",
      });
    }
  };

  const contextValue = {
    insights,
    addInsight,
    updateInsight,
    deleteInsight,
    getInsightsByCategory,
    fetchExternalInsights,
  };

  return (
    <InsightsContext.Provider value={contextValue}>
      {children}
    </InsightsContext.Provider>
  );
};
