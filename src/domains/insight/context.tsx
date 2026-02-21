
import React, { createContext, useContext, useCallback } from 'react';
import { InsightType } from '@/components/admin/insights/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useInsightsQuery, useAddInsight, useUpdateInsight, useDeleteInsight } from './queries';

interface InsightsContextType {
  insights: InsightType[];
  loading: boolean;
  addInsight: (insight: InsightType) => void;
  updateInsight: (insight: InsightType) => void;
  deleteInsight: (id: number) => void;
  getInsightsByCategory: (category: string) => InsightType[];
  fetchExternalInsights: (apiUrl: string) => Promise<void>;
  refetch: () => Promise<void>;
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
  const { toast } = useToast();
  const { data: insights = [], isLoading: loading, refetch } = useInsightsQuery();
  const addMutation = useAddInsight();
  const updateMutation = useUpdateInsight();
  const deleteMutation = useDeleteInsight();

  const addInsight = useCallback(async (insight: InsightType) => {
    try {
      await addMutation.mutateAsync(insight);
      toast({ title: "인사이트 추가 완료", description: "새로운 인사이트가 성공적으로 추가되었습니다." });
    } catch {
      toast({ title: "오류", description: "인사이트 추가에 실패했습니다.", variant: "destructive" });
    }
  }, [addMutation, toast]);

  const updateInsight = useCallback(async (insight: InsightType) => {
    try {
      await updateMutation.mutateAsync(insight);
      toast({ title: "인사이트 업데이트 완료", description: "인사이트가 성공적으로 업데이트되었습니다." });
    } catch {
      toast({ title: "오류", description: "인사이트 업데이트에 실패했습니다.", variant: "destructive" });
    }
  }, [updateMutation, toast]);

  const deleteInsight = useCallback(async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "인사이트 삭제 완료", description: "인사이트가 성공적으로 삭제되었습니다." });
    } catch {
      toast({ title: "오류", description: "인사이트 삭제에 실패했습니다.", variant: "destructive" });
    }
  }, [deleteMutation, toast]);

  const getInsightsByCategory = useCallback((category: string) => {
    return category === 'all' ? insights : insights.filter(i => i.category === category);
  }, [insights]);

  const fetchExternalInsights = useCallback(async (apiUrl: string) => {
    try {
      toast({ title: "데이터 불러오는 중", description: "외부 API에서 인사이트를 불러오는 중입니다." });
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`);
      const data = await response.json();

      const formattedInsights = data.map((item: any) => ({
        title: item.title || '제목 없음',
        excerpt: item.excerpt || item.description || item.summary || '요약 없음',
        content: item.content || item.body || item.text || '내용 없음',
        category: item.category || 'trend',
        author: item.author || item.writer || '작성자 미상',
        date: item.date || item.publishedAt || new Date().toISOString().split('T')[0],
        image: item.image || item.thumbnail || item.imageUrl || 'https://placehold.co/600x400?text=No+Image',
        views: item.views || 0,
      }));

      const { error } = await supabase.from('insights').insert(formattedInsights);
      if (error) throw error;

      await refetch();
      toast({ title: "데이터 불러오기 성공", description: `${formattedInsights.length}개의 새로운 인사이트를 성공적으로 불러왔습니다.` });
    } catch (error) {
      toast({
        title: "데이터 불러오기 실패",
        description: `외부 API에서 인사이트를 불러오는 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        variant: "destructive",
      });
    }
  }, [refetch, toast]);

  return (
    <InsightsContext.Provider value={{
      insights,
      loading,
      addInsight,
      updateInsight,
      deleteInsight,
      getInsightsByCategory,
      fetchExternalInsights,
      refetch: async () => { await refetch(); },
    }}>
      {children}
    </InsightsContext.Provider>
  );
};
