
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InsightType } from './types';

interface InsightFormProps {
  insight: InsightType;
  setInsight: React.Dispatch<React.SetStateAction<InsightType | null>>;
  onSave: () => void;
  onCancel: () => void;
}

const InsightForm: React.FC<InsightFormProps> = ({
  insight,
  setInsight,
  onSave,
  onCancel
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setInsight((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleCategoryChange = (value: string) => {
    setInsight((prev) => (prev ? { ...prev, category: value } : null));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {insight?.id ? '인사이트 수정' : '새 인사이트 추가'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">제목</Label>
            <Input 
              id="title"
              value={insight?.title || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="excerpt">요약</Label>
            <Textarea 
              id="excerpt"
              value={insight?.excerpt || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">본문 내용</Label>
            <Textarea 
              id="content"
              rows={6}
              value={insight?.content || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="category">카테고리</Label>
              <Select 
                value={insight?.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trend">트렌드</SelectItem>
                  <SelectItem value="marketing">마케팅</SelectItem>
                  <SelectItem value="licensing">인허가</SelectItem>
                  <SelectItem value="finance">재무</SelectItem>
                  <SelectItem value="recruitment">인력채용</SelectItem>
                  <SelectItem value="equipment">의료장비</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="author">작성자</Label>
              <Input 
                id="author"
                value={insight?.author || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">이미지 URL</Label>
            <Input 
              id="image"
              value={insight?.image || ''}
              onChange={handleInputChange}
            />
            {insight?.image && (
              <div className="mt-2 h-32 overflow-hidden rounded-md">
                <img 
                  src={insight.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button onClick={onSave}>
          저장하기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InsightForm;
