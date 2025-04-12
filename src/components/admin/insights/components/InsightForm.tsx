
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Insight } from '../types';

interface InsightFormProps {
  insight: Insight;
  categories: string[];
  onCancel: () => void;
  onSave: () => void;
  onChange: (updatedInsight: Insight) => void;
}

const InsightForm: React.FC<InsightFormProps> = ({
  insight,
  categories,
  onCancel,
  onSave,
  onChange
}) => {
  const handleChange = (field: keyof Insight, value: string) => {
    onChange({
      ...insight,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {insight.id === Date.now() ? "새로운 인사이트 추가" : "인사이트 수정"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="insight-title">
            제목
          </label>
          <input
            id="insight-title"
            className="w-full p-2 border rounded"
            value={insight.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="인사이트 제목을 입력하세요"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="insight-category">
              카테고리
            </label>
            <select
              id="insight-category"
              className="w-full p-2 border rounded"
              value={insight.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="insight-date">
              날짜
            </label>
            <input
              id="insight-date"
              type="date"
              className="w-full p-2 border rounded"
              value={insight.date.replace(/\./g, '-')}
              onChange={(e) => handleChange('date', e.target.value.replace(/-/g, '.'))}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="insight-image">
            이미지 URL
          </label>
          <input
            id="insight-image"
            className="w-full p-2 border rounded"
            value={insight.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="이미지 URL을 입력하세요"
          />
          {insight.image && (
            <div className="mt-2 h-40 border rounded overflow-hidden">
              <img 
                src={insight.image} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=이미지+미리보기';
                }}
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="insight-excerpt">
            요약
          </label>
          <textarea
            id="insight-excerpt"
            className="w-full p-2 border rounded h-24"
            value={insight.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            placeholder="인사이트 요약을 입력하세요"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="insight-content">
            본문 (선택사항)
          </label>
          <textarea
            id="insight-content"
            className="w-full p-2 border rounded h-48"
            value={insight.content || ""}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="인사이트 본문을 입력하세요 (HTML 태그 사용 가능)"
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button onClick={onSave}>
            저장하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightForm;
