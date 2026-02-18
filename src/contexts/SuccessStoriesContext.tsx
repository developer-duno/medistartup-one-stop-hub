
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

export const SuccessStoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      setSuccessStories((data || []).map(mapRow));
    } catch (err) {
      console.error('Failed to fetch success stories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const addSuccessStory = async (story: Omit<SuccessStory, 'id'>) => {
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
    await fetchStories();
  };

  const updateSuccessStory = async (story: SuccessStory) => {
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
    await fetchStories();
  };

  const deleteSuccessStory = async (id: number) => {
    const { error } = await supabase.from('success_stories').delete().eq('id', id);
    if (error) throw error;
    await fetchStories();
  };

  const toggleVisibility = async (id: number) => {
    const story = successStories.find(s => s.id === id);
    if (!story) return;
    const { error } = await supabase.from('success_stories').update({ visible: !story.visible }).eq('id', id);
    if (error) throw error;
    await fetchStories();
  };

  const toggleFeatured = async (id: number) => {
    const story = successStories.find(s => s.id === id);
    if (!story) return;
    const { error } = await supabase.from('success_stories').update({ featured: !story.featured }).eq('id', id);
    if (error) throw error;
    await fetchStories();
  };

  const getVisibleStories = () => successStories.filter(s => s.visible);
  const getFeaturedStories = () => successStories.filter(s => s.visible && s.featured);

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
      refetch: fetchStories,
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
