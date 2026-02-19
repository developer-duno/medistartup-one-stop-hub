
import React from 'react';
import { ServiceCategory } from '@/types/service';

interface CategoryImageProps {
  category: ServiceCategory | 'all';
  categoryName: string;
  categoryDescription: string;
}

const CategoryImage: React.FC<CategoryImageProps> = ({ category, categoryName, categoryDescription }) => {
  return (
    <div className="mb-8 text-center">
      <p className="font-noto text-neutral-600 max-w-2xl mx-auto px-4">
        {categoryDescription}
      </p>
    </div>
  );
};

export default CategoryImage;
