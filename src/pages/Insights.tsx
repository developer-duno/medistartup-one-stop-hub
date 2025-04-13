
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useInsights } from '@/contexts/InsightsContext';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import InsightsList from '@/components/insights/InsightsList';
import InsightsSidebar from '@/components/insights/InsightsSidebar';
import InsightDetail from '@/components/insights/InsightDetail';
import { 
  getCategoryDisplayName, 
  filterInsights, 
  getAllTags 
} from '@/components/insights/insightUtils';

const Insights = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { insights } = useInsights();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'trends'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingInsight, setViewingInsight] = useState<typeof insights[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle direct URL access to an insight
  useEffect(() => {
    if (id) {
      const insight = insights.find(item => item.id.toString() === id);
      if (insight) {
        setViewingInsight(insight);
        setIsDialogOpen(true);
      } else {
        navigate('/insights');
        toast({
          title: "찾을 수 없는 인사이트",
          description: "요청하신 인사이트를 찾을 수 없습니다.",
          variant: "destructive",
        });
      }
    }
  }, [id, insights, navigate, toast]);

  const filteredInsights = filterInsights(insights, activeTab, searchQuery);
  const allTags = getAllTags(insights);

  const handleViewInsight = (insight: typeof insights[0]) => {
    setViewingInsight(insight);
    setIsDialogOpen(true);
    // Update URL without page refresh
    navigate(`/insights/${insight.id}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-28 pb-16 bg-gradient-to-b from-primary-100 to-white">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
              뉴스 & <span className="text-primary">인사이트</span>
            </h1>
            <p className="font-noto text-neutral-600 mb-8">
              병원 창업과 운영에 관한 최신 의료법 개정 소식과 트렌드 리포트를 확인하세요.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <main className="md:w-2/3">
            {/* Filter tabs */}
            <div className="flex mb-6 border-b border-neutral-200">
              <button
                className={`px-4 py-3 font-pretendard font-medium ${
                  activeTab === 'all'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                onClick={() => setActiveTab('all')}
              >
                전체
              </button>
              <button
                className={`px-4 py-3 font-pretendard font-medium ${
                  activeTab === 'news'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                onClick={() => setActiveTab('news')}
              >
                의료법 개정 소식
              </button>
              <button
                className={`px-4 py-3 font-pretendard font-medium ${
                  activeTab === 'trends'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                onClick={() => setActiveTab('trends')}
              >
                트렌드 리포트
              </button>
            </div>

            <InsightsList 
              filteredInsights={filteredInsights}
              getCategoryDisplayName={getCategoryDisplayName}
              onViewInsight={handleViewInsight}
            />
          </main>

          <InsightsSidebar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveTab={setActiveTab}
            allTags={allTags}
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          navigate('/insights', { replace: true });
        }
      }}>
        {viewingInsight && (
          <InsightDetail 
            insight={viewingInsight}
            getCategoryDisplayName={getCategoryDisplayName}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Insights;
