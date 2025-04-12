
import React, { useState } from 'react';
import { Plus, Edit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInsights } from './hooks/useInsights';
import InsightsGrid from './components/InsightsGrid';
import InsightForm from './components/InsightForm';

const InsightsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("list");
  const {
    insights,
    editingInsight,
    setEditingInsight,
    categories,
    handleAddInsight,
    handleEditInsight,
    handleDeleteInsight,
    handleSaveInsight
  } = useInsights();

  const handleAdd = () => {
    handleAddInsight();
    setActiveTab("edit");
  };

  const handleEdit = (insight: any) => {
    handleEditInsight(insight);
    setActiveTab("edit");
  };

  const handleSave = () => {
    if (handleSaveInsight()) {
      setActiveTab("list");
    }
  };

  const handleCancel = () => {
    setActiveTab("list");
    setEditingInsight(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-pretendard font-bold text-2xl mb-6">뉴스 & 인사이트 관리</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          인사이트 추가
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">
            <FileText className="h-4 w-4 mr-2" />
            인사이트 목록
          </TabsTrigger>
          <TabsTrigger value="edit" disabled={!editingInsight}>
            <Edit className="h-4 w-4 mr-2" />
            인사이트 편집
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <InsightsGrid 
            insights={insights} 
            onEdit={handleEdit} 
            onDelete={handleDeleteInsight} 
          />
        </TabsContent>
        
        <TabsContent value="edit">
          {editingInsight && (
            <InsightForm
              insight={editingInsight}
              categories={categories}
              onCancel={handleCancel}
              onSave={handleSave}
              onChange={setEditingInsight}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsManagement;
