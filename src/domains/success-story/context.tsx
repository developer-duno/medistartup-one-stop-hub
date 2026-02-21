
import React, { createContext, useContext, useCallback } from 'react';
import { useSuccessStoriesQuery, useAddSuccessStory, useUpdateSuccessStory, useDeleteSuccessStory } from './queries';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export interface SuccessStory {
  id: number;
  title: string;
  hospital: string;
  location: string;
  services: string[];
  date: string;
  imageUrl: string;
  featured: boolean;
  visible: boolean;
  content: string;
  summary: string;
}

interface SuccessStoriesContextType {
  successStories: SuccessStory[];
  loading: boolean;
  addSuccessStory: (story: Omit<SuccessStory, 'id'>) => Promise<void>;
  updateSuccessStory: (story: SuccessStory) => Promise<void>;
  deleteSuccessStory: (id: number) => Promise<void>;
  toggleVisibility: (id: number) => Promise<void>;
  toggleFeatured: (id: number) => Promise<void>;
  getVisibleStories: () => SuccessStory[];
  getFeaturedStories: () => SuccessStory[];
  refetch: () => Promise<void>;
}

const SuccessStoriesContext = createContext<SuccessStoriesContextType | undefined>(undefined);

export const SuccessStoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: successStories = [], isLoading: loading, refetch } = useSuccessStoriesQuery();
  const addMutation = useAddSuccessStory();
  const updateMutation = useUpdateSuccessStory();
  const deleteMutation = useDeleteSuccessStory();

  const addSuccessStory = useCallback(async (story: Omit<SuccessStory, 'id'>) => {
    await addMutation.mutateAsync(story);
  }, [addMutation]);

  const updateSuccessStory = useCallback(async (story: SuccessStory) => {
    await updateMutation.mutateAsync(story);
  }, [updateMutation]);

  const deleteSuccessStory = useCallback(async (id: number) => {
    await deleteMutation.mutateAsync(id);
  }, [deleteMutation]);

  const toggleVisibility = useCallback(async (id: number) => {
    const story = successStories.find(s => s.id === id);
    if (!story) return;
    const { error } = await supabase.from('success_stories').update({ visible: !story.visible }).eq('id', id);
    if (!error) queryClient.invalidateQueries({ queryKey: ['success-stories'] });
  }, [successStories, queryClient]);

  const toggleFeatured = useCallback(async (id: number) => {
    const story = successStories.find(s => s.id === id);
    if (!story) return;
    const { error } = await supabase.from('success_stories').update({ featured: !story.featured }).eq('id', id);
    if (!error) queryClient.invalidateQueries({ queryKey: ['success-stories'] });
  }, [successStories, queryClient]);

  const getVisibleStories = useCallback(() => successStories.filter(s => s.visible), [successStories]);
  const getFeaturedStories = useCallback(() => successStories.filter(s => s.visible && s.featured), [successStories]);

  return (
    <SuccessStoriesContext.Provider value={{
      successStories,
      loading,
      addSuccessStory,
      updateSuccessStory,
      deleteSuccessStory,
      toggleVisibility,
      toggleFeatured,
      getVisibleStories,
      getFeaturedStories,
      refetch: async () => { await refetch(); },
    }}>
      {children}
    </SuccessStoriesContext.Provider>
  );
};

export const useSuccessStories = () => {
  const context = useContext(SuccessStoriesContext);
  if (context === undefined) {
    throw new Error('useSuccessStories must be used within a SuccessStoriesProvider');
  }
  return context;
};
