
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, Tag, ChevronRight, ArrowLeft } from 'lucide-react';
import CustomButton from '../components/ui/CustomButton';
import { useInsights } from '@/contexts/InsightsContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Insights = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { insights } = useInsights();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'trends'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingInsight, setViewingInsight] = useState<typeof insights[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');

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

  // Map categories from our data structure to UI tabs
  const getCategoryType = (category: string): 'news' | 'trends' => {
    switch(category) {
      case 'licensing':
      case 'finance':
      case 'recruitment':
        return 'news';
      case 'trend':
      case 'marketing':
      case 'equipment':
        return 'trends';
      default:
        return 'trends';
    }
  };

  const filteredInsights = insights.filter(insight => {
    // Filter by tab
    if (activeTab !== 'all' && getCategoryType(insight.category) !== activeTab) return false;
    
    // Filter by search
    if (searchQuery && !insight.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'trend': return '트렌드';
      case 'marketing': return '마케팅';
      case 'licensing': return '인허가';
      case 'finance': return '재무';
      case 'recruitment': return '인력채용';
      case 'equipment': return '의료장비';
      default: return category;
    }
  };

  // Get all unique tags from our insights (simulated with categories for now)
  const allTags = [...new Set(insights.map(insight => getCategoryDisplayName(insight.category)))];

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "이메일 필요",
        description: "구독하시려면 이메일을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "뉴스레터 구독 완료",
      description: "뉴스레터 구독이 완료되었습니다. 감사합니다!",
    });
    setEmail('');
  };

  const handleViewInsight = (insight: typeof insights[0]) => {
    setViewingInsight(insight);
    setIsDialogOpen(true);
    // Update URL without page refresh
    navigate(`/insights/${insight.id}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-accent py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
            뉴스 & 인사이트
          </h1>
          <p className="font-noto text-lg text-neutral-700 max-w-2xl">
            병원 창업과 운영에 관한 최신 의료법 개정 소식과 트렌드 리포트를 확인하세요.
          </p>
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

            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredInsights.map((article) => (
                <div key={article.id} className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={article.image || 'https://placehold.co/600x400?text=No+Image'}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = 'https://placehold.co/600x400?text=Loading+Error';
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-neutral-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.author}</span>
                    </div>
                    <h2 className="font-pretendard font-bold text-xl text-neutral-900 mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="font-noto text-neutral-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800">
                        {getCategoryDisplayName(article.category)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleViewInsight(article)}
                      className="font-pretendard font-medium text-primary inline-flex items-center hover:underline"
                    >
                      자세히 보기
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredInsights.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500 font-noto">검색 결과가 없습니다.</p>
              </div>
            )}
          </main>

          <aside className="md:w-1/3">
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm mb-6">
              <h3 className="font-pretendard font-bold text-lg mb-4">검색</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full py-2 pl-10 pr-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm mb-6">
              <h3 className="font-pretendard font-bold text-lg mb-4">카테고리</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    className="text-neutral-600 hover:text-primary flex items-center"
                    onClick={() => setActiveTab('news')}
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    의료법 개정 소식
                  </button>
                </li>
                <li>
                  <button
                    className="text-neutral-600 hover:text-primary flex items-center"
                    onClick={() => setActiveTab('trends')}
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    트렌드 리포트
                  </button>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm mb-6">
              <h3 className="font-pretendard font-bold text-lg mb-4">태그</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-sm font-medium text-neutral-800 hover:bg-primary-100"
                    onClick={() => setSearchQuery(tag)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleNewsletterSignup}
              className="bg-primary-50 border border-primary-100 rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-pretendard font-bold text-lg text-primary mb-2">뉴스레터 구독</h3>
              <p className="font-noto text-sm text-neutral-600 mb-4">
                최신 의료법 개정 소식과 트렌드 리포트를 이메일로 받아보세요.
              </p>
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full py-2 px-4 border border-neutral-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomButton variant="primary" fullWidth type="submit">
                구독하기
              </CustomButton>
            </form>
          </aside>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          navigate('/insights', { replace: true });
        }
      }}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          {viewingInsight && (
            <div className="p-2">
              <div className="aspect-video w-full relative overflow-hidden mb-6">
                <img 
                  src={viewingInsight.image || 'https://placehold.co/600x400?text=No+Image'} 
                  alt={viewingInsight.title}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = 'https://placehold.co/600x400?text=Loading+Error';
                  }}
                />
              </div>
              <h2 className="font-pretendard font-bold text-2xl mb-4">{viewingInsight.title}</h2>
              <div className="flex items-center text-sm text-neutral-500 mb-6">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{viewingInsight.date}</span>
                <span className="mx-2">•</span>
                <span>{viewingInsight.author}</span>
                <span className="mx-2">•</span>
                <span>{getCategoryDisplayName(viewingInsight.category)}</span>
                <span className="mx-2">•</span>
                <span>조회수 {viewingInsight.views}</span>
              </div>
              <div className="font-noto text-neutral-700 leading-relaxed whitespace-pre-line">
                {viewingInsight.content}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Insights;
