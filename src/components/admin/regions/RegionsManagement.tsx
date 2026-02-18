
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, Trash2, Edit2, Check, X, ChevronDown, ChevronRight, Users } from 'lucide-react';
import { useRegionGroups } from '@/hooks/useRegionGroups';
import { useExperts } from '@/contexts/ExpertsContext';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const RegionsManagement: React.FC = () => {
  const { groups, loading, addGroup, updateGroupName, deleteGroup, addRegionItem, deleteRegionItem, updateRegionItemName } = useRegionGroups();
  const { experts } = useExperts();
  const { toast } = useToast();

  const [newGroupName, setNewGroupName] = useState('');
  const [newRegionInputs, setNewRegionInputs] = useState<Record<string, string>>({});
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [editGroupName, setEditGroupName] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editItemName, setEditItemName] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => 
    groups.reduce((acc, g) => ({ ...acc, [g.id]: true }), {})
  );

  // Auto-expand new groups
  React.useEffect(() => {
    setExpandedGroups(prev => {
      const next = { ...prev };
      groups.forEach(g => { if (!(g.id in next)) next[g.id] = true; });
      return next;
    });
  }, [groups]);

  const getExpertCount = (regionName: string) => 
    experts.filter(e => e.regions.includes(regionName)).length;

  const getGroupExpertCount = (groupRegions: string[]) => {
    const ids = new Set<number>();
    groupRegions.forEach(r => experts.filter(e => e.regions.includes(r)).forEach(e => ids.add(e.id)));
    return ids.size;
  };

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) return;
    const error = await addGroup(newGroupName.trim());
    if (error) {
      toast({ title: '오류', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: '권역 추가 완료', description: `"${newGroupName}" 권역이 추가되었습니다.` });
      setNewGroupName('');
    }
  };

  const handleAddRegion = async (groupId: string) => {
    const name = newRegionInputs[groupId]?.trim();
    if (!name) return;
    const error = await addRegionItem(groupId, name);
    if (error) {
      toast({ title: '오류', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: '지역 추가 완료', description: `"${name}" 지역이 추가되었습니다.` });
      setNewRegionInputs(prev => ({ ...prev, [groupId]: '' }));
    }
  };

  const handleSaveGroupName = async (id: string) => {
    if (!editGroupName.trim()) return;
    const error = await updateGroupName(id, editGroupName.trim());
    if (!error) {
      toast({ title: '수정 완료' });
      setEditingGroup(null);
    }
  };

  const handleSaveItemName = async (id: string) => {
    if (!editItemName.trim()) return;
    const error = await updateRegionItemName(id, editItemName.trim());
    if (!error) {
      toast({ title: '수정 완료' });
      setEditingItem(null);
    }
  };

  const handleDeleteGroup = async (id: string) => {
    const error = await deleteGroup(id);
    if (!error) toast({ title: '권역 삭제 완료' });
  };

  const handleDeleteItem = async (id: string) => {
    const error = await deleteRegionItem(id);
    if (!error) toast({ title: '지역 삭제 완료' });
  };

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-pretendard font-bold text-xl md:text-2xl">지역 관리</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            권역(상위 지역)과 하위 지역을 추가/수정/삭제할 수 있습니다. 변경 사항은 프론트엔드에 즉시 반영됩니다.
          </p>
        </div>
      </div>

      {/* Add new group */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="새 권역 이름 (예: 강원권)"
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddGroup()}
            />
            <Button onClick={handleAddGroup} disabled={!newGroupName.trim()}>
              <Plus className="h-4 w-4 mr-1" />
              권역 추가
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Groups */}
      <div className="space-y-4">
        {groups.map(group => {
          const regionNames = group.regions.map(r => r.name);
          const isExpanded = expandedGroups[group.id] !== false;

          return (
            <Card key={group.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 py-3 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <button onClick={() => setExpandedGroups(prev => ({ ...prev, [group.id]: !isExpanded }))}>
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <MapPin className="h-5 w-5 text-primary" />
                    {editingGroup === group.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={editGroupName}
                          onChange={e => setEditGroupName(e.target.value)}
                          className="h-8 w-40"
                          onKeyDown={e => e.key === 'Enter' && handleSaveGroupName(group.id)}
                        />
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleSaveGroupName(group.id)}>
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingGroup(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      {getGroupExpertCount(regionNames)}명
                    </Badge>
                    <Badge variant="outline" className="text-sm">{group.regions.length}개 지역</Badge>
                    {editingGroup !== group.id && (
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setEditingGroup(group.id); setEditGroupName(group.name); }}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>권역 삭제</AlertDialogTitle>
                          <AlertDialogDescription>
                            "{group.name}" 권역과 포함된 모든 하위 지역이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteGroup(group.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            삭제
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="p-4 space-y-2">
                  {group.regions.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary/70" />
                        {editingItem === item.id ? (
                          <div className="flex items-center gap-1">
                            <Input
                              value={editItemName}
                              onChange={e => setEditItemName(e.target.value)}
                              className="h-7 w-32"
                              onKeyDown={e => e.key === 'Enter' && handleSaveItemName(item.id)}
                            />
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleSaveItemName(item.id)}>
                              <Check className="h-3.5 w-3.5 text-green-600" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingItem(null)}>
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <span className="font-medium text-sm">{item.name}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getExpertCount(item.name) > 0 ? 'default' : 'outline'} className="text-xs min-w-[3rem] justify-center">
                          {getExpertCount(item.name)}명
                        </Badge>
                        {editingItem !== item.id && (
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditingItem(item.id); setEditItemName(item.name); }}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-7 w-7">
                              <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>지역 삭제</AlertDialogTitle>
                              <AlertDialogDescription>
                                "{item.name}" 지역을 삭제하시겠습니까?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>취소</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteItem(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                삭제
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}

                  {/* Add region input */}
                  <div className="flex gap-2 pt-2">
                    <Input
                      placeholder="새 하위 지역 이름"
                      value={newRegionInputs[group.id] || ''}
                      onChange={e => setNewRegionInputs(prev => ({ ...prev, [group.id]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && handleAddRegion(group.id)}
                      className="h-9"
                    />
                    <Button size="sm" variant="outline" onClick={() => handleAddRegion(group.id)} disabled={!newRegionInputs[group.id]?.trim()}>
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      추가
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {groups.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>등록된 권역이 없습니다. 새 권역을 추가해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default RegionsManagement;
