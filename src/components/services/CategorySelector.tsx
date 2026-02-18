
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceCategory } from '@/types/service';

interface CategorySelectorProps {
  categories: { id: ServiceCategory | 'all'; name: string; description: string }[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories }) => {
  return (
    <div className="mb-8">
      <TabsList className="w-full flex flex-wrap justify-center gap-1 p-1 bg-neutral-100 rounded-lg h-auto">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="px-3 py-1.5 text-xs md:text-base md:px-4 md:py-2"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default CategorySelector;
