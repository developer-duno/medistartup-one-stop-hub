
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InsightsList from './InsightsList';
import InsightForm from './InsightForm';
import { InsightType } from './types';
import { useInsights } from '@/contexts/InsightsContext';
import ApiIntegrationForm from './ApiIntegrationForm';

const InsightsManagement: React.FC = () => {
  const { insights, addInsight, updateInsight, deleteInsight, getInsightsByCategory } = useInsights();
  const [activeTab, setActiveTab] = useState('list');
  const [editingInsight, setEditingInsight] = useState<InsightType | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isApiDialogOpen, setIsApiDialogOpen] = useState(false);

  const filteredInsights = getInsightsByCategory(activeCategory);

  const handleEditInsight = (insight: InsightType) => {
    setEditingInsight({...insight});
    setActiveTab('edit');
  };

  const handleCreateInsight = () => {
    const newId = insights.length > 0 ? Math.max(...insights.map(i => i.id)) + 1 : 1;
    setEditingInsight({
      id: newId,
      title: '',
      excerpt: '',
      content: '',
      category: 'trend',
      author: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      views: 0
    });
    setActiveTab('edit');
  };

  const handleSaveInsight = () => {
    if (!editingInsight) return;
    
    const existingIndex = insights.findIndex(i => i.id === editingInsight.id);
    
    if (existingIndex >= 0) {
      // Update existing insight
      updateInsight(editingInsight);
    } else {
      // Add new insight
      addInsight(editingInsight);
    }
    
    setEditingInsight(null);
    setActiveTab('list');
  };

  const handleDeleteInsight = (id: number) => {
    deleteInsight(id);
  };

  const handleViewInsight = (insight: InsightType) => {
    // Navigate to view the insight
    window.open(`/insights/${insight.id}`, '_blank');
  };

  const handleCancelEdit = () => {
    setEditingInsight(null);
    setActiveTab('list');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <h2 className="font-pretendard font-bold text-xl md:text-2xl">뉴스 & 인사이트 관리</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleCreateInsight}>
            <Plus className="h-4 w-4 mr-1 md:mr-2" />
            <span className="text-xs md:text-sm">인사이트 추가</span>
          </Button>
          <ApiIntegrationForm 
            isOpen={isApiDialogOpen}
            onOpenChange={setIsApiDialogOpen}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list">인사이트 목록</TabsTrigger>
          <TabsTrigger value="edit" disabled={!editingInsight}>
            {editingInsight?.id ? '인사이트 수정' : '인사이트 추가'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <InsightsList 
            insights={filteredInsights}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onEdit={handleEditInsight}
            onDelete={handleDeleteInsight}
            onView={handleViewInsight}
          />
        </TabsContent>

        <TabsContent value="edit">
          {editingInsight && (
            <InsightForm 
              insight={editingInsight}
              setInsight={setEditingInsight}
              onSave={handleSaveInsight}
              onCancel={handleCancelEdit}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsManagement;
