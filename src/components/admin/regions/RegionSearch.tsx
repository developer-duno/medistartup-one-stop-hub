
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface RegionSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredRegionsCount: number;
}

const RegionSearch: React.FC<RegionSearchProps> = ({
  searchQuery,
  setSearchQuery,
  filteredRegionsCount
}) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="지역, 담당자 또는 도시로 검색..."
          className="pl-10"
        />
      </div>
      {searchQuery && (
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredRegionsCount}개의 결과를 찾았습니다
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSearchQuery('')}
          >
            초기화
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegionSearch;
