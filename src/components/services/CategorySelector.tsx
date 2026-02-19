
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceCategory } from '@/types/service';
import { LayoutGrid, ClipboardList, Wrench, Settings, Monitor } from 'lucide-react';

interface CategorySelectorProps {
  categories: { id: ServiceCategory | 'all'; name: string; description: string }[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  'all': <LayoutGrid className="h-3.5 w-3.5 md:h-4 md:w-4" />,
  'planning': <ClipboardList className="h-3.5 w-3.5 md:h-4 md:w-4" />,
  'implementation': <Wrench className="h-3.5 w-3.5 md:h-4 md:w-4" />,
  'equipment': <Monitor className="h-3.5 w-3.5 md:h-4 md:w-4" />,
  'operation': <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />,
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories }) => {
  return (
    <div className="mb-8">
      <TabsList className="w-full flex flex-wrap justify-center gap-1.5 md:gap-2 p-1.5 bg-muted/50 rounded-xl h-auto border border-border/50 shadow-sm touch-manipulation">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="px-3 py-2 text-xs md:text-sm md:px-5 md:py-2.5 rounded-lg font-medium transition-all duration-150 flex items-center gap-1.5 select-none touch-manipulation active:scale-95 active:opacity-80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
          >
            {categoryIcons[category.id]}
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default CategorySelector;
