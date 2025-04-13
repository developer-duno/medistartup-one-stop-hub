
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Download } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useInsights } from '@/contexts/InsightsContext';
import { useToast } from '@/hooks/use-toast';
import { predefinedApiConfigs } from '@/utils/externalApiUtils';

interface ApiIntegrationFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiIntegrationForm: React.FC<ApiIntegrationFormProps> = ({ isOpen, onOpenChange }) => {
  const { fetchExternalInsights } = useInsights();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'simple' | 'advanced'>('simple');
  const [apiUrl, setApiUrl] = useState('');
  const [apiPreset, setApiPreset] = useState<string>('custom');
  const [apiConfig, setApiConfig] = useState<string>('{}');

  const handleFetchData = async () => {
    if (!apiUrl) {
      toast({
        title: "URL 필요",
        description: "외부 API URL을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await fetchExternalInsights(apiUrl);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "API 연동 실패",
        description: `외부 API 연동 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        variant: "destructive",
      });
    }
  };

  const handlePresetChange = (value: string) => {
    setApiPreset(value);
    
    if (value !== 'custom') {
      const preset = predefinedApiConfigs[value];
      if (preset) {
        setApiUrl(preset.url);
        setApiConfig(JSON.stringify(preset.mappings, null, 2));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Download className="h-4 w-4 mr-2" />
          외부 API 연동
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>외부 API에서 인사이트 가져오기</DialogTitle>
          <DialogDescription>
            외부 API URL을 입력하면 자동으로 데이터를 불러와 인사이트로 변환합니다.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="simple" value={activeTab} onValueChange={(v) => setActiveTab(v as 'simple' | 'advanced')}>
          <TabsList className="mb-4">
            <TabsTrigger value="simple">간편 설정</TabsTrigger>
            <TabsTrigger value="advanced">고급 설정</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple">
            <div className="space-y-4">
              <div>
                <Label htmlFor="api-preset">API 유형</Label>
                <Select value={apiPreset} onValueChange={handlePresetChange}>
                  <SelectTrigger id="api-preset" className="mt-2">
                    <SelectValue placeholder="API 유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">직접 입력</SelectItem>
                    <SelectItem value="wordpress">워드프레스</SelectItem>
                    <SelectItem value="contentful">Contentful</SelectItem>
                    <SelectItem value="strapi">Strapi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="api-url-simple">API URL</Label>
                <Input 
                  id="api-url-simple"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://api.example.com/articles"
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  API는 JSON 형식의 배열 데이터를 반환해야 합니다.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-4">
              <div>
                <Label htmlFor="api-url-advanced">API URL</Label>
                <Input 
                  id="api-url-advanced"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://api.example.com/articles"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="api-config">필드 맵핑 설정 (JSON)</Label>
                <Textarea 
                  id="api-config"
                  value={apiConfig}
                  onChange={(e) => setApiConfig(e.target.value)}
                  placeholder='{
  "title": "title",
  "excerpt": "description",
  "content": "body",
  "category": "category",
  "author": "author.name",
  "date": "publishedAt",
  "image": "image.url"
}'
                  className="mt-2 font-mono text-sm"
                  rows={10}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  API 응답의 필드명과 Insight 필드를 연결합니다. 중첩된 필드는 점(.)으로 구분합니다.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button onClick={handleFetchData}>가져오기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiIntegrationForm;
