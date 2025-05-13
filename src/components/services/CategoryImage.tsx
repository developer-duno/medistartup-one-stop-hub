
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
      <h2 className="font-pretendard font-bold text-2xl text-neutral-800 mb-2">
        {categoryName} 서비스
      </h2>
      <p className="font-noto text-neutral-600 max-w-2xl mx-auto px-4">
        {categoryDescription}
      </p>
    </div>
  );
};

export default CategoryImage;
