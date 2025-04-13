
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

// We'll update this component to use theme classes
const InsightsSidebar = ({ 
  searchQuery, 
  setSearchQuery, 
  setActiveTab, 
  allTags 
}) => {
  return (
    <aside className="md:w-1/3 space-y-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-pretendard font-semibold text-lg mb-4">검색</h3>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="키워드 검색..."
              className="pl-10 theme-border focus-visible:theme-border"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-pretendard font-semibold text-lg mb-4">카테고리</h3>
          <div className="space-y-2">
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 theme-text"
              onClick={() => setActiveTab('all')}
            >
              전체 보기
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 theme-text"
              onClick={() => setActiveTab('news')}
            >
              의료법 개정 소식
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 theme-text"
              onClick={() => setActiveTab('trends')}
            >
              트렌드 리포트
            </button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-pretendard font-semibold text-lg mb-4">인기 태그</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="hover:bg-primary-100 hover:text-primary cursor-pointer theme-bg-light theme-text"
                onClick={() => setSearchQuery(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default InsightsSidebar;
