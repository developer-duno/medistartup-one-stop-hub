
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { InsightType } from '@/components/admin/insights/types';

const INSIGHTS_KEY = ['insights'] as const;

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

const fetchInsights = async (): Promise<InsightType[]> => {
  const { data, error } = await supabase
    .from('insights')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return (data || []).map(mapRow);
};

export const useInsightsQuery = () => {
  return useQuery({
    queryKey: INSIGHTS_KEY,
    queryFn: fetchInsights,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    
  });
};

export const useAddInsight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (insight: InsightType) => {
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
      return mapRow(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INSIGHTS_KEY });
    },
  });
};

export const useUpdateInsight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (insight: InsightType) => {
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
      return insight;
    },
    onSuccess: (insight) => {
      queryClient.setQueryData<InsightType[]>(INSIGHTS_KEY, (old) =>
        old?.map((i) => (i.id === insight.id ? insight : i))
      );
    },
  });
};

export const useDeleteInsight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('insights').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<InsightType[]>(INSIGHTS_KEY, (old) =>
        old?.filter((i) => i.id !== id)
      );
    },
  });
};
