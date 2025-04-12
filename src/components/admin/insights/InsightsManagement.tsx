
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import InsightsList from './InsightsList';
import InsightForm from './InsightForm';
import { mockInsights } from './insightData';
import { InsightType } from './types';

const InsightsManagement: React.FC = () => {
  const [insights, setInsights] = useState<InsightType[]>(mockInsights);
  const [activeTab, setActiveTab] = useState('list');
  const [editingInsight, setEditingInsight] = useState<InsightType | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { toast } = useToast();

  const filteredInsights = activeCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === activeCategory);

  const handleEditInsight = (insight: InsightType) => {
    setEditingInsight({...insight});
    setActiveTab('edit');
  };

  const handleCreateInsight = () => {
    const newId = Math.max(...insights.map(i => i.id)) + 1;
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
    let updatedInsights;
    
    if (existingIndex >= 0) {
      // Update existing insight
      updatedInsights = [...insights];
      updatedInsights[existingIndex] = editingInsight;
    } else {
      // Add new insight
      updatedInsights = [...insights, editingInsight];
    }
    
    setInsights(updatedInsights);
    setEditingInsight(null);
    setActiveTab('list');
    
    toast({
      title: "인사이트 저장 완료",
      description: "인사이트가 성공적으로 저장되었습니다.",
      variant: "default",
    });
  };

  const handleDeleteInsight = (id: number) => {
    setInsights(insights.filter(insight => insight.id !== id));
    
    toast({
      title: "인사이트 삭제 완료",
      description: "인사이트가 성공적으로 삭제되었습니다.",
      variant: "default",
    });
  };

  const handleViewInsight = (insight: InsightType) => {
    toast({
      title: insight.title,
      description: "인사이트 상세 보기 기능은 준비 중입니다.",
      variant: "default",
    });
  };

  const handleCancelEdit = () => {
    setEditingInsight(null);
    setActiveTab('list');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">뉴스 & 인사이트 관리</h2>
        {activeTab === 'list' && (
          <Button onClick={handleCreateInsight}>
            <Plus className="h-4 w-4 mr-2" />
            인사이트 추가
          </Button>
        )}
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
