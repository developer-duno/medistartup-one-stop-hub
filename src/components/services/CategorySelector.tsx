
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceCategory } from '@/types/service';

interface CategorySelectorProps {
  categories: { id: ServiceCategory | 'all'; name: string; description: string }[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories }) => {
  return (
    <div className="mb-8 overflow-x-auto">
      <TabsList className="w-full flex justify-start md:justify-center p-1 bg-neutral-100 rounded-lg">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="px-4 py-2 text-sm md:text-base whitespace-nowrap"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default CategorySelector;
