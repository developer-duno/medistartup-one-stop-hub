
import React, { useState } from 'react';
import { Search, ChevronRight, Tag } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';
import { useToast } from '@/hooks/use-toast';

interface InsightsSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: 'news' | 'trends') => void;
  allTags: string[];
}

const InsightsSidebar: React.FC<InsightsSidebarProps> = ({
  searchQuery,
  setSearchQuery,
  setActiveTab,
  allTags
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

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

  return (
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
  );
};

export default InsightsSidebar;
