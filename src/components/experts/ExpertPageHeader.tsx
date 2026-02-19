
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExpertPageHeaderProps {
  filteredExperts: any[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  selectedExperts: number[];
}

const ExpertPageHeader: React.FC<ExpertPageHeaderProps> = ({ 
  filteredExperts,
  viewMode,
  setViewMode,
  selectedExperts
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="font-pretendard font-bold text-2xl text-neutral-900">
          전문가 목록
        </h2>
        <p className="text-neutral-600">
          총 {filteredExperts.length}명의 전문가
        </p>
      </div>
      
      <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode} className="hidden md:block">
        <TabsList className="bg-neutral-100 border border-neutral-200 p-1 rounded-lg shadow-sm">
          <TabsTrigger 
            value="grid"
            className="px-4 py-2 font-pretendard font-medium text-sm data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md"
          >
            그리드 보기
          </TabsTrigger>
          <TabsTrigger 
            value="compare" 
            disabled={selectedExperts.length < 2}
            className="px-4 py-2 font-pretendard font-medium text-sm data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            비교 보기 ({selectedExperts.length}/3)
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ExpertPageHeader;
