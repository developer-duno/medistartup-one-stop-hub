
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { InsightType } from '@/components/admin/insights/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

const mapRow = (row: any): InsightType => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  category: row.category,
  author: row.author,
  date: row.date,
  image: row.image,
  views: row.views,
});

export const InsightsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [insights, setInsights] = useState<InsightType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInsights = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setInsights((data || []).map(mapRow));
    } catch (err) {
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const addInsight = async (insight: InsightType) => {
    try {
      const { data, error } = await supabase
        .from('insights')
        .insert({
          title: insight.title,
          excerpt: insight.excerpt,
          content: insight.content,
          category: insight.category,
          author: insight.author,
          date: insight.date,
          image: insight.image,
          views: insight.views || 0,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setInsights(prev => [...prev, mapRow(data)]);
        toast({ title: "인사이트 추가 완료", description: "새로운 인사이트가 성공적으로 추가되었습니다." });
      }
    } catch (err) {
      console.error('Error adding insight:', err);
      toast({ title: "오류", description: "인사이트 추가에 실패했습니다.", variant: "destructive" });
    }
  };

  const updateInsight = async (insight: InsightType) => {
    try {
      const { error } = await supabase
        .from('insights')
        .update({
          title: insight.title,
          excerpt: insight.excerpt,
          content: insight.content,
          category: insight.category,
          author: insight.author,
          date: insight.date,
          image: insight.image,
          views: insight.views,
        })
        .eq('id', insight.id);

      if (error) throw error;

      setInsights(prev => prev.map(i => i.id === insight.id ? insight : i));
      toast({ title: "인사이트 업데이트 완료", description: "인사이트가 성공적으로 업데이트되었습니다." });
    } catch (err) {
      console.error('Error updating insight:', err);
      toast({ title: "오류", description: "인사이트 업데이트에 실패했습니다.", variant: "destructive" });
    }
  };

  const deleteInsight = async (id: number) => {
    try {
      const { error } = await supabase
        .from('insights')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInsights(prev => prev.filter(i => i.id !== id));
      toast({ title: "인사이트 삭제 완료", description: "인사이트가 성공적으로 삭제되었습니다." });
    } catch (err) {
      console.error('Error deleting insight:', err);
      toast({ title: "오류", description: "인사이트 삭제에 실패했습니다.", variant: "destructive" });
    }
  };

  const getInsightsByCategory = (category: string) => {
    return category === 'all' ? insights : insights.filter(i => i.category === category);
  };

  const fetchExternalInsights = async (apiUrl: string) => {
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

      // Insert all into DB
      const { data: insertedData, error } = await supabase
        .from('insights')
        .insert(formattedInsights)
        .select();

      if (error) throw error;

      if (insertedData) {
        setInsights(prev => [...prev, ...insertedData.map(mapRow)]);
      }

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

  return (
    <InsightsContext.Provider value={{
      insights,
      loading,
      addInsight,
      updateInsight,
      deleteInsight,
      getInsightsByCategory,
      fetchExternalInsights,
      refetch: fetchInsights,
    }}>
      {children}
    </InsightsContext.Provider>
  );
};
