
import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface Insight {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
}

const InsightsManagement: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("list");
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: 1,
      title: "2025년 병원창업 트렌드 보고서 - 의료정책 변화와 대응방안",
      category: "트렌드 리포트",
      date: "2025.03.15",
      image: "https://images.unsplash.com/photo-1576091160550-bdfa8387f952?q=80&w=2070&auto=format&fit=crop",
      excerpt: "2025년 1월부터 시행된 '의료기관 개설 허가 간소화법'의 핵심 내용과 개원의가 알아야 할 대응 방안을 소개합니다."
    },
    {
      id: 2,
      title: "디지털 헬스케어 시대의 병원 공간 설계 - 효율과 환자경험의 균형",
      category: "설계 & 인테리어",
      date: "2025.02.28",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      excerpt: "디지털 장비와 전통적 의료공간의 조화로운 설계로 환자 만족도와 진료 효율성을 모두 높이는 방법을 알아봅니다."
    },
    {
      id: 3,
      title: "빅데이터로 보는 2025년 입지 분석 - 지역별 의료수요 예측",
      category: "입지 분석",
      date: "2025.02.10",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      excerpt: "최신 인구통계와 의료이용 패턴 데이터를 기반으로 2025년 지역별 의료수요 변화를 예측하고 분석합니다."
    }
  ]);
  
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const categories = ["트렌드 리포트", "설계 & 인테리어", "입지 분석", "재무", "인허가", "마케팅", "인력 채용", "의료기기", "의료폐기물"];

  const handleAddInsight = () => {
    const newInsight: Insight = {
      id: Date.now(),
      title: "",
      category: categories[0],
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      image: "https://images.unsplash.com/photo-1576091160550-bdfa8387f952?q=80&w=2070&auto=format&fit=crop",
      excerpt: ""
    };
    
    setEditingInsight(newInsight);
    setActiveTab("edit");
  };

  const handleEditInsight = (insight: Insight) => {
    setEditingInsight({...insight});
    setActiveTab("edit");
  };

  const handleDeleteInsight = (id: number) => {
    setInsights(insights.filter(insight => insight.id !== id));
    toast({
      title: "인사이트 삭제됨",
      description: "선택한 인사이트가 삭제되었습니다.",
      variant: "success",
    });
  };

  const handleSaveInsight = () => {
    if (!editingInsight) return;
    
    if (!editingInsight.title.trim()) {
      toast({
        title: "제목을 입력해주세요",
        variant: "destructive",
      });
      return;
    }
    
    if (!editingInsight.excerpt.trim()) {
      toast({
        title: "요약을 입력해주세요",
        variant: "destructive",
      });
      return;
    }
    
    const existingIndex = insights.findIndex(i => i.id === editingInsight.id);
    
    if (existingIndex >= 0) {
      // Update existing insight
      const updatedInsights = [...insights];
      updatedInsights[existingIndex] = editingInsight;
      setInsights(updatedInsights);
      
      toast({
        title: "인사이트 업데이트됨",
        description: "인사이트가 성공적으로 업데이트되었습니다.",
        variant: "success",
      });
    } else {
      // Add new insight
      setInsights([...insights, editingInsight]);
      
      toast({
        title: "인사이트 추가됨",
        description: "새로운 인사이트가 추가되었습니다.",
        variant: "success",
      });
    }
    
    setActiveTab("list");
    setEditingInsight(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-pretendard font-bold text-2xl mb-6">뉴스 & 인사이트 관리</h2>
        <Button onClick={handleAddInsight}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="overflow-hidden">
                <div className="relative h-40">
                  <img 
                    src={insight.image} 
                    alt={insight.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button variant="secondary" size="icon" className="h-8 w-8" 
                      onClick={() => handleEditInsight(insight)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8"
                      onClick={() => handleDeleteInsight(insight.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-md">
                      {insight.category}
                    </span>
                    <span className="text-xs text-gray-500">{insight.date}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {insight.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="edit">
          {editingInsight && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {editingInsight.id === Date.now() ? "새로운 인사이트 추가" : "인사이트 수정"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="insight-title">
                    제목
                  </label>
                  <input
                    id="insight-title"
                    className="w-full p-2 border rounded"
                    value={editingInsight.title}
                    onChange={(e) => setEditingInsight({...editingInsight, title: e.target.value})}
                    placeholder="인사이트 제목을 입력하세요"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="insight-category">
                      카테고리
                    </label>
                    <select
                      id="insight-category"
                      className="w-full p-2 border rounded"
                      value={editingInsight.category}
                      onChange={(e) => setEditingInsight({...editingInsight, category: e.target.value})}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="insight-date">
                      날짜
                    </label>
                    <input
                      id="insight-date"
                      type="date"
                      className="w-full p-2 border rounded"
                      value={editingInsight.date.replace(/\./g, '-')}
                      onChange={(e) => setEditingInsight({
                        ...editingInsight, 
                        date: e.target.value.replace(/-/g, '.')
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="insight-image">
                    이미지 URL
                  </label>
                  <input
                    id="insight-image"
                    className="w-full p-2 border rounded"
                    value={editingInsight.image}
                    onChange={(e) => setEditingInsight({...editingInsight, image: e.target.value})}
                    placeholder="이미지 URL을 입력하세요"
                  />
                  {editingInsight.image && (
                    <div className="mt-2 h-40 border rounded overflow-hidden">
                      <img 
                        src={editingInsight.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=이미지+미리보기';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="insight-excerpt">
                    요약
                  </label>
                  <textarea
                    id="insight-excerpt"
                    className="w-full p-2 border rounded h-24"
                    value={editingInsight.excerpt}
                    onChange={(e) => setEditingInsight({...editingInsight, excerpt: e.target.value})}
                    placeholder="인사이트 요약을 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="insight-content">
                    본문 (선택사항)
                  </label>
                  <textarea
                    id="insight-content"
                    className="w-full p-2 border rounded h-48"
                    value={editingInsight.content || ""}
                    onChange={(e) => setEditingInsight({...editingInsight, content: e.target.value})}
                    placeholder="인사이트 본문을 입력하세요 (HTML 태그 사용 가능)"
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => {
                    setActiveTab("list");
                    setEditingInsight(null);
                  }}>
                    취소
                  </Button>
                  <Button onClick={handleSaveInsight}>
                    저장하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsManagement;
