
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ExpertCategoryBarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  serviceCategories: string[];
}

const ExpertCategoryBar: React.FC<ExpertCategoryBarProps> = ({ 
  activeCategory, 
  setActiveCategory, 
  serviceCategories 
}) => {
  return (
    <div className="overflow-x-auto scrollbar-none pb-2">
      <div className="flex border-b border-neutral-200 min-w-max">
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-1 ${
            activeCategory === "all"
              ? "border-primary text-primary"
              : "border-transparent text-neutral-500 hover:text-neutral-800"
          }`}
          onClick={() => setActiveCategory("all")}
        >
          {activeCategory === "all" && <CheckCircle className="h-4 w-4" />}
          전체 보기
        </button>
        
        {serviceCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-1 ${
              activeCategory === category
                ? "border-primary text-primary"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {activeCategory === category && <CheckCircle className="h-4 w-4" />}
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpertCategoryBar;
