
import React, { useState } from 'react';
import { Search, Calendar, Tag, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomButton from '../components/ui/CustomButton';

const Insights = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'trends'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const insights = [
    {
      id: 1,
      title: '2025년 의료기관 개설 허가 간소화법 시행 - 주요 변경사항 및 영향',
      excerpt: '2025년 1월부터 시행된 의료기관 개설 허가 간소화법의 주요 내용과 개원 절차에 미치는 영향을 분석합니다.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2070&auto=format&fit=crop',
      date: '2025-04-10',
      author: '김법규',
      category: 'news',
      tags: ['의료법', '개원', '인허가']
    },
    {
      id: 2,
      title: '대전/충남 지역 의료 시장 분석 - 2025년 1분기 보고서',
      excerpt: '대전 및 충남 지역의 의료 시장 현황, 성장 가능성이 높은 진료과목, 그리고 주목할만한 지역별 특성을 분석한 보고서입니다.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      date: '2025-04-05',
      author: '박상권',
      category: 'trends',
      tags: ['대전', '충남', '시장분석', '트렌드']
    },
    {
      id: 3,
      title: '디지털 헬스케어 도입으로 환자 만족도 70% 향상 사례',
      excerpt: '최신 디지털 헬스케어 기술을 도입한 개원의들의 성공 사례와 ROI 분석, 그리고 실질적인 구현 전략을 소개합니다.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
      date: '2025-03-28',
      author: '이기술',
      category: 'trends',
      tags: ['디지털헬스케어', '기술', '환자경험']
    },
    {
      id: 4,
      title: '의료기관 필수 폐기물 처리 규정 개정 발표',
      excerpt: '보건복지부에서 발표한 의료폐기물 처리 관련 새로운 규정과 의료기관의 대응 방안을 상세히 설명합니다.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop',
      date: '2025-03-15',
      author: '한환경',
      category: 'news',
      tags: ['의료폐기물', '규제', '환경']
    },
    {
      id: 5,
      title: '2025년 2분기 의료장비 기술 트렌드',
      excerpt: '최신 의료장비 기술 동향과 비용 효율적인 장비 도입 전략, 그리고 주목할만한 신기술을 소개합니다.',
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2032&auto=format&fit=crop',
      date: '2025-03-10',
      author: '정의료',
      category: 'trends',
      tags: ['의료장비', '기술', '트렌드']
    },
    {
      id: 6,
      title: '의사면허 갱신제도 도입 예정 - 개원의가 알아야 할 사항',
      excerpt: '2026년부터 단계적 시행 예정인 의사면허 갱신제도의 주요 내용과 개원의가 준비해야 할 사항들을 정리했습니다.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
      date: '2025-03-05',
      author: '김법규',
      category: 'news',
      tags: ['의사면허', '제도', '개원의']
    }
  ];

  const filteredInsights = insights.filter(insight => {
    // Filter by tab
    if (activeTab !== 'all' && insight.category !== activeTab) return false;
    
    // Filter by search
    if (searchQuery && !insight.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const allTags = [...new Set(insights.flatMap(insight => insight.tags))];

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
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
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
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/insights/${article.id}`}
                      className="font-pretendard font-medium text-primary inline-flex items-center hover:underline"
                    >
                      자세히 보기
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
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

            <div className="bg-primary-50 border border-primary-100 rounded-lg p-6 shadow-sm">
              <h3 className="font-pretendard font-bold text-lg text-primary mb-2">뉴스레터 구독</h3>
              <p className="font-noto text-sm text-neutral-600 mb-4">
                최신 의료법 개정 소식과 트렌드 리포트를 이메일로 받아보세요.
              </p>
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full py-2 px-4 border border-neutral-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <CustomButton variant="primary" fullWidth>
                구독하기
              </CustomButton>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Insights;
