
import React, { useState } from 'react';
import { ServiceCategory } from '@/types/service';
import { RunwareService } from '@/services/RunwareService';

interface CategoryImageProps {
  category: ServiceCategory | 'all';
  categoryName: string;
  categoryDescription: string;
}

const runwareService = new RunwareService('6PtVhh4UUUKazd3Uv8K0l7njZsxeaOxQ');

const CategoryImage: React.FC<CategoryImageProps> = ({ category, categoryName, categoryDescription }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (imageUrl) return;
    
    setLoading(true);
    try {
      const prompts = {
        all: "Modern hospital services overview, professional healthcare services collage, medical facility services",
        planning: "Hospital planning phase, medical facility blueprints, healthcare strategic planning, hospital location analysis",
        implementation: "Hospital construction and implementation phase, medical facility building process, healthcare facility development",
        equipment: "Modern hospital medical equipment installation, healthcare technology setup, medical machinery arrangement",
        operation: "Hospital operations management, healthcare facility daily operations, medical staff working in modern hospital"
      };
      
      const response = await runwareService.generateImage({
        positivePrompt: prompts[category],
        width: 800,
        height: 450,
        outputFormat: "WEBP"
      });
      
      setImageUrl(response.imageURL);
    } catch (error) {
      console.error("Failed to generate category image", error);
      setImageUrl(`https://placehold.co/800x450/e2e8f0/1e293b?text=${category.toUpperCase()}`);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    generateImage();
  }, [category]);

  return (
    <div className="relative mb-8 rounded-xl overflow-hidden shadow-md aspect-video max-w-4xl mx-auto">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <img 
            src={imageUrl || `https://placehold.co/800x450/e2e8f0/1e293b?text=${category.toUpperCase()}`}
            alt={`${categoryName} 서비스`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className="font-pretendard font-bold text-2xl text-white mb-2">
              {categoryName} 서비스
            </h2>
            <p className="font-noto text-white/90">
              {categoryDescription}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryImage;
