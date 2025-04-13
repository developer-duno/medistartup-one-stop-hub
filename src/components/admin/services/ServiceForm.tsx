
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Service, ServiceCategory, NewService } from '@/types/service';
import { useServices } from '@/contexts/ServicesContext';

interface ServiceFormProps {
  isOpen: boolean;
  service: Service | null;
  onClose: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ isOpen, service, onClose }) => {
  const { addService, updateService } = useServices();
  const isEditing = Boolean(service);

  const [formData, setFormData] = useState<NewService>({
    title: '',
    description: '',
    icon: 'MapPin',
    path: '',
    category: 'planning'
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        path: service.path,
        category: service.category
      });
    } else {
      setFormData({
        title: '',
        description: '',
        icon: 'MapPin',
        path: '',
        category: 'planning'
      });
    }
  }, [service]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    if (name === 'category') {
      setFormData(prev => ({ ...prev, [name]: value as ServiceCategory }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate path if empty
    const path = formData.path || `/services/${formData.title.toLowerCase().replace(/\s+/g, '-')}`;
    const updatedFormData = { ...formData, path };
    
    if (isEditing && service) {
      updateService({ ...updatedFormData, id: service.id });
    } else {
      addService(updatedFormData);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? '서비스 수정' : '새 서비스 추가'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="title">서비스 제목</Label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">서비스 설명</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              required 
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">카테고리</Label>
            <Select 
              value={formData.category} 
              onValueChange={handleSelectChange('category')}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">계획 단계</SelectItem>
                <SelectItem value="implementation">개원 단계</SelectItem>
                <SelectItem value="equipment">설비 및 장비</SelectItem>
                <SelectItem value="operation">운영 단계</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="icon">아이콘</Label>
            <Select 
              value={formData.icon} 
              onValueChange={handleSelectChange('icon')}
            >
              <SelectTrigger id="icon">
                <SelectValue placeholder="아이콘 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MapPin">위치 핀</SelectItem>
                <SelectItem value="BarChart3">차트</SelectItem>
                <SelectItem value="Building2">빌딩</SelectItem>
                <SelectItem value="FileCheck">문서</SelectItem>
                <SelectItem value="Users">사용자</SelectItem>
                <SelectItem value="Briefcase">서류가방</SelectItem>
                <SelectItem value="Package">패키지</SelectItem>
                <SelectItem value="Trash2">쓰레기통</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="path">페이지 경로</Label>
            <Input 
              id="path" 
              name="path" 
              value={formData.path} 
              onChange={handleInputChange} 
              placeholder="/services/service-name" 
            />
            <p className="text-xs text-muted-foreground">
              비워두면 자동으로 생성됩니다
            </p>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">
              {isEditing ? '수정 완료' : '추가 완료'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
