
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SuccessStory } from './context';

const STORIES_KEY = ['success-stories'] as const;

const mapRow = (row: any): SuccessStory => ({
  id: row.id,
  title: row.title,
  hospital: row.hospital,
  location: row.location,
  services: row.services || [],
  date: row.date,
  imageUrl: row.image_url,
  featured: row.featured,
  visible: row.visible,
  content: row.content,
  summary: row.summary,
});

const fetchStories = async (): Promise<SuccessStory[]> => {
  const { data, error } = await supabase
    .from('success_stories')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return (data || []).map(mapRow);
};

export const useSuccessStoriesQuery = () => {
  return useQuery({
    queryKey: STORIES_KEY,
    queryFn: fetchStories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    
  });
};

export const useAddSuccessStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (story: Omit<SuccessStory, 'id'>) => {
      const { error } = await supabase.from('success_stories').insert({
        title: story.title,
        hospital: story.hospital,
        location: story.location,
        services: story.services,
        date: story.date,
        image_url: story.imageUrl,
        featured: story.featured,
        visible: story.visible,
        content: story.content,
        summary: story.summary,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STORIES_KEY });
    },
  });
};

export const useUpdateSuccessStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (story: SuccessStory) => {
      const { error } = await supabase.from('success_stories').update({
        title: story.title,
        hospital: story.hospital,
        location: story.location,
        services: story.services,
        date: story.date,
        image_url: story.imageUrl,
        featured: story.featured,
        visible: story.visible,
        content: story.content,
        summary: story.summary,
      }).eq('id', story.id);
      if (error) throw error;
      return story;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STORIES_KEY });
    },
  });
};

export const useDeleteSuccessStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('success_stories').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STORIES_KEY });
    },
  });
};
