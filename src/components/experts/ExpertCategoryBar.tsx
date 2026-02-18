
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
    <div className="pb-2">
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors flex items-center gap-1 ${
            activeCategory === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:bg-muted"
          }`}
          onClick={() => setActiveCategory("all")}
        >
          {activeCategory === "all" && <CheckCircle className="h-3.5 w-3.5" />}
          전체 보기
        </button>
        
        {serviceCategories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors flex items-center gap-1 ${
              activeCategory === category
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-muted"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {activeCategory === category && <CheckCircle className="h-3.5 w-3.5" />}
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpertCategoryBar;
