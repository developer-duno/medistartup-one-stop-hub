
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
        <TabsList>
          <TabsTrigger value="grid">그리드 보기</TabsTrigger>
          <TabsTrigger value="compare" disabled={selectedExperts.length < 2}>
            비교 보기 ({selectedExperts.length}/3)
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ExpertPageHeader;
