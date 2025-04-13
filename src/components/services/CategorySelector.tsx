
import React from 'react';
import { ServiceCategory } from '@/types/service';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategorySelectorProps {
  categories: { id: ServiceCategory | 'all'; name: string; description: string }[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories }) => {
  return (
    <TabsList className="w-full flex justify-center flex-wrap mb-6">
      {categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.id}
          className="px-8 py-4 font-noto font-semibold text-xl data-[state=active]:theme-bg-light data-[state=active]:theme-text"
        >
          {category.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default CategorySelector;
