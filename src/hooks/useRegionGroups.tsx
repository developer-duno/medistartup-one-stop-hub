
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RegionGroup {
  id: string;
  name: string;
  display_order: number;
  regions: RegionItem[];
}

export interface RegionItem {
  id: string;
  group_id: string;
  name: string;
  display_order: number;
}

export function useRegionGroups() {
  const [groups, setGroups] = useState<RegionGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    const { data: groupsData } = await supabase
      .from('region_groups')
      .select('*')
      .order('display_order');

    const { data: itemsData } = await supabase
      .from('region_items')
      .select('*')
      .order('display_order');

    if (groupsData && itemsData) {
      const merged: RegionGroup[] = groupsData.map(g => ({
        id: g.id,
        name: g.name,
        display_order: g.display_order,
        regions: itemsData
          .filter(i => i.group_id === g.id)
          .map(i => ({ id: i.id, group_id: i.group_id, name: i.name, display_order: i.display_order })),
      }));
      setGroups(merged);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchGroups(); }, [fetchGroups]);

  // Derived flat arrays for backward compat
  const regionOptions = useMemo(() => groups.flatMap(g => g.regions.map(r => r.name)), [groups]);

  const regionGroupsCompat = useMemo(() => groups.map(g => ({
    name: g.name,
    regions: g.regions.map(r => r.name),
  })), [groups]);

  // Admin mutations
  const addGroup = async (name: string) => {
    const maxOrder = groups.length > 0 ? Math.max(...groups.map(g => g.display_order)) + 1 : 0;
    const { error } = await supabase.from('region_groups').insert({ name, display_order: maxOrder });
    if (!error) await fetchGroups();
    return error;
  };

  const updateGroupName = async (id: string, name: string) => {
    const { error } = await supabase.from('region_groups').update({ name }).eq('id', id);
    if (!error) await fetchGroups();
    return error;
  };

  const deleteGroup = async (id: string) => {
    const { error } = await supabase.from('region_groups').delete().eq('id', id);
    if (!error) await fetchGroups();
    return error;
  };

  const addRegionItem = async (groupId: string, name: string) => {
    const group = groups.find(g => g.id === groupId);
    const maxOrder = group && group.regions.length > 0 
      ? Math.max(...group.regions.map(r => r.display_order)) + 1 
      : 0;
    const { error } = await supabase.from('region_items').insert({ group_id: groupId, name, display_order: maxOrder });
    if (!error) await fetchGroups();
    return error;
  };

  const deleteRegionItem = async (id: string) => {
    const { error } = await supabase.from('region_items').delete().eq('id', id);
    if (!error) await fetchGroups();
    return error;
  };

  const updateRegionItemName = async (id: string, name: string) => {
    const { error } = await supabase.from('region_items').update({ name }).eq('id', id);
    if (!error) await fetchGroups();
    return error;
  };

  return {
    groups,
    loading,
    regionOptions,
    regionGroupsCompat,
    refetch: fetchGroups,
    addGroup,
    updateGroupName,
    deleteGroup,
    addRegionItem,
    deleteRegionItem,
    updateRegionItemName,
  };
}
