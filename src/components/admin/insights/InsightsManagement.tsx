
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Edit, Trash2, Eye, Plus } from 'lucide-react';

// Updated mock insights data to include 5 insights
const mockInsights = [
  {
    id: 1,
    title: '2023년 의료기관 개원 트렌드 분석',
    excerpt: '최근 의료기관 개원 트렌드와 성공적인 개원을 위한 핵심 요소를 분석합니다.',
    content: '최근 의료기관 개원 트렌드는 대형화, 전문화, 디지털화로 요약할 수 있습니다. 특히 비대면 진료와 디지털 헬스케어 솔루션 도입이 큰 트렌드로 자리잡고 있습니다.',
    category: 'trend',
    author: '김전문',
    date: '2023-03-15',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    views: 1240
  },
  {
    id: 2,
    title: '성공적인 의원 마케팅 전략 5가지',
    excerpt: '경쟁이 치열한 의료 시장에서 효과적인 마케팅 전략으로 차별화를 이루는 방법을 소개합니다.',
    content: '성공적인 의원 마케팅을 위해서는 1) 타겟 환자군 명확화, 2) 디지털 마케팅 활용, 3) 환자 경험 최적화, 4) 지역 커뮤니티 참여, 5) 전문성 강조가 필요합니다.',
    category: 'marketing',
    author: '박마케팅',
    date: '2023-04-02',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    views: 980
  },
  {
    id: 3,
    title: '의료기관 인허가 절차 간소화 가이드',
    excerpt: '복잡한 의료기관 인허가 절차를 효율적으로 진행하기 위한 단계별 가이드를 제공합니다.',
    content: '의료기관 인허가 절차는 크게 1) 사전 준비, 2) 건축 허가, 3) 의료기관 개설 신고, 4) 사업자 등록, 5) 기타 인허가로 나뉩니다. 각 단계별 필요 서류와 주의사항을 안내합니다.',
    category: 'licensing',
    author: '이인허가',
    date: '2023-02-20',
    image: 'https://images.unsplash.com/photo-1581360742512-021d5b2157d8?q=80&w=2069&auto=format&fit=crop',
    views: 1560
  },
  {
    id: 4,
    title: '의료기관 재무 관리의 핵심 지표',
    excerpt: '의료기관의 건전한 재무 상태를 유지하기 위한 핵심 재무 지표와 관리 방법을 소개합니다.',
    content: '의료기관의 재무 건전성을 평가하기 위한 핵심 지표로는 1) 수익성 지표, 2) 유동성 지표, 3) 활동성 지표, 4) 안정성 지표가 있으며, 각 지표별 목표 수치와 개선 방법을 제시합니다.',
    category: 'finance',
    author: '최재무',
    date: '2023-03-10',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    views: 1120
  },
  {
    id: 5,
    title: '의료진 채용 및 관리 베스트 프랙티스',
    excerpt: '효과적인 의료진 채용 전략과 장기적 인력 관리 방안에 대한 가이드를 제공합니다.',
    content: '의료기관의 성공은 우수한 인력 확보와 유지에 달려있습니다. 채용 과정의 투명성, 지속적인 교육 기회 제공, 공정한 평가 시스템, 적절한 보상체계 구축이 핵심입니다.',
    category: 'recruitment',
    author: '정인사',
    date: '2023-04-05',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop',
    views: 890
  }
];

const InsightsManagement: React.FC = () => {
  const [insights, setInsights] = useState(mockInsights);
  const [activeTab, setActiveTab] = useState('list');
  const [editingInsight, setEditingInsight] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredInsights = activeCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === activeCategory);

  const handleEditInsight = (insight: any) => {
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
  };

  const handleDeleteInsight = (id: number) => {
    setInsights(insights.filter(insight => insight.id !== id));
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
          <div className="flex gap-4 mb-6">
            <Button 
              variant={activeCategory === 'all' ? "default" : "outline"} 
              onClick={() => setActiveCategory('all')}
            >
              전체
            </Button>
            <Button 
              variant={activeCategory === 'trend' ? "default" : "outline"} 
              onClick={() => setActiveCategory('trend')}
            >
              트렌드
            </Button>
            <Button 
              variant={activeCategory === 'marketing' ? "default" : "outline"} 
              onClick={() => setActiveCategory('marketing')}
            >
              마케팅
            </Button>
            <Button 
              variant={activeCategory === 'licensing' ? "default" : "outline"} 
              onClick={() => setActiveCategory('licensing')}
            >
              인허가
            </Button>
            <Button 
              variant={activeCategory === 'finance' ? "default" : "outline"} 
              onClick={() => setActiveCategory('finance')}
            >
              재무
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInsights.map((insight) => (
              <Card key={insight.id}>
                <div className="aspect-video w-full relative overflow-hidden">
                  <img 
                    src={insight.image || 'https://placehold.co/600x400?text=No+Image'} 
                    alt={insight.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 h-14 text-lg">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4">
                    {insight.excerpt}
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>작성자: {insight.author}</span>
                    <span>등록일: {insight.date}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>
                      {insight.category === 'trend' && '트렌드'}
                      {insight.category === 'marketing' && '마케팅'}
                      {insight.category === 'licensing' && '인허가'}
                      {insight.category === 'finance' && '재무'}
                    </span>
                    <span>조회수: {insight.views}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    보기
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => handleEditInsight(insight)}>
                    <Edit className="h-4 w-4 mr-1" />
                    수정
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteInsight(insight.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="edit">
          {editingInsight && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingInsight.id ? '인사이트 수정' : '새 인사이트 추가'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title">제목</Label>
                    <Input 
                      id="title"
                      value={editingInsight.title}
                      onChange={(e) => setEditingInsight({...editingInsight, title: e.target.value})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="excerpt">요약</Label>
                    <Textarea 
                      id="excerpt"
                      value={editingInsight.excerpt}
                      onChange={(e) => setEditingInsight({...editingInsight, excerpt: e.target.value})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="content">본문 내용</Label>
                    <Textarea 
                      id="content"
                      rows={6}
                      value={editingInsight.content}
                      onChange={(e) => setEditingInsight({...editingInsight, content: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="category">카테고리</Label>
                      <Select 
                        value={editingInsight.category}
                        onValueChange={(value) => setEditingInsight({...editingInsight, category: value})}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trend">트렌드</SelectItem>
                          <SelectItem value="marketing">마케팅</SelectItem>
                          <SelectItem value="licensing">인허가</SelectItem>
                          <SelectItem value="finance">재무</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="author">작성자</Label>
                      <Input 
                        id="author"
                        value={editingInsight.author}
                        onChange={(e) => setEditingInsight({...editingInsight, author: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">이미지 URL</Label>
                    <Input 
                      id="image"
                      value={editingInsight.image}
                      onChange={(e) => setEditingInsight({...editingInsight, image: e.target.value})}
                    />
                    {editingInsight.image && (
                      <div className="mt-2 h-32 overflow-hidden rounded-md">
                        <img 
                          src={editingInsight.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+URL';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingInsight(null);
                    setActiveTab('list');
                  }}
                >
                  취소
                </Button>
                <Button onClick={handleSaveInsight}>
                  저장하기
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsManagement;
